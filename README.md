# Discount PRO: Coupon Collecting Application

## Overview
Discount PRO is a web application designed to help users find and use discount coupons for popular e-commerce platforms in Bangladesh. The app offers a user-friendly interface to make saving money on online purchases quick and convenient.

## Live URL
[Live Demo](https://coupon-web-assignment-9.netlify.app/)

---

## Key Features
- **User Authentication**: Secure sign-up, log-in, and log-out functionality using Firebase Authentication.
- **Profile Management**: Users can update their display name and profile picture.
- **Coupon Search**: Search and explore coupons for various e-commerce platforms.
- **Save Coupons**: Bookmark and manage favorite coupons.
- **Mobile Responsiveness**: Fully responsive design for a seamless experience on both desktop and mobile devices.
- **Notifications**: Toast notifications for user actions like errors and successes.
- **Error Handling**: Custom error pages for handling 404 and other issues.

---

## Tech Stack
- **Frontend**: React, Vite
- **Backend**: Firebase (Authentication and Firestore)
- **Styling**: Tailwind CSS
- **Deployment**: Firebase Hosting

---

## Dependencies
The project uses the following dependencies:
- **React**: For building the UI.
- **React Router DOM**: For navigation and routing.
- **Firebase**: For authentication and database services.
- **Tailwind CSS**: For responsive and utility-first styling.
- **React Toastify**: For notifications.
- **Vite**: For fast development and build processes.

---

## Local Setup Guide
Follow these steps to run the project on your local machine:

### Prerequisites
- Node.js (v14 or later)
- npm or yarn package manager

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/discount-pro.git
   cd discount-pro
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```
   Or, if you use Yarn:
   ```bash
   yarn install
   ```

3. **Set Up Firebase**:
   - Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.
   - Enable Authentication (Email/Password).
   - Set up Firestore database.
   - Obtain your Firebase configuration and create a `.env` file in the root directory:
     ```env
     VITE_FIREBASE_API_KEY=your-api-key
     VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
     VITE_FIREBASE_PROJECT_ID=your-project-id
     VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
     VITE_FIREBASE_APP_ID=your-app-id
     ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Or, with Yarn:
   ```bash
   yarn dev
   ```

5. **Access the App**:
   Open your browser and go to `http://localhost:3000` to see the app in action.

---

## Relevant Links
- **Live URL**: [Discount PRO](https://coupon-web-assignment-9.netlify.app/)
- **GitHub Repository**: [Repository Link](https://github.com/mohammadabdullahrihan/Coupon-collecting-web))
- **Firebase Console**: [Firebase](https://console.firebase.google.com/)

---

Enjoy saving money with Discount PRO!
