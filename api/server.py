from dotenv import load_dotenv
import os
from fastapi import HTTPException
import pyodbc


load_dotenv()

db_settings = {
    'server': os.environ.get('DATABASE_URL'),
    'database': os.environ.get('DATABASE_NAME'),
    'username': os.environ.get('DATABASE_USERNAME'),
    'password': os.environ.get('PASSWORD')
}


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
        raise HTTPException(status_code=500, detail="Server error") from e
    