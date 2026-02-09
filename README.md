# VaultKey - Secure Password Manager

VaultKey is a modern, secure, and user-friendly password manager built with the MERN stack (MongoDB, Express, React, Node.js). It features a sleek glassmorphism UI, robust authentication, and local encryption-ready architecture.

![VaultKey Preview](https://via.placeholder.com/800x400?text=VaultKey+Preview) *(Replace with actual screenshot)*

## 🚀 Features

-   **Secure Authentication**: User registration and login powered by `bcrypt` (password hashing) and `jsonwebtoken` (JWT).
-   **Data Isolation**: Each user can only access their own stored passwords.
-   **Modern UI/UX**:
    -   Glassmorphism design using **Tailwind CSS**.
    -   Responsive layout for all devices.
    -   Interactive animations and hover effects.
    -   Global toast notifications for user feedback.
-   **Password Management**:
    -   Add, Edit, and Delete passwords.
    -   **One-Click Copy**: Instantly copy website URLs, usernames, or passwords to clipboard.
    -   **Visibility Toggle**: Show/Hide passwords with a single click.
-   **State-Based Navigation**: Custom lightweight SPA navigation without external routing dependencies, ensuring stability.

## 🛠️ Tech Stack

### Frontend
-   **React** (Vite)
-   **Tailwind CSS** (Styling)
-   **React Toastify** (Notifications)
-   **UUID** (Unique ID generation)

### Backend
-   **Node.js & Express** (API Server)
-   **MongoDB** (Database)
-   **Mongoose / MongoDB Driver** (Data Interaction)
-   **Bcrypt** (Password Hashing)
-   **JWT** (Authentication)
-   **Cors & Body-Parser** (Middleware)

## 📦 Installation & Setup

### Prerequisites
-   Node.js installed
-   MongoDB installed and running locally on port `27017`

### 1. Clone the Repository
```bash
git clone <repository-url>
cd VaultKey
```

### 2. Backend Setup
Navigate to the Backend folder and install dependencies:
```bash
cd Backend
npm install
```
Start the Backend server:
```bash
npm start
# Server runs on http://localhost:3000
```
*Note: Ensure MongoDB is running before starting the server.*

### 3. Frontend Setup
Open a new terminal, navigate to the root folder, and install dependencies:
```bash
# From root directory
npm install
```
Start the Frontend development server:
```bash
npm run dev
# App runs on http://localhost:5173
```

## 🔐 Environment Variables
For a production setup, create a `.env` file in the `Backend` directory:
```env
MONGO_URI=mongodb://localhost:27017
SECRET_KEY=your_secure_random_string
PORT=3000
```

## 🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## 📄 License
This project is licensed under the MIT License.
