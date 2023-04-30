
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
    route_id: int
    departure_location: str
    arrival_location: str
    departure_time: datetime.datetime
    ticket_quantity: int
    onSale: bool
    ticket_id: int = None
    left_ticket:int
class VoyageIn(BaseModel):
    departure_location: str
    arrival_location: str
    departure_time: datetime.datetime
    ticket_quantity: int
    onSale: bool
    left_ticket:int
class VoyageOut(BaseModel):
    Voyages:  List[Voyage] = []
class User(BaseModel):
    username: str
    password: str
    balance: float
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
    user_id: int
    username: str
    email: Optional[str] = None
    user_id: Optional[str] = None
    balance: float  = None
    authority_level: Optional[str] = None
class UserUpdate(BaseModel):
    username: str
    balance: float = None
    email: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone_number: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip_code: Optional[str] = None
    authority_level: Optional[str] = None
class TicketIn(BaseModel):
    route_id: int
    departure_location: str
    arrival_location: str
    departure_date: datetime.datetime
    return_date: str
    ticket_type: str
    price: float

class Ticket(BaseModel):
    ticket_id: int
    route_id: int
    departure_location: str
    arrival_location: str
    departure_date: datetime.datetime
    return_date: str
    ticket_type: str
    price: float
    
class TicketOut(BaseModel):
    tickets: List[Ticket] = []

class Reservation(BaseModel):
    user_id: int = None
    ship_name: str = None
    route_id: int = None
    ticket_id: int = None
    ticket_price: float = None
    departure_date: datetime.datetime = None
    return_date: str = None
    payment_id: int = None
    pclass: int= None
    name: str= None
    sex: str= None
    age: Optional[float] = None
    sibsp: int= None
    parch: int= None
    ticket: str= None
    fare: float= None
    cabin: str= None
    embarked: str= None
    
class ReservationOut(BaseModel):
    reservation_id: int = None  
    user_id: int = None
    ship_name: str = None
    route_id: int = None
    ticket_id: int = None
    departure_date: datetime.datetime = None
    return_date: str = None
    price: float = None
    payment_id: int = None
    pclass: int= None
    name: str= None
    sex: str= None
    age: Optional[float] = None
    sibsp: int= None
    parch: int= None
    ticket: str= None
    fare: float= None
    cabin: str= None
    embarked: str= None
class ReservationArray(BaseModel):
    reservations: List[ReservationOut] = []
class Payment(BaseModel):
    user_id: int
    ticket_id: int
    payment_amount: float
    payment_date: datetime.datetime
    payment_status: str
class model_data(BaseModel):
    Pass_id: int
    pclass: int
    name: str
    sex: str
    age: Optional[float] = None
    sibsp: int
    parch: int
    ticket: str
    fare: float
    cabin: str
    embarked: str
    
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