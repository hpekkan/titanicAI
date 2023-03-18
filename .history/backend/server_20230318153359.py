import pyodbc
import os
from dotenv import load_dotenv

load_dotenv()


server = os.environ.get('DATABASE_URL')
database = os.environ.get('DATABASE_NAME')
username = os.environ.get('USERNAME')
password = os.environ.get('PASSWORD')
  
driver= '{ODBC Driver 17 for SQL Server}'

with pyodbc.connect('DRIVER='+driver+';SERVER=tcp:'+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD='+ password) as conn:
    with conn.cursor() as cursor:
        cursor.execute("SELECT TOP 3 name, collation_name FROM sys.databases")
        row = cursor.fetchone()
        while row:
            print (str(row[0]) + " " + str(row[1]))
            row = cursor.fetchone()