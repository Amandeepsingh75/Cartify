# Cartify

## Table of Contents

1. [Introduction](#introduction)
2. [Project Overview](#project-overview)
3. [Prerequisites](#prerequisites)
4. [Getting Started](#getting-started)
5. [Usage](#usage)
6. [Testing](#testing)
7. [Deployments](#deployments)
8. [Contributing](#contributing)
9. [Contributors List](#contributors-list)
10. [License](#license)

## Introduction <a name="introduction"></a>

Cartify is a modern e-commerce website where users can register, add products, manage their cart, and more. Built using the MERN stack, Cartify connects the frontend with a robust backend to fetch user data and manage products. The application uses various libraries and tools to enhance both development and user experience.

## Project Overview <a name="project-overview"></a>

### Purpose

Cartify aims to provide a seamless shopping experience for users, offering features such as user authentication, product browsing, and add your peoducts. The objective is to create an engaging and user-friendly platform where users can interact with products and manage their shopping cart effectively.

### Features

- **User Authentication**: Secure registration and login functionality using JWT for authentication.
- **Product Management**: Browse through a list of products with search functionality.
- **Cart Functionality**: Add products to the cart, view cart details, and proceed to checkout.
- **Image Upload**: Manage product images through Cloudinary.
- **Notifications**: User notifications for success and error messages with `react-toastify`.

### Architecture

- **Frontend**: Built with React and Vite, featuring `react-toastify` for notifications, `@headlessui/react` for UI components, and `@heroicons/react` for icons.
- **Backend**: Developed using Node.js and Express, with Cloudinary for image uploads, JWT for authentication,cors for solving cors error, dotenv for env files, and Multer for file handling.
- **Tools**: Nodemon for automatic server restarts, Docker for containerization, and GitLab CI/CD for continuous integration and deployment.

For more details on the architecture, you can check out the design document [here](https://example.com/architecture).

## Prerequisites <a name="prerequisites"></a>

To get started with Cartify, you need the following tools and knowledge:

- **Node.js**: JavaScript runtime for the backend.
- **MongoDB**: Database for storing user and product data.
- **React**: JavaScript library for building the user interface.
- **Vite**: Build tool for modern web applications.
- **Cloudinary**: Service for image and video management.
- **Github**: For continuous integration and deployment.

### Dependencies

**Frontend Dependencies**

```json
{
  "react": "^18.0.0",
  "vite": "^4.0.0",
  "react-toastify": "^9.0.0",
  "@headlessui/react": "^1.7.0",
  "@heroicons/react": "^2.0.0"
}

**Backend Dependencies**

{
  "express": "^4.19.2",
  "mongoose": "^8.4.4",
  "cloudinary": "^2.2.0",
  "jsonwebtoken": "^9.0.2",
  "multer": "^1.4.5",
  "nodemon": "^3.1.4",
  "dotenv": "^16.4.5",
  "cors": "^2.8.5",
  "cookie-parser": "^1.4.6"
}

## Installation

To get started with Cartify, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/Amandeepsingh75/cartify.git
cd cartify

**Install server(backend) Dependencies**

```bash
cd server
npm install

**Install client(frontend) Dependencies**

```bash
cd client
npm install

### 2. Configurations

**server .env**

```bash
PORT=4000
CORS_ORIGIN:your_cors_origin
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRE=10d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_api_secret

**client .env**

VITE_ORIGIN=your_backend_origin

### 3. Start the Application

```bash
server(backend)= cd server -> npm run dev
client(frontend)= cd client -> npm run dev

### Deployment

  -> https://cartify-app.onrender.com/

### Contributing

We welcome contributions to Cartify! If you would like to contribute, please follow these steps:

   1. Fork the repository.
   2. Create a new branch (git checkout -b feature/YourFeature).
   3. Make your changes and commit them (git commit -am 'Add new feature').
   4. Push to the branch (git push origin feature/YourFeature).
   5. Create a new Pull Request.

### License

Cartify is licensed under the MIT License
