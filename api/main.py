import datetime
from typing import Optional
import os
import pickle
import jwt
import pandas as pd
import pyodbc
import uvicorn
import warnings
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from pipeline import data

load_dotenv()
warnings.filterwarnings('ignore')

 
app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
    "http://localhost:3001"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db_settings = {
    'server': os.environ.get('DATABASE_URL'),
    'database': os.environ.get('DATABASE_NAME'),
    'username': os.environ.get('DATABASE_USERNAME'),
    'password': os.environ.get('PASSWORD')
}
secret_key = os.environ.get('SECRET_KEY')

def connect():
    try:
        connection_str = (
            f'Driver={{ODBC Driver 18 for SQL Server}};'
            f'Server=tcp:{db_settings["server"]},1433;'
            f'DATABASE={db_settings["database"]};'
            f'Uid={db_settings["username"]};'
            f'Pwd={db_settings["password"]};'
            f'Encrypt=yes;'
            f'TrustServerCertificate=no;'
            f'Connection Timeout=30;'
        )
        return pyodbc.connect(connection_str)
    except pyodbc.Error as e:
        print(f"Error connecting to database: {e}")
        raise HTTPException(status_code=500, detail="Server error")
    
    

class User(BaseModel):
    username: str
    password: str
    email: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone_number: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip_code: Optional[str] = None
    

@app.post("/login")
async def login(user: User):
    conn = connect()
    cursor = conn.cursor()
    query = "SELECT * FROM passenger WHERE username = ? AND password = ?"
    cursor.execute(query, (user.username, user.password))
    if not (row := cursor.fetchone()):
        raise HTTPException(status_code=401, detail="Incorrect username or password")
    payload = {
        "iss": "CLIENT_ID", # Replace this with your client ID
        "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=5) # Set the expiration time
    }
    token = jwt.encode(payload, secret_key, algorithm="HS256")
    return {"username": row[1], "email": row[3], "token": token}

@app.post("/register")
async def create_user(user: User):
    conn = connect()
    cursor = conn.cursor()
    username = user.username
    email = user.email
    
    # Check if username or email already exists
    cursor.execute("SELECT COUNT(*) FROM passenger WHERE username = ? OR email = ?", (username, email,))
    result = cursor.fetchone()
    if result and result[0] > 0:
        return {"error": "Username or email already exists"}
    
    # Insert user into passenger table
    columns = ['username', 'password', 'email', 'first_name', 'last_name', 'phone_number', 'address', 'city', 'state', 'zip_code']
    values = [getattr(user, col) for col in columns]
    columns_present = [col for col in columns if getattr(user, col) is not None]
    query = f"INSERT INTO passenger ({', '.join(columns_present)}) VALUES ({', '.join(['?']*len(columns_present))})"
    cursor.execute(query, values[:len(columns_present)])
    conn.commit()
    return {"message": "User created successfully"}

# Load the Model
model = pickle.load(open('../model/model/titanic_model.pkl', 'rb'))
train = pd.read_csv('../model/data/train.csv')
train_age_median = train['Age'].median()
train_embarked_mode = train['Embarked'].mode()[0]
train_fare_median = train['Fare'].median()

# Setting up the home route
@app.get("/")
def read_root():
    return {"data": "Welcome to titanic prediction model"}

class Ticket(BaseModel):
    passenger_id: int
    pclass: int
    name: str
    sex: str
    age: int
    sibsp: int
    parch: int
    ticket: str
    fare: float
    cabin: str
    embarked: str
    
@app.post("/prediction")
async def get_predict(ticket: Ticket):
    pipeline = data(passenger_id=ticket.passenger_id, pclass=ticket.pclass, name=ticket.name, sex=ticket.sex, age=ticket.age, sibsp=ticket.sibsp, parch=ticket.parch, ticket=ticket.ticket, fare=ticket.fare, cabin=ticket.cabin, embarked=ticket.embarked, train_age_median=train_age_median, train_embarked_mode=train_embarked_mode, train_fare_median=train_fare_median)
    prepro_data = pipeline.preprocess()
    prediction = model.predict(prepro_data.values.reshape(1, -1))
    
    return {
        "data": {
            'prediction': str(prediction[0])
        }
    }

# Configuring the server host and port
if __name__ == '__main__':
    uvicorn.run(app, port=8080, host='0.0.0.0')


    """
    {
    "Pass_id" : 1,
    "pclass" : 3,
    "name" : "Braund, Mr. Owen Harris",
    "sex" : "M",
    "age": 22,
    "sibsp" : 1,
    "parch" : 0,
    "ticket" : "A/5 21171",
    "fare" : 8.25,
    "cabin":" ",
    "embarked":"S"
}
    """