# user-management-api-express-postgres-

A simple Express + PostgreSQL API for managing users.

## Base URL

```text
http://localhost:3000
```

## API Endpoints

### 1) Get all users
- Method: GET
- URL: http://localhost:3000/api/users

Postman:
- Open Postman
- Select GET
- Enter http://localhost:3000/api/users
- Click Send

### 2) Get one user by ID
- Method: GET
- URL: http://localhost:3000/api/users/1

Postman:
- Select GET
- Enter http://localhost:3000/api/users/1
- Click Send

### 3) Create a user
- Method: POST
- URL: http://localhost:3000/api/users

Body (JSON):
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "333232",
  "role": "HR"
}
```

Postman:
- Select POST
- Enter http://localhost:3000/api/users
- Go to Body -> raw -> JSON
- Paste the JSON above
- Click Send

### 4) Update a user
- Method: PUT
- URL: http://localhost:3000/api/users/1

Body (JSON):
```json
{
  "name": "John Updated",
  "email": "john.updated@example.com",
  "password": "newpassword",
  "role": "ADMIN"
}
```

Postman:
- Select PUT
- Enter http://localhost:3000/api/users/1
- Go to Body -> raw -> JSON
- Paste the JSON above
- Click Send

### 5) Delete a user
- Method: DELETE
- URL: http://localhost:3000/api/users/1

Postman:
- Select DELETE
- Enter http://localhost:3000/api/users/1
- Click Send

## Run the server

```bash
npm install
node server.js
```

## Notes

- Make sure PostgreSQL is running.
- Make sure your database and users table exist.
- If you want, I can also help you add JWT auth and validation next.
