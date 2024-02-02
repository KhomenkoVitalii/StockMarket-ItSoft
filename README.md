# Limit Order Book

**Home Assignment: Full Stack Developer Position**

## Api
* Install requirements:
```
pip install -r requirements.txt
```
* Update requirements:
```
pip freeze > requirements.txt
```
* Run local:
```
python manage.py runserver
```
* Run docker-compose:
```
docker-compose up --build
```
* Make migrations:
```
python manage.py makemigrations
python manage.py migrate
```

### Set environment variables:
**list of environment variables which should be set:**<br>
```
DATABASE_HOST
DATABASE_NAME
DATABASE_USER
DATABASE_PASSWORD
DATABASE_PORT
DEBUG
SECRET_KEY
```
if running with docker: 
DATABASE_HOST should be set as name of container with db<br>

**Linux:**
```
export SOME_VARIABLE=some_value
```

### Endpoints:
```
http://0.0.0.0:8000/api/transactions/
http://0.0.0.0:8000/api/orders/
http://0.0.0.0:8000/auth/stocks/'
http://0.0.0.0:8000/auth/login/',
http://0.0.0.0:8000/auth/logout/',
http://0.0.0.0:8000/auth/register/',
http://0.0.0.0:8000/auth/token/'
```
---

**Objective:**

Develop a web application that simulates a stock market limit order book, using Django Framework. The application should allow users to add buy and sell orders for stocks, match orders where possible, and display the current state of the order book through both a UI and an API.

---

**Requirements:**

1. **Web UI**:
    - Design and implement a simple and clean interface.
    - Include fields for adding new stock orders (stock name, order type, price, quantity).
    - Display the current state of the order book, showing unmatched buy and sell orders.
    - Provide a section or page to view a history of all matched transactions.
2. **API**:
    - Design and Implement RESTful API endpoints for adding orders and retrieving the order book and transaction history.
3. **Data Model**:
    - Design models to store orders and transactions. The models should adhere to the rest of the requirements.
4. **Order Matching Logic**:
    - Implement the logic to match buy and sell orders based on price and quantity.
5. **Order Book Rules**:
    - Orders should be matched based on price; a buy order matches with the lowest sell order that is less than or equal to the buy price (and vice versa).
    - Implement basic order priority rules, such as first-come-first-served.
    - Orders with the same price should be matched in the order they were entered (time priority).
    - Partial order matching is allowed. If a buy order cannot be fully matched, it should be partially fulfilled with the available sell orders.
    - Unmatched orders remain in the order book until they are either matched or cancelled by the user.

---

**Optional Requirements**:

1. **Authentication**:
    - Implement a basic user registration and login system.
    - Ensure that each user can view only their order history and current orders.
2. **Enhanced UI**:
    - Develop a more advanced user interface using React/React-Native.
3. **Real-time Updates**:
    - Implement real-time updates in the UI as new orders are added or matched.
4. **Performance**:
    - Optimize the order matching algorithm and database queries for performance.

---

**Instructions**:

1. Use Django for the backend and a Relational Database.
2. Ensure that the application handles errors gracefully, displays appropriate messages for incorrect inputs or system errors.
3. Ensure that the code is modular, clean, and follows best practices.
4. Containerize your application using Docker for easy deployment and scalability.
5. Implement unit tests for critical components, especially the order matching logic.
6. Host your project on GitHub in a private repository and give access to the account ritual-company-dev, email: [ritual-dev@heyritual.com](mailto:ritual-dev@heyritual.com).

---

**Submission Guidelines**:

1. Share the link to the repository and ensure it's accessible to the provided email.
2. Include all the necessary instructions for setting up and running your project in the **`README.md`** file.
3. Ensure that all commits are well-structured and meaningful, showing the progression of your work.

---
