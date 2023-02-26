# Importing necessary libraries
import uvicorn
import pickle
from pydantic import BaseModel
from fastapi import Request,FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import json

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