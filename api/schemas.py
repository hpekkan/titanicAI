
from pydantic import BaseModel
from typing import Optional,List
import datetime    

class Token(BaseModel):
    access_token: str
    token_type: str
    
class TokenData(BaseModel):
    username: str | None = None
   
class TokenSchema(BaseModel):
    access_token: str
    refresh_token: str
class TokenPayload(BaseModel):
    sub: str = None
    exp: int = None
    
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
class Voyage(BaseModel):
    route_id: str
    departure_location: str
    arrival_location: str
    departure_time: datetime.datetime
class VoyageOut(BaseModel):
    Voyages:  List[Voyage] = []
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
    authority_level: Optional[str] = None
    
class UserOut(BaseModel):
    username: str
    email: Optional[str] = None
    user_id: Optional[str] = None
    authority_level: Optional[str] = None
      