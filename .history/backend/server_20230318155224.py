import pyodbc
import os
from dotenv import load_dotenv

load_dotenv()


server = os.environ.get('DATABASE_URL')
database = os.environ.get('DATABASE_NAME')
username = os.environ.get('USERNAME')
password = os.environ.get('PASSWORD')

driver= '{ODBC Driver 18 for SQL Server}'

with pyodbc.connect('Driver={ODBC Driver 18 for SQL Server};Server=tcp:usf-hpekkan.database.windows.net,1433;Database=tictanic;Uid=hpekkan;Pwd=2336Huso2336;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;') as conn:
    with conn.cursor() as cursor:
        cursor.execute("SELECT TOP 3 name, collation_name FROM sys.databases")
        while row := cursor.fetchone():
            print(f"{str(row[0])} {str(row[1])}")