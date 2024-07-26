# Meeting Scheduler Application

## Overview

This application is a meeting scheduling tool that allows users to manage meetings, including creating, editing, and deleting them. It includes a backend built with Node.js, Express, and MySQL, and a frontend developed with React.js and Redux.

## Table of Contents

1. [Backend Setup](#backend-setup)
2. [Frontend Setup](#frontend-setup)
3. [Design Choices and Trade-offs](#design-choices-and-trade-offs)
4. [Disadvantages](#disadvantages)

---

### Backend Setup

#### Prerequisites

- Node.js (v20.15.0 or later)
- MySQL

#### Installation

1. **Clone the repository:**

    
bash
    git clone <https://github.com/RisperWM/Meeting-Scheduler>
    cd backend


2. **Install dependencies:**

    
bash
    npm install


3. **Create a .env file** in the root of the backend directory with the following content:

    
DATABASE_URL=mysql://username:password@localhost:3306/database_name
    JWT_SECRET=your_jwt_secret


    Replace username, password, database_name, and your_jwt_secret with your MySQL credentials and JWT secret.

4. **Synchronize the database:**

    
bash
    npx sequelize-cli db:migrate


5. **Start the server:**

    
bash
    npm run dev


    The backend server will run on http://localhost:3000.

---

### Frontend Setup

#### Prerequisites

- Node.js (v20.15.0 or later)
- Vite (for development)

#### Installation

1. **Clone the repository:**

    
bash
    git clone <https://github.com/RisperWM/Meeting-Scheduler>
    cd frontend


2. **Install dependencies:**

    
bash
    npm install


3. **Start the development server:**

    
bash
    npm run dev


    The frontend application will be available at http://localhost:5173.

---

### Design Choices and Trade-offs

#### Backend

1. **Authentication:**
   - **Choice:** Used JWT for authentication and stored tokens in cookies in the front end.
   - **Trade-off:** Storing tokens in cookies simplifies handling authentication in web browsers but may expose tokens to CSRF attacks if not properly protected.With proper CSRF protection strategies like using anti-CSRF tokens, they can be secured against CSRF attacks.

2. **Database:**
-**Sequelize** I used sequelize because allows you to work with databases using JavaScript objects and methods, rather than writing raw SQL queries
   - **Trade-off:** MySQL requires a separate server setup and can introduce complexity in managing database migrations and schema changes.

3. **Error Handling:**
   - **Choice:** Basic error handling is included for authentication and database operations.
   - **Trade-off:** More sophisticated error handling and logging might be needed for a production-grade application to better diagnose and handle issues.

#### Frontend

1. **State Management:**
   - **Choice:** Used Redux for managing application state, particularly for handling authentication and meeting data.
   - **Trade-off:** Redux adds complexity and boilerplate code to the application. Alternatives like React Context API or other state management libraries could simplify state management. But context API gives bad performance when the system is required to make many calls to the server in quick succession.

2. **Token Storage:**
   - **Choice:** Stored the authentication token in cookies for simplicity and to avoid issues with localStorage. Data stored in local storage can be read from developer tools section of the browser
   - **Trade-off:** Cookies are susceptible to CSRF attacks if not properly protected and require proper configuration of CORS and security settings.

3. **User Interface:**
   - **Choice:** Used CSS for styling to ensure a responsive and modern design.
   - **Trade-off:** it requires learning its utility-first approach, and inline class names can sometimes make the markup less readable.

4. **Routing:**
   - **Choice:** Used React Router for handling navigation within the application.
   - **Trade-off:** React Router adds additional complexity to the application routing setup and requires careful management of route protection and redirection.

---

### Disadvantages

1. **Security Concerns:**
   - Using cookies for authentication tokens can expose the application to CSRF attacks if proper protections (e.g., CSRF tokens) are not implemented.

2. **Complexity:**
   - The use of Redux for state management can add unnecessary complexity and boilerplate, especially for smaller applications or simpler state management needs.

3. **Performance:**
   - The application may experience performance issues with a large number of meetings or high server load. Caching strategies and optimization techniques may be needed to address performance bottlenecks.

4. **Scalability:**
   - The current setup may face challenges as the application scales. For instance, database schema design and API efficiency may require reevaluation as the volume of data and number of users increase.

5. **Maintenance:**
   - Maintaining and updating dependencies, especially with frequent changes in libraries like React and Redux, can be challenging and time-consuming.
