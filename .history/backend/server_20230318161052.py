import pyodbc
import os
from dotenv import load_dotenv

load_dotenv()


server = os.environ.get('DATABASE_URL')
database = os.environ.get('DATABASE_NAME')
username = os.environ.get('DATABASE_USERNAME')
password = os.environ.get('PASSWORD')

//print(f"Server: {server}, Database: {database}, Username: {username}, Password: {password}")
with pyodbc.connect(f'Driver={{ODBC Driver 18 for SQL Server}};Server=tcp:{server},1433;DATABASE={database};Uid={username};Pwd={password};Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;') as conn:
    with conn.cursor() as cursor:
        cursor.execute("SELECT TOP 3 name, collation_name FROM sys.databases")
        while row := cursor.fetchone():
            print(f"{str(row[0])} {str(row[1])}")