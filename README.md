# Real Estate Website - README

Welcome to the Real Estate Website! This project is a modern, full-stack MERN (MongoDB, Express, React, Node.js) application designed for managing and browsing real estate property listings. The application comes with advanced features, including secure authentication, user-friendly interfaces, and powerful search functionalities. Here's everything you need to know to get started with the project.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)

## Project Overview
This Real Estate Website is designed to provide a seamless and secure platform for users to browse, manage, and list real estate properties. The project integrates several advanced features, including JWT, Firebase, and Google OAuth for authentication, MongoDB for database management, and a deployment-ready setup using Render.

## Features
### 🛡️ Advanced Authentication
JWT Authentication: Secure user access with JSON Web Tokens (JWT).
Firebase Authentication: Utilize Firebase for additional security and real-time database features.
Google OAuth: Provide seamless login options with Google OAuth integration.
### 🏡 Real-world CRUD Operations
Create: Add new property listings with detailed descriptions and images.
Read: Browse and view property listings in a user-friendly interface.
Update: Modify existing property details as needed.
Delete: Remove outdated or irrelevant property listings.
### 💡 User-friendly Features
Image Uploads: Enhance property listings with high-quality images.
Property Listing Management: Manage all your listings efficiently with easy-to-use tools.
Responsive Design: Enjoy a smooth user experience on both desktop and mobile devices.
### 🚀 Advanced Search Functionality
Search Filters: Use filters to narrow down property searches by location, price, type, and more.
Keyword Search: Quickly find properties using keyword search capabilities.
Sorting Options: Sort listings based on price, date added, and other criteria.
### 🌐 Deployment Made Easy
Render Deployment: Deploy your MERN real estate app for free using the Render platform. Follow our step-by-step guide to get your application live on the web.

## Installation
### 1.Clone the Repository:
```
git clone https://github.com/Ayush-singh3662/estate-app.git
```

### 2. Install Dependencies:
```
cd client
npm install
cd ..
cd api
npm install
cd ..
```

### 3. Environment Variables:
Create a .env file in the root directory.
Add the following variables:
```
MONGO_URL=your_mongo_uri
JWT_SECRET=your_jwt_secret
```
## Configuration
### 1. Firebase Configuration:
Go to the Firebase console and create a new project.
Enable Firebase Authentication and add your web app.
Obtain the API key and Auth domain, and add them to your .env file.

### 2. Google OAuth Configuration:
Create a new project in the Google Developer Console.
Enable the Google OAuth API.
Obtain the Client ID and Secret, and add them to your .env file.

## Usage
### 1. Run the Development Server:
```
cd api
npm run dev
cd ..
cd client
npm run dev
cd ..
```
This command will start both the backend and frontend servers.

### 2. Access the Application:
Open your browser and go to http://localhost:3000 to access the real estate website.

### 3. User Authentication:
Sign up or log in using JWT, Firebase, or Google OAuth.
Once authenticated, you can create, view, update, and delete property listings.

### 4. Search for Properties:
Use the advanced search bar to filter properties based on your criteria.
Sort results to find the best matches.

## Deployment
### 1. Prepare for Deployment:
Ensure that all environment variables are set correctly in the .env file.
Build the frontend:
```
cd client
npm run build
```
### 2. Deploy to Render:
Create a new web service on Render and connect it to your GitHub repository.
Set the environment variables in the Render dashboard.
Deploy the application and access it via the provided URL.

## Contributing
Contributions are welcome! Please fork this repository, create a feature branch, and submit a pull request with your changes. Make sure to follow the coding guidelines and write tests for new features.