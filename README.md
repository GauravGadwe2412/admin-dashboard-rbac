# Admin Dashboard with RBAC and JWT Authentication

## Overview
This project is a lightweight admin dashboard web application that implements login authentication and role-based access control (RBAC) using JWT tokens. The application allows users to log in and access different parts of the dashboard based on their assigned roles.

## Features
- **Login Page**: Users can log in using their email and password. Upon successful login, a JWT token is received and stored securely.
- **Role-Based Access Control**: The application supports three roles: Admin, Editor, and Viewer, each with different permissions.
- **Dashboard**: Displays various cards for Orders, Riders, Settings, and Users, with interactive elements based on user roles.
- **Protected Routes**: Certain routes are protected and can only be accessed by users with the appropriate roles.
- **Logout Functionality**: Users can log out, which clears the token and redirects them to the login page.
- **Token Expiry and Auto-Logout**: JWT tokens have a short expiry time, and the application implements automatic logout when the token expires.

## Project Structure
```
admin-dashboard
├── client
│   ├── components
│   │   ├── Card.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Settings.jsx
│   │   └── NotAuthorized.jsx
│   ├── store
│   │   └── auth.js
│   ├── hooks
│   │   └── useAuth.js
│   └── App.jsx
├── server
│   ├── routes
│   │   ├── auth.js
│   │   └── data.js
│   ├── middleware
│   │   └── auth.js
│   └── server.js
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js
- npm or yarn

### Running the Frontend
1. Navigate to the `client` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```

### Running the Backend
1. Navigate to the `server` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   npm start
   ```

## Mock Credentials
- Admin: 
  - Email: admin@site.com
  - Password: admin123
- Editor: 
  - Email: editor@site.com
  - Password: editor123
- Viewer: 
  - Email: viewer@site.com
  - Password: viewer123

## Conclusion
This admin dashboard provides a robust framework for managing user roles and permissions while ensuring secure access through JWT authentication. It is designed to be lightweight and easy to extend for future features.