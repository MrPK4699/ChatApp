# ChatApp

## Overview

This is a simple chat application that allows users to log in using predefined credentials and chat with other contacts in the application. The application supports real-time messaging and features a contact list, chat window, and message display.

---

## Features

- User login using predefined credentials.
- Dynamic contact list that excludes the logged-in user.
- Real-time chat functionality.
- Persistent user session using `localStorage`.

---

## Prerequisites

Before starting, ensure you have the following installed:

- Node.js (>= 14.x)
- npm (Node Package Manager)

---

## Installation

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start the Development Server**

   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000` by default.

---

## Usage Instructions

### Step 1: Log In

1. Use one of the predefined credentials to log in.

   | Contact ID | Name    | Password |
   | ---------- | ------- | -------- |
   | 9009009001 | Alice   | 1234     |
   | 9009009002 | Bob     | 1234     |
   | 9009009003 | Charlie | 1234     |
   | 9009009004 | Chris   | 1234     |

2. Enter the `Contact ID` and `Password` to log in.

3. Upon successful login, the contact list will exclude the logged-in user.

### Step 2: Select a Contact

1. Click on any contact in the list to open the chat window.

2. The chat window will display messages exchanged with the selected contact.

### Step 3: Start Chatting

1. Type your message in the input box and send it.

2. Messages will appear in the chat window.

---

## Folder Structure

```
.
├── src
│   ├── components
│   │   ├── ContactList.jsx      # Contact list UI
│   │   ├── ChatWindow.jsx       # Chat window UI
│   │   ├── MessageInput.jsx     # Input feild UI
│   │   ├── Message.jsx          # Message UI component
│   ├── context
│   │   └── AppContext.jsx       # Global state management
│   ├── hooks
│   │   └── useAuth.js           # Custom hooks for Authentication
│   │   └── useCheckAuth.js      # Custom hooks for checking Authentication
|   │   └── useInstantDB.js      # Custom hooks for database interactions
│   ├── styles
│   │   ├── ContactList.css      # Contact list styles
│   │   ├── ChatWindow.css       # Chat window styles
│   │   ├── MessageInput.css     # MessageInput styles
│   │   ├── Message.css          # Message styles
│   └── App.js                   # Main application entry point
│   └── App.css                  # global styles
├── package.json                 # Dependency and script management
└── README.md                    # Project documentation
```

---

## Future Enhancements

- Inhanced authentication/Authorization .
- Add Registeration page .
- Implement Create new Contacts.
- Enhance UI/UX for a modern chat experience.
- Use IndexedDB to store the data locally for offline capabilities.

---

## Troubleshooting

### Common Issues

1. **Application Doesn't Start**

   - Ensure Node.js and npm are installed.
   - Check for errors during `npm install`.

2. **Invalid Credentials**

   - Use one of the predefined credentials with the correct password (`1234`).

3. **Messages Not Displaying**

   - Ensure the `selectedContact` is set when clicking a contact.
   - Check the `useMessages` hook for errors.

---

## License

This project is licensed under the MIT License.

