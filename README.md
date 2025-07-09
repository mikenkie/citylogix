# Getting Started
- The application was built using WebStorm. 
- Install all the dependencies required. 

## 1. Setup the Database
Credentials:
- username: postgres
- password: 1850
- database name: citylogix

Navigate to the backend folder where the database is located, and run the following commands:

### `npx prisma migrate dev --name init`
### `npx prisma generate`
### `npm run seed`
### `npm run run:functions`

If there exist a prisma migration, you can do the following first then proceed with the above commands:
### `npx prisma migrate reset`

## 2. Run the Server
Navigate to the backend folder, and run the following command:

### `npm run dev`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 3. Run the Tests
Navigate to the backend folder, and run the following command:

### `npx jest`

Launches the test runner and executes all tests.

## 3. Run the React App
Navigate to the frontend folder, and execute the following command:

### `npm start`

The React App will be launched on port 3001 (by default it is 3000, but it will prompt to switch as the server is using port 3000)


