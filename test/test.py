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
        data = {"username": "test_user", "password": "test_password"}
        expected_output = {"username": "test_user", "email": "test@test.com"}

        response = client.post("/login", json=data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), expected_output)

    
    # Testing /prediction endpoint
    def test_prediction(self):
        data = {
            "Pass_id": 1,
            "pclass": 3,
            "name": "Braund, Mr. Owen Harris",
            "sex": "M",
            "age": 22,
            "sibsp": 1,
            "parch": 0,
            "ticket": "A/5 21171",
            "fare": 8.25,
            "cabin": "",
            "embarked": "S"
        }
        expected_output = {"data": {"prediction": "0"}}

        response = client.get("/prediction", json=data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), expected_output)


if __name__ == "__main__":
    unittest.main()