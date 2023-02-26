# Importing necessary libraries
import uvicorn
import pickle
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd


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


# Load the Model
model = pickle.load(open('../model/model/titanic_model.pkl', 'rb'))
train = pd.read_csv('../model/data/train.csv')
pipeline = data(Pass_id=1,pclass=3,name="Braund, Mr. Owen Harris",sex="male",age=22,sibsp=1,parch=0,ticket="A/5 21171",fare=7.25,cabin="",embarked="S",train=train)
data = pipeline.preproccessing()
print(model.predict(data.values.reshape(1, -1)))