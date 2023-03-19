import unittest
from fastapi.testclient import TestClient
import sys
sys.path.append('C:\\Users\\LEGION\\Desktop\\titanic_ai\\api')
from main import app

client = TestClient(app)

class TestAPI(unittest.TestCase):
    # Testing / endpoint
    def test_root(self):
        response = client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"data": "Welcome to titanic prediction model"})

    # Testing /users endpoint
    def test_create_user(self):
        data = {
            "username": "new_user",
            "password": "test_password",
            "email": "new_user@test.com",
            "first_name": "John",
            "last_name": "Doe",
            "phone_number": "1234567890",
            "address": "123 Main St",
            "city": "New York",
            "state": "NY",
            "zip_code": "12345"
        }
        expected_output = {"message": "User created successfully"}

        response = client.post("/users", json=data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), expected_output)

    # Testing /login endpoint
    def test_login(self):
        data = {"username": "new_user", "password": "test_password"}
        expected_output = {"username": "new_user", "email": "new_user@test.com"}

        response = client.post("/login", json=data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), expected_output)

    
    # Testing /prediction endpoint
    def test_prediction(self):
        data = {
            "passenger_id":45,
            "pclass": 3,
            "name": "Devaney, Miss. Margaret Delia",
            "sex": "female",
            "age": 19,
            "sibsp": 0,
            "parch": 0,
            "ticket": "330958",
            "fare": 7.8792,
            "cabin": "",
            "embarked": "Q"
        }   
        expected_output = {"data": {"prediction": "1"}}

        response = client.post("/prediction", json=data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), expected_output)


if __name__ == "__main__":
    unittest.main()