# **ConvoTrack - Conversation Tracking and Management App**
**ConvoTrack** is a dynamic web application designed to streamline conversation tracking, analytics, scheduling, and user management. It offers robust features for users, admins, and guests, allowing them to log in via Google or access limited functionality as a guest. With a dark mode toggle, admin tools, and a notification system, ConvoTrack is an all-in-one platform for efficient communication management.

---
## **Table of Contents**
1. [Features](#features)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Folder Structure](#folder-structure)
5. [Usage](#usage)
6. [Technologies Used](#technologies-used)
7. [Future Enhancements](#future-enhancements)
8. [License](#license)
9. [Contributors](#contributors)
---
## **Features**
### **Role-Based Access Control**
- **Admin**: Full access to all modules, including user management, analytics, and system configuration.
- **User**: Access to personalized dashboards, analytics, and calendar functionalities.
- **Guest**: A limited experience that allows browsing without the need for authentication.
### **Authentication**
- Google Sign-In for secure and seamless user authentication.
- Guest login option for quick access without needing a Google account.
### **Dark Mode**
- Toggle between light and dark modes, with persistent settings saved in local storage for a personalized experience.
### **Components**
- **Dashboard**: Displays personalized data based on the user's role.
- **Admin Module**: Provides administrative features and tools.
- **Analytics Dashboard**: Visualizes and analyzes system metrics and performance.
- **Calendar Section**: Schedules and manages events and meetings.
- **Notification Bell**: Real-time notifications to alert users about important updates.

---
## **Installation**
### **Prerequisites**
Ensure you have the following tools installed:
- [Node.js](https://nodejs.org/) (version >=14.0.0)
- [npm](https://www.npmjs.com/) (Node Package Manager)
**Clone the repository:**

   Open your terminal and run the following command to clone the repository:

   ```bash
   git clone https://github.com/your-repository/convo-track.git
Navigate to the project directory:

Change your directory to the project folder:
cd convo-track
Install dependencies:
Run the following command to install the necessary dependencies:
Copy code
npm install
Start the application:
After the dependencies are installed, start the application
npm start
The application should now be running locally at http://localhost:3000.

Configuration
1. Firebase Setup
To integrate Firebase for authentication:
Go to the Firebase Console and create a new project.
Enable Google Authentication in the Authentication section.
Copy your Firebase project configuration and replace the existing firebaseConfig in App.js with your new credentials.
Example Firebase Configuration:
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};
2. Routing
Ensure the following routes are correctly set up:

/admin for the admin dashboard.
/user for the user dashboard.
/analytics for viewing analytics.
/calendar for calendar-related functionalities.
3. Guest Login
No additional setup is required. The guest login functionality is ready to use out of the box.

Folder Structure
src/
├── Components/
│   ├── Admin.jsx              # Admin module component
│   ├── AnalyticsDashboard.jsx # Analytics dashboard component
│   ├── Calendar.jsx           # Calendar management component
│   ├── Dashboard.jsx          # User dashboard component
│   ├── guest.jsx              # Guest view component
│   ├── NotificationBell.jsx   # Notification bell component
│   ├── ProtectedRoute.jsx     # Route protection for authenticated users
├── App.js                      # Main application file
├── index.css                   # Global styles using Tailwind CSS
├── assets/
│   └── download.jpg            # Google logo image for sign-in button
Usage
1. Home Page
Upon visiting the homepage, users are prompted to either log in with Google or continue as a guest. After logging in, users are redirected to their respective dashboards based on their role (Admin, User, or Guest).

2. User Dashboard
The user dashboard provides access to:

Personalized content.
Analytics data.
Calendar scheduling and management features.
3. Admin Module
Only accessible by admins, this module provides advanced features like:

User management.
System configuration tools.
4. Analytics Dashboard
A dedicated section to view analytics for users and admins, providing visual representations of system data.

5. Calendar
Manage and schedule events and meetings with the built-in calendar feature.

Technologies Used
Frontend: React.js, Tailwind CSS
Authentication: Firebase Authentication (Google Sign-In)
Routing: React Router for seamless page navigation
State Management: React Hooks for managing state throughout the app
Notifications: Custom Notification Bell component to display real-time updates
Future Enhancements
Enhanced Analytics: More granular insights and data visualization tools.
Improved Guest Experience: Add more features for guests with limited permissions.
Push Notifications: Implement push notifications for real-time alerts.
Admin Controls: Expand admin tools for more in-depth system management and configuration.
Performance Optimization: Improve load times and user experience on slower devices or networks.
License
This project is licensed under the MIT License. See the LICENSE file for details.

Contributors
Tanisha Borana
Contributor to the development of ConvoTrack.
Completed the Wipro TalentNext Skills Readiness Program in Java Full Stack.
Feel free to reach out for any issues, enhancements, or questions!

Note: Please update the repository URL, license type, and contributor information per your specific details.

This **README.md** file provides all necessary details in one place for setting up, using, and contributing 
