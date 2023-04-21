import datetime
from typing import Optional
import os
import pickle
from jose import JWTError
import jwt
import pandas as pd
import pyodbc
import uvicorn
import warnings
from pydantic import BaseModel, ValidationError
from dotenv import load_dotenv
from fastapi import Depends, FastAPI, status, HTTPException
from fastapi.responses import RedirectResponse
from fastapi.security import OAuth2PasswordBearer,OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from passlib.context import CryptContext
from server import connect
from deps import get_current_user
from schemas import TokenPayload, User, UserOut,TokenSchema,Ticket,Voyage,VoyageOut,VoyageIn,VoyageEdit
from datetime import datetime
from typing import Union, Any 
from utils import  (
    get_hashed_password,
    create_access_token,
    create_refresh_token,
    verify_password
)
from uuid import uuid4
from pipeline import data

load_dotenv()
warnings.filterwarnings('ignore')

 
app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")
password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

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

secret_key = os.environ.get('SECRET_KEY')
refresh_key = os.environ.get('JWT_REFRESH_SECRET_KEY')
ALGORITHM = "HS256"


 
# Setting up the home route   
@app.get("/")
def read_root():
    return {"data": "Welcome to titanic prediction model"}

  
@app.post("/signup")
async def create_user(user: User):
    conn = connect()
    cursor = conn.cursor()
    username = user.username
    email = user.email
    # Check if username or email already exists
    cursor.execute("SELECT COUNT(*) FROM passenger WHERE username = ? OR email = ?", (username, email))
    result = cursor.fetchone()
    if result and result[0] > 0:
        raise HTTPException(status_code=403 , detail="Username or email already exists")
    
    # Insert user into passenger table
    user.password = password_context.hash(user.password)
    print(user.password)
    columns = ['username', 'password', 'email', 'first_name', 'last_name', 'phone_number', 'address', 'city', 'state', 'zip_code', 'authority_level']
    values = [getattr(user, col) for col in columns]
    columns_present = [col for col in columns if getattr(user, col) is not None]
    
    query = f"INSERT INTO passenger ({', '.join(columns_present)}) VALUES ({', '.join(['?']*len(columns_present))})"
    cursor.execute(query, values[:len(columns_present)])
    conn.commit()
    return {"message": "User created successfully"}


@app.post('/login', summary="Create access and refresh tokens for user", response_model=TokenSchema)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    conn = connect()
    cursor = conn.cursor()
    query = "SELECT * FROM passenger WHERE username = ?"
    cursor.execute(query, (form_data.username))
    if not (row := cursor.fetchone()):
        raise HTTPException(status_code=401, detail="User not found")
    row = dict(zip([column[0] for column in cursor.description], row))
    hashed_pass = row['password']
    if not verify_password(form_data.password, hashed_pass):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect password"
        )
    
    return {
        "access_token": create_access_token(row['username']),
        "refresh_token": create_refresh_token(row['username']),
    }
    
@app.get('/me', summary='Get details of currently logged in user', response_model=UserOut)
async def get_me(user: UserOut = Depends(get_current_user)):
    return user


@app.get('/voyages', summary='Get all voyages', response_model=VoyageOut)
async def get_voyages(user: UserOut = Depends(get_current_user)):
    conn = connect()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM route")
    rows = cursor.fetchall()
    columns = [column[0] for column in cursor.description]
    voyages = []
    for row in rows:
        row = dict(zip(columns, row))
        voyage: Union[dict[str, Any], None] = row
        voyages.append(voyage)

    if voyages is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Could not find user",
        )
    return VoyageOut(**{'Voyages': voyages})

@app.delete('/voyages/{voyage_id}', summary='Delete voyage')
async def delete_voyage(voyage_id: int, user: UserOut = Depends(get_current_user)):
    if user.authority_level != 'admin':
        raise HTTPException(status_code=401, detail="You are not authorized to view this page")
    conn = connect()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM route WHERE route_id = ?", (voyage_id))
    conn.commit()
    return {"message": "Voyage deleted successfully"}

@app.post('/voyages', summary='Add voyage')
async def add_voyage(voyage: VoyageIn, user: UserOut = Depends(get_current_user)):
    if(user.authority_level != 'admin'):
        raise HTTPException(status_code=401, detail="You are not authorized to view this page")
    conn = connect()
    cursor = conn.cursor()
    columns = [ 'departure_location', 'arrival_location', 'departure_time','ticket_quantity', 'onSale']
    values = [getattr(voyage, col) for col in columns]
    columns_present = [col for col in columns if getattr(voyage, col) is not None]
    query = f"INSERT INTO route ({', '.join(columns_present)}) VALUES ({', '.join(['?']*len(columns_present))})"
    cursor.execute(query, values[:len(columns_present)])
    conn.commit()
    return {"message": "Voyage added successfully"}

@app.put('/voyages', summary='Update voyage')
async def update_voyage( voyage: VoyageEdit, user: UserOut = Depends(get_current_user)):
    print(voyage)
    if(user.authority_level != 'admin'):
        raise HTTPException(status_code=401, detail="You are not authorized to view this page")
    conn = connect()
    cursor = conn.cursor()
    query = "UPDATE route SET departure_location = ?, arrival_location = ?, departure_time = ?, ticket_quantity = ?, onSale = ?  WHERE route_id = ?"
    cursor.execute(query, [voyage.departure_location, voyage.arrival_location, voyage.departure_time,voyage.ticket_quantity, voyage.onSale, voyage.voyage_id])
    conn.commit()
    return {"message": "Voyage updated successfully"}

@app.get('/refresh', summary='Refresh access token')
async def refresh(refresh_token: str):
    try:
        if not refresh_token:
            raise HTTPException(status_code=401, detail="Refresh token required")
        payload = jwt.decode(
                refresh_token, refresh_key, algorithms=[ALGORITHM]
            )
        token_data = TokenPayload(**payload)
        if datetime.fromtimestamp(token_data.exp) < datetime.now():
                raise HTTPException(
                    status_code = status.HTTP_401_UNAUTHORIZED,
                    detail="Refresh Token expired",
                    headers={"WWW-Authenticate": "Bearer"},
                )
        return {
            "access_token": create_access_token(token_data.sub),
            "refresh_token": create_refresh_token(token_data.sub),
        }
    except :
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
 #todo make passenger_Reservation 
@app.get('/user/voyages/', summary='Get users voyages', response_model=VoyageOut)
async def get_user_voyages(user: UserOut = Depends(get_current_user)):
    conn = connect()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM route")
    rows = cursor.fetchall()
    columns = [column[0] for column in cursor.description]
    voyages = []
    for row in rows:
        row = dict(zip(columns, row))
        voyage: Union[dict[str, Any], None] = row
        voyages.append(voyage)

    if voyages is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Could not find user",
        )
    print({'voyages': voyages})
    return VoyageOut(**{'Voyages': voyages})
        
    

    
# Load the Model
model = pickle.load(open('../model/model/titanic_model.pkl', 'rb'))
train = pd.read_csv('../model/data/train.csv')
train_age_median = train['Age'].median()
train_embarked_mode = train['Embarked'].mode()[0]
train_fare_median = train['Fare'].median()


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