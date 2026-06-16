# hms
My first project

## Project Description
hms is a comprehensive Hospital Management System designed to streamline patient data, medical records, appointments, and billing processes. It provides a secure, centralized platform for healthcare providers to manage their daily operations efficiently.

## Key Features
- **Patient Management**: Create, update, and track patient profiles with complete medical history.
- **Medical Records**: Maintain detailed electronic health records (EHR), prescriptions, and treatment plans.
- **Appointment Scheduling**: Book, reschedule, and manage patient appointments seamlessly.
- **User Authentication**: Secure login system with role-based access control (Admin, Doctor, Receptionist).
- **Dashboard Analytics**: Real-time statistics and visualizations for hospital performance.
- **Billing & Finance**: Generate invoices and track payments.
- **Audit Trail**: Comprehensive activity log for all system operations.
- **Responsive UI**: Modern, mobile-friendly interface built with Bootstrap and Tailwind CSS.
- **Multi-Language Support**: Supports both English and Hindi.

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Open the `index.html` file in your web browser.
3. (Optional) Set up a local development server for better browser compatibility:
   ```bash
   # Using Python
   python -m http.server 8000
   # Or using Node.js
   npx serve .
   ```

## Usage
1. Click on **"Create Account"** on the login page to register as a new user.
2. Log in using your credentials.
3. Navigate through the sidebar to access different modules:
   - **Dashboard**: Overview of system activity.
   - **Patients**: Manage patient records.
   - **Appointments**: Handle appointments.
   - **Medical Records**: View and manage patient history.
   - **Billing**: Generate invoices.
   - **Users**: Manage staff accounts.
   - **Settings**: Configure system preferences and language.

## Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **UI Frameworks**: Bootstrap 5, Tailwind CSS 4
- **Icons**: Lucide React Icons
- **Animations**: Animate.css, Custom CSS transitions
- **Data Storage**: LocalStorage (for demonstration purposes)
- **Localization**: Native JavaScript i18n

## Project Structure
```
hms/
├── index.html                 # Application entry point
├── css/
│   ├── bootstrap.min.css    # Bootstrap framework
│   └── style.css            # Custom styles
├── js/
│   ├── app.js               # Main application logic
│   ├── auth.js              # Authentication module
│   ├── patients.js          # Patient management
│   ├── appointments.js      # Appointment scheduling
│   ├── records.js           # Medical records
│   ├── billing.js           # Billing module
│   ├── dashboard.js         # Dashboard and analytics
│   ├── users.js             # User management
│   └── settings.js          # Settings and localization
├── assets/
│   ├── logo.png             # Application logo
│   ├── splash.png           # Splash screen image
│   ├── appointment.png      # Appointment icon
│   ├── record.png           # Record icon
│   ├── invoice.png          # Invoice icon
│   └── admin.png            # Admin icon
└── README.md                # Project documentation
```

## License
This project is for educational purposes only.

## Contact
For any questions or contributions, please feel free to reach out.

---
*Made with ❤️ by [Your Name]*
