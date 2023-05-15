from typing import Union, Any
from datetime import datetime
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from dotenv import load_dotenv
from server import connect
from schemas import UserOut, TokenPayload
import os
load_dotenv()

JWT_SECRET_KEY = os.environ.get('SECRET_KEY')   # should be kept secret
ALGORITHM = "HS256"

from jose import jwt
from pydantic import ValidationError

reuseable_oauth = OAuth2PasswordBearer(
    tokenUrl="/login",
    scheme_name="JWT"
)


    
async def get_current_user(token: str = Depends(reuseable_oauth)) -> UserOut:
    try:
        payload = jwt.decode(
            token, JWT_SECRET_KEY, algorithms=[ALGORITHM]
        )
        token_data = TokenPayload(**payload)
        if datetime.fromtimestamp(token_data.exp) < datetime.now():
            
            raise HTTPException(
                status_code = status.HTTP_401_UNAUTHORIZED,
                detail="Token expired",
                headers={"WWW-Authenticate": "Bearer"},
            )
    except (jwt.JWTError, ValidationError) as e:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        ) from e
    conn = connect()
    cursor = conn.cursor()
    query = "SELECT * FROM passenger WHERE user_id = ?"
    cursor.execute(query, (token_data.sub))
    if not (row := cursor.fetchone()):
        raise HTTPException(status_code=401, detail="User not found")
    row = dict(zip([column[0] for column in cursor.description], row))
    user: Union[dict[str, Any], None] = row
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Could not find user",
        )
    return UserOut(**user)

