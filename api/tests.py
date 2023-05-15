import unittest
import requests

class TestTictanic(unittest.TestCase):
    def setUp(self):
        self.base_url = "http://localhost:8000"  # Replace with your API endpoint URL
        self.test_user = {
            "username": "testuser",
            "password": "testpassword",
            "email": "testuser@example.com",
            "balance": 100.00,
        }
    def delete_user(self):
        response = requests.delete(f"{self.base_url}/delete_user?username={self.test_user['username']}")
        print(response.json())
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"message": "User deleted successfully"})
        
    def test_create_user_success(self):
        response = requests.post(f"{self.base_url}/signup", json=self.test_user)
        print(response.json())
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"message": "User created successfully"})
        self.delete_user()
        

if __name__ == '__main__':
    unittest.main()
