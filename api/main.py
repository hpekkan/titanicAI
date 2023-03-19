# Importing necessary libraries
import uvicorn
import pickle
from pydantic import BaseModel
from fastapi import Request,FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import json
import os
from typing import Optional
import pyodbc
from dotenv import load_dotenv
load_dotenv()

import warnings
warnings.filterwarnings('ignore')




 
from pipeline import data
 
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

server = os.environ.get('DATABASE_URL')
database = os.environ.get('DATABASE_NAME')
username = os.environ.get('DATABASE_USERNAME')
password = os.environ.get('PASSWORD')


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
    
def connect():
    try:
        return pyodbc.connect(
            f'Driver={{ODBC Driver 18 for SQL Server}};Server=tcp:{server},1433;DATABASE={database};Uid={username};Pwd={password};Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;'
        )
    except pyodbc.Error as e:
        print(f"Error connecting to database: {e}")
        raise HTTPException(status_code=500, detail="Server error")
# Login endpoint
@app.post("/login")
async def login(user: User):
    conn = connect()
    cursor = conn.cursor()
    query = "SELECT * FROM users WHERE username = %s AND password = %s"
    cursor.execute(query, (user.username, user.password))
    if row := cursor.fetchone():
        # Return user data or JWT token
        return {"username": row[1], "email": row[3]}
    else:
        raise HTTPException(status_code=401, detail="Incorrect username or password")
    
# Create user endpoint
@app.post("/users")
async def create_user(user: User):
    conn = connect()
    cursor = conn.cursor()
    columns = ['username', 'password', 'email', 'first_name', 'last_name', 'phone_number', 'address', 'city', 'state', 'zip_code']
    values = [getattr(user, col) for col in columns]
    columns_present = [col for col in columns if getattr(user, col) is not None]
    query = f"INSERT INTO users ({', '.join(columns_present)}) VALUES ({', '.join(['%s']*len(columns_present))})"
    cursor.execute(query, values[:len(columns_present)])
    conn.commit()
    return {"message": "User created successfully"}

# Load the Model
model = pickle.load(open('../model/model/titanic_model.pkl', 'rb'))
train = pd.read_csv('../model/data/train.csv')
train_age_median = train['Age'].median()
train_embarked_mode = train['Embarked'].mode()[0]
train_fare_median = train['Fare'].median()
#print(model.predict(data.values.reshape(1, -1)))

# Setting up the home route
@app.get("/")
def read_root():
    return {"data": "Welcome to online employee hireability prediction model"}

class Ticket(BaseModel):
    Pass_id=int
    pclass=int
    name=str
    sex=str
    age=int
    sibsp=int
    parch=int
    ticket=str
    fare=float
    cabin=str
    embarked=str
    
# Setting up the prediction route
@app.get("/prediction")
async def get_predict(request: Request):
    api_data = await request.json()
    
    pipeline = data(Pass_id=api_data["Pass_id"],pclass=api_data["pclass"],name=api_data["name"],sex=api_data["sex"],age=api_data["age"],sibsp=api_data["sibsp"],parch=api_data["parch"],ticket=api_data["ticket"],fare=api_data["fare"],cabin=api_data["cabin"],embarked=api_data["embarked"],train_age_median=train_age_median,train_embarked_mode=train_embarked_mode,train_fare_median=train_fare_median)
    prepro_data = pipeline.preproccessing()
    prediction = model.predict(prepro_data.values.reshape(1, -1))
    
    return {
        "data": {
            'prediction': str(prediction[0]) }
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