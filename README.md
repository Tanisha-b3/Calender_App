ConvoTrack - Conversation Tracking and Management App
ConvoTrack is a dynamic web application designed to streamline conversation tracking, analytics, scheduling, and user management. It offers robust features for users, admins, and guests, allowing them to log in via Google or access limited functionality as a guest. With a dark mode toggle, admin tools, and a notification system, ConvoTrack is an all-in-one platform for efficient communication management.

Table of Contents
Features
Installation
Configuration
Folder Structure
Usage
Technologies Used
Future Enhancements
License
Contributors
Features
Role-Based Access Control
Admin: Full access to all modules, including user management, analytics, and system configuration.
User: Access to personalized dashboards, analytics, and calendar functionalities.
Guest: A limited experience that allows browsing without the need for authentication.
Authentication
Google Sign-In for secure and seamless user authentication.
Guest login option for quick access without needing a Google account.
Dark Mode
Toggle between light and dark modes, with persistent settings saved in local storage for a personalized experience.
Components
Dashboard: Displays personalized data based on the user's role.
Admin Module: Provides administrative features and tools.
Analytics Dashboard: Visualize and analyze system metrics and performance.
Calendar Section: Schedule and manage events and meetings.
Notification Bell: Real-time notifications to alert users about important updates.
Installation
1. Clone the repository
git clone https://github.com/your-repository/convo-track.git
cd convo-track
2. Install dependencies
npm install
3. Start the application
npm start
Your application will now be available at http://localhost:3000.

Configuration
1. Firebase Setup
Go to the Firebase Console and create a new project.
Enable Google Authentication in the Authentication section.
Copy your Firebase project configuration and replace the existing firebaseConfig in App.js with your new credentials.
2. Routing
Ensure that the following routes are correctly set up in your app:
/admin for the admin dashboard.
/user for the user dashboard.
/analytics for viewing analytics.
/calendar for calendar-related functionalities.
3. Guest Login
No additional setup is required. The guest login functionality is ready to use out of the box.
Folder Structure
bash
Copy code
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
Only accessible by admins, this module provides advanced features like user management and system configuration.

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
This project is licensed under the MIT License.

Contributors
Tanisha Borana
Full Stack Developer
Completed the Wipro TalentNext Skills Readiness Program in Java Full Stack.
Contributor to the development of ConvoTrack.
For any issues, enhancements, or questions, feel free to reach out!

Feel free to update the repository URL, license type, and contributor info as per your specific details.
