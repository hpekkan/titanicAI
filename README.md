
<div align="center">
  
# <p align="center">🔱 TitanicAI 👷‍♂️🛳️  </p>

## <p align="center"> Home Page </p>
<p align="center">
"Titanic AI" is a web application that uses artificial intelligence to predict whether passengers on the Titanic survived or not. It analyzes factors like class, age, and gender to make predictions. The app offers various functions through its API, including signing up, managing accounts, adding voyages and tickets, creating reservations, and getting predictions. It ensures security with JWT-based authentication. Users interact with the app through API requests, and administrators can manage voyages and tickets. This demonstrates how AI can be used to analyze historical data and make predictions.
</p>

![image](https://github.com/hpekkan/titanicAI/assets/75019129/713e774d-6a42-48e5-9f8c-01957ff11707)

## <p align="center"> Login Page </p>
<p align="center">
Authenticate a user and generate access and refresh tokens using JWT (JSON Web Tokens) with HS256 algorithm and Bearer token authorization.
</p>

![image](https://github.com/hpekkan/titanicAI/assets/75019129/80782ba6-bb0f-49a5-b48a-c18ead2bdb2a)

## <p align="center"> Admin Panel </p>
<p align="center">
In the admin panel, admins have control over ticket management, including sales, unsales, edits, and removals. This allows administrators to adjust ticket availability and details as needed.
</p>

https://github.com/hpekkan/titanicAI/assets/75019129/c3bd82b4-0cf3-4a64-ae4d-0ef12e23912f

## <p align="center"> Ticket Booking System and Prediction </p>
<p align="center">
While the web app's full implementation is pending, its underlying logic is functioning smoothly. This logic calculates survival rates and saves the results to the database. This feature offers users an interactive way to choose tickets based on their preferences and anticipated survival rates.
</p>

https://github.com/hpekkan/titanicAI/assets/75019129/d580485f-63c1-46bd-96c1-b43e4429bd20

## <p align="center"> Ticket Booking System and Prediction </p>
<p align="center">
You have the ability to enhance your account's balance with a single click! Each click will add $100 to your balance, enabling you to conveniently manage your funds.
  Kindly note that the balance exhibited on this platform is intended for demonstration purposes exclusively. It does not signify actual monetary transactions and has been artificially generated for illustrative reasons. The displayed balance is not reflective of authentic financial value.
</p>

![image](https://github.com/hpekkan/titanicAI/assets/75019129/8f567522-b477-4df9-8045-4c084f89ca10)


## <p align="center"> Azure SQL Database Schema </p>

## **Database Table: passenger**

| Column         | Data Type   | Explanation                                                                                         |
|----------------|-------------|-----------------------------------------------------------------------------------------------------|
| user_id        | INTEGER     | Unique identifier for each user. Auto-incremented primary key.                                    |
| username       | VARCHAR(50) | User's chosen username.                                                                             |
| password       | VARCHAR(100)| Hashed password using a secure hashing algorithm.                                                 |
| email          | VARCHAR(100)| User's email address.                                                                               |
| first_name     | VARCHAR(50) | User's first name.                                                                                  |
| last_name      | VARCHAR(50) | User's last name.                                                                                   |
| phone_number   | VARCHAR(20) | User's phone number.                                                                                |
| address        | VARCHAR(100)| User's address.                                                                                     |
| city           | VARCHAR(50) | City where the user resides.                                                                        |
| state          | VARCHAR(50) | State or province where the user resides.                                                          |
| zip_code       | VARCHAR(20) | ZIP code or postal code of the user's location.                                                    |
| authority_level| VARCHAR(20) | User's authority level, such as "admin" or other access levels.                                   |
| balance        | DECIMAL(10, 2)| User's account balance.                                                                           |

**Explanations:**

- **user_id**: An auto-incremented primary key that uniquely identifies each user.

- **username**: The username chosen by the user during registration. It provides a unique identifier for authentication.

- **password**: The user's password, securely hashed using a strong hashing algorithm like bcrypt. Hashing passwords enhances security by preventing the storage of plain text passwords.

- **email**: The user's email address, which serves as a contact method and identifier.

- **first_name**: The user's first name.

- **last_name**: The user's last name.

- **phone_number**: The user's phone number for contact purposes.

- **address**: The user's address, which could include street details and additional information.

- **city**: The city where the user resides.

- **state**: The state or province where the user resides.

- **zip_code**: The ZIP code or postal code of the user's location.

- **authority_level**: Represents the user's role or access level. In this case, "admin" suggests administrative privileges.

- **balance**: The user's account balance, which indicates the amount of funds available for transactions within the application.


 ## **Database Table: ticket**

| Column            | Data Type        | Explanation                                                                                  |
|-------------------|------------------|----------------------------------------------------------------------------------------------|
| ticket_id         | INTEGER          | Unique identifier for each ticket. Auto-incremented primary key.                             |
| departure_location| VARCHAR(100)     | The location from which the passenger will depart.                                          |
| arrival_location  | VARCHAR(100)     | The intended arrival location for the passenger.                                            |
| departure_date    | DATETIME         | The date and time of departure.                                                              |
| return_date       | VARCHAR(50)      | The return date for the ticket, or a value like "never" indicating a one-way trip.           |
| ticket_type       | VARCHAR(50)      | Type of ticket, such as "economy," "business," etc.                                        |
| price             | DECIMAL(10, 2)   | The price of the ticket.                                                                     |
| route_id          | INTEGER          | Foreign key referencing the "route" table, indicating the specific voyage associated with the ticket. |

**Explanations:**

- **ticket_id**: An auto-incremented primary key that uniquely identifies each ticket.

- **departure_location**: The starting point or departure location for the passenger's journey.

- **arrival_location**: The destination or arrival location for the passenger's journey.

- **departure_date**: The date and time when the passenger is expected to depart.

- **return_date**: The return date for the ticket, or a value like "never" indicating a one-way trip. This field could be a DATETIME as well if actual return dates are recorded.

- **ticket_type**: Indicates the type of ticket purchased, such as "economy," "business," or other categories.

- **price**: The price of the ticket, typically represented as a decimal value with two decimal places.

- **route_id**: A foreign key that references the "route" table, indicating the specific voyage or route associated with the ticket. This establishes a relationship between tickets and voyages.

## **Database Table: route**

| Column             | Data Type        | Explanation                                                                                       |
|--------------------|------------------|---------------------------------------------------------------------------------------------------|
| route_id           | INTEGER          | Unique identifier for each route. Auto-incremented primary key.                                  |
| departure_location | VARCHAR(100)     | The location from which the voyage will depart.                                                  |
| arrival_location   | VARCHAR(100)     | The intended arrival location for the voyage.                                                    |
| departure_time     | DATETIME         | The date and time of departure for the voyage.                                                   |
| ticket_quantity    | INTEGER          | The total quantity of tickets available for this voyage.                                         |
| onSale             | BOOLEAN          | Indicates whether tickets for this voyage are currently on sale (True) or not (False).           |
| ticket_id          | INTEGER          | Foreign key referencing the "ticket" table, indicating the specific type of ticket for the voyage.|
| left_ticket        | INTEGER          | The remaining quantity of tickets available for purchase.                                        |

**Explanations:**

- **route_id**: An auto-incremented primary key that uniquely identifies each route.

- **departure_location**: The starting point or departure location for the voyage.

- **arrival_location**: The destination or arrival location for the voyage.

- **departure_time**: The date and time when the voyage is scheduled to depart.

- **ticket_quantity**: The total number of tickets available for this voyage.

- **onSale**: A boolean value indicating whether tickets for this voyage are currently on sale (True) or not (False).

- **ticket_id**: A foreign key that references the "ticket" table, indicating the specific type of ticket associated with the voyage. This field establishes a relationship between voyages and ticket types.

- **left_ticket**: The remaining quantity of tickets available for purchase on this voyage.


## **Database Table: reservation**

| Column          | Data Type        | Explanation                                                                                      |
|-----------------|------------------|--------------------------------------------------------------------------------------------------|
| reservation_id  | INTEGER          | Unique identifier for each reservation. Auto-incremented primary key.                            |
| user_id         | INTEGER          | Foreign key referencing the "user" table, indicating the user who made the reservation.        |
| ship_name       | VARCHAR(100)     | The name of the ship or vessel associated with the reservation.                                  |
| route_id        | INTEGER          | Foreign key referencing the "route" table, indicating the specific voyage associated with the reservation. |
| departure_date  | DATETIME         | The date and time when the passenger is expected to depart for the reservation.                  |
| return_date     | VARCHAR(50)      | The return date for the reservation, or a value like "never" indicating a one-way trip.           |
| price           | DECIMAL(10, 2)   | The total price of the reservation.                                                               |
| payment_id      | INTEGER          | Foreign key referencing the "payment" table, indicating the payment details for the reservation. |
| ticket_id       | INTEGER          | Foreign key referencing the "ticket" table, indicating the specific ticket associated with the reservation. |
| pclass          | INTEGER          | The passenger class associated with the reservation.                                             |
| name            | VARCHAR(100)     | The name of the passenger for whom the reservation is made.                                     |
| sex             | VARCHAR(10)      | The gender of the passenger.                                                                     |
| age             | INTEGER          | The age of the passenger.                                                                        |
| sibsp           | INTEGER          | The number of siblings or spouses traveling with the passenger.                                 |
| parch           | INTEGER          | The number of parents or children traveling with the passenger.                                  |
| ticket          | VARCHAR(50)      | The ticket identifier for the reservation.                                                       |
| fare            | DECIMAL(10, 2)   | The fare paid for the reservation.                                                               |
| cabin           | VARCHAR(10)      | The cabin or room associated with the reservation.                                              |
| embarked        | VARCHAR(1)       | The port of embarkation for the reservation.                                                     |
| prediction      | INTEGER          | The survival prediction associated with the reservation.                                          |

**Explanations:**

- **reservation_id**: An auto-incremented primary key that uniquely identifies each reservation.

- **user_id**: A foreign key referencing the "user" table, indicating the user who made the reservation.

- **ship_name**: The name of the ship or vessel associated with the reservation.

- **route_id**: A foreign key referencing the "route" table, indicating the specific voyage associated with the reservation.

- **departure_date**: The date and time when the passenger is expected to depart for the reservation.

- **return_date**: The return date for the reservation, or a value like "never" indicating a one-way trip.

- **price**: The total price of the reservation, typically represented as a decimal value with two decimal places.

- **payment_id**: A foreign key referencing the "payment" table, indicating the payment details for the reservation.

- **ticket_id**: A foreign key referencing the "ticket" table, indicating the specific ticket associated with the reservation.

- **pclass**: The passenger class associated with the reservation.

- **name**: The name of the passenger for whom the reservation is made.

- **sex**: The gender of the passenger.

- **age**: The age of the passenger.

- **sibsp**: The number of siblings or spouses traveling with the passenger.

- **parch**: The number of parents or children traveling with the passenger.

- **ticket**: The ticket identifier for the reservation.

- **fare**: The fare paid for the reservation.

- **cabin**: The cabin or room associated with the reservation.

- **embarked**: The port of embarkation for the reservation.

- **prediction**: The survival prediction associated with the reservation.


## **Database Table: payment**

| Column          | Data Type        | Explanation                                                                                      |
|-----------------|------------------|--------------------------------------------------------------------------------------------------|
| payment_id      | INTEGER          | Unique identifier for each payment. Auto-incremented primary key.                                |
| user_id         | INTEGER          | Foreign key referencing the "user" table, indicating the user associated with the payment.       |
| ticket_id       | INTEGER          | Foreign key referencing the "ticket" table, indicating the ticket associated with the payment.   |
| payment_amount  | DECIMAL(10, 2)   | The amount of money paid for the ticket or reservation.                                         |
| payment_date    | DATETIME         | The date and time when the payment was made.                                                    |
| payment_status  | VARCHAR(20)      | The status of the payment, such as "paid" or "pending".                                          |

**Explanations:**

- **payment_id**: An auto-incremented primary key that uniquely identifies each payment.

- **user_id**: A foreign key referencing the "user" table, indicating the user associated with the payment.

- **ticket_id**: A foreign key referencing the "ticket" table, indicating the ticket associated with the payment.

- **payment_amount**: The amount of money paid for the ticket or reservation. This could be a decimal value representing the payment amount.

- **payment_date**: The date and time when the payment was made. This helps in tracking when the payment occurred.

- **payment_status**: The status of the payment, which could be "paid," "pending," or any other relevant status. This field indicates the state of the payment process.



<!--# <h3 align="center">🌐 Vercel Web App (lots of bugs):  https://titanic-ai.vercel.app ⚓</h3>

# <h3 align="center">🌐 Netlify Web App (lots of bugs):  https://cute-cupcake-762d4a.netlify.app/ ⚓</h3>  
  
# <h3 align="center">🛟 Public api (fastapi currently deactive):  https://146.190.176.211 </h3>
  
# <h3 align="center">🛟 Public api (fastapi/docs currently deactive):  https://146.190.176.211/docs </h3>
  -->
</div>
