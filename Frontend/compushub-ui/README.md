# Course API — React Frontend

## Project Description

This project is a React frontend application that displays course data retrieved from a Spring Boot backend REST API.

The project was developed for the **Enterprise Web App — Course API Lab 1**.

The React application uses **Axios** to communicate with the Spring Boot backend and displays the courses in a readable table.

## Technologies Used

### Frontend

- React
- Vite
- Axios
- JavaScript
- CSS

### Backend

- Spring Boot
- Java
- REST API

## Project Structure

```text
src/
├── components/
│   └── Courses.jsx
├── services/
│   └── courseApi.js
├── App.jsx
├── App.css
└── main.jsx
```

## Backend API

The React application gets course data from the following Spring Boot API:

```text
GET http://localhost:8080/api/v1/courses
```

The API returns course information such as:

- ID
- Course Code
- Course Title
- Credits

## How to Run the Project

### 1. Start the Spring Boot Backend

First, start the Spring Boot backend project.

The backend should run on:

```text
http://localhost:8080
```

The courses API should be available at:

```text
http://localhost:8080/api/v1/courses
```

### 2. Start the React Frontend

Open a terminal in the React project folder:

```bash
cd D:\ReactProject\compushub-ui
```

Install the project dependencies if necessary:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The React application should run on:

```text
http://localhost:5173
```

Open this address in a browser to view the application.

## Course Display

The application displays the courses received from the Spring Boot backend in a table.

The table contains:

| Column  | Description                  |
| ------- | ---------------------------- |
| ID      | Course identification number |
| Code    | Course code                  |
| Title   | Course title                 |
| Credits | Number of course credits     |

## Application States

The React application handles different API states:

- **Loading:** Displays `Loading courses...`
- **Error:** Displays `Unable to load courses. Check the backend and try again.`
- **Empty:** Displays `No courses available.`
- **Success:** Displays the courses in a table and shows the total number of courses.

## CORS

The Spring Boot backend allows requests from the React development server:

```text
http://localhost:5173
```

This allows the React frontend to communicate with the Spring Boot backend during development.

## Testing

The application was tested with the following cases:

1. Successfully loading courses from the backend.
2. Changing backend course data and verifying that the updated data appears in React.
3. Stopping the backend and verifying the error message.
4. Testing an empty course response.
5. Checking the browser Network tab and verifying that:
   - Request method is `GET`
   - URL is `/api/v1/courses`
   - Response status is `200 OK`
   - Response is a JSON array

## Student Information

**Name:** Mahbobullah Merzaee

**Course:** Enterprise Web App

**Lab:** Course API Lab 1

**Date:** 7 October 2026
