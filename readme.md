# Hospital Booking System - Frontend

## 📑 Table of Contents

1. [Overview](#overview)  
2. [Features](#features)  
3. [Installation](#installation)  
4. [Project Structure](#project-structure)  
5. [Components Usage](#components-usage)  
6. [Technology Stack](#technology-stack)  
7. [Architecture](#architecture)  
8. [State Management](#state-management)  
9. [API Integration](#api-integration)  
10. [Authentication](#authentication)  
11. [Theme and Styling](#theme-and-styling)  
12. [Test Account Credentials](#test-account-credentials)





## Overview

A mobile app built with React Native and Expo that lets users book hospital appointments. It follows modern design and coding practices, with clean and easy-to-manage code. The app is organized using **modular architecture** and **Atomic Design Principles** to keep the code scalable and well-structured. [Recommended Reading: React Native Folder Structure Best Practices](https://medium.com/@prathiba2796/react-native-best-practices-for-organizing-code-with-atomic-folder-structure-131858653eb1)




## Features

### Core Functionality
1. **User Authentication**
   - Email/password login and registration
   - Secure token management
   - Password recovery

2. **Hospital Management**
   - Browse hospital listings
   - Search and filter capabilities
   - Detailed hospital information

3. **Appointment Booking**
   - Service selection
   - Date and time scheduling
   - Booking confirmation
   - Appointment management

## Installation

For detailed installation instructions and setup steps, please refer to the [Installation Guide](https://github.com/mdyasenrafe/hospital-booking-system-front-end/blob/main/installation.md).

## Project Structure
```plaintext
hospital-booking-system-front-end/
├── app/                    # App screens and navigation
│   ├── (auth)/            # Authentication screens
│   ├── (app)/             # Main app screens
│   └── _layout.tsx        # Root layout
├── components/            # Atomic Design components
│   ├── atoms/            # Basic building blocks
│   │   ├── Button/
│   │   ├── Input/
│   │   └── Text/
│   ├── molecules/        # Composite components
│   │   ├── Header/
│   │   └── ...
│   ├── organisms/        # Complex components
│   └── templates/        # Page layouts
├── contexts/           # React Context providers
├── hooks/              # Custom React hooks
├── redux/             # Redux store and slices
├── api/               # API services
├── utils/             # Utility functions
├── theme/             # Theme configuration
└── assets/           # Static assets
```

## Explanation
- **assets/**: Contains static assets like images, fonts, and icons used throughout the project.
- **components/**: Organized according to Atomic Design:
    - **atom/**: Basic UI elements that serve as the building blocks.
    - **Box/**: Layout container.
    - **Button/**: Interactive button.
    - **Text/**:Typography for consistent styling.
    - Additional components (e.g., InputBox, RemoteImage) can be added here.
- **molecules/:** Small groups of atoms working together to form more complex elements.
- **organisms/**: More complex UI sections that combine multiple molecules and atoms.
- **navigation/**:
Manages routing and navigation logic for the application.

- **screens/**: Contains the different pages or screens of the application.

- **theme/**: Includes design tokens such as colors, spacing, and fonts to maintain design consistency.

- **utils/**: Houses helper functions and utilities used across the project.

- **types/**:
Contains TypeScript type definitions for improved type safety and code clarity.

- **App.tsx**:
The root component that bootstraps the application.

- **index.js:**
The main entry point of the app.

## Components Usage

### Text Component

Our custom `Text` component standardizes typography across the app by replacing the native React Native `Text` component. This ensures consistent font sizes, colors, and styles throughout your project.

**Usage Example:**

```typescript
import { Text } from './path-to-text-component';

<Text variant="H1">This is a heading</Text>
<Text variant="P1">This is a paragraph</Text>
```

### Box Component

The `Box` component acts as a versatile layout container, offering a more powerful alternative to the standard `View` component. It leverages design tokens from our theme to ensure consistent spacing, padding, and background styling across the app.

**Usage Example:**

```typescript
import { Text } from './path-to-text-component';

<Text variant="H1">This is a heading</Text>
<Text variant="P1">This is a paragraph</Text>
```

## Consistent `index.ts` Usage:

- **Index File Structure:**
    - Every folder will have an `index.ts` file to export its contents. This approach simplifies imports and keeps the codebase organized.

    - By using `index.ts`, we can import components, hooks, or utilities from a folder without needing to specify individual files, making the code cleaner and more maintainable.


    **Usage Example:**
```bash
// File structure
src/
  components/
    Button/
      Button.tsx
      index.ts
    index.ts

// In `index.ts` of components folder
export * from './Button';

// In `index.ts` of Button folder
export * from './Button';

// Importing the Button component elsewhere
import { Button } from 'components';
```

## Technology Stack

### Core Technologies
- **React Native (Expo)**: v47.0.0
- **TypeScript**: v4.9.0
- **React Navigation**: v6.0.0

### State Management & Data Flow
- **Redux Toolkit**: v1.9.0
- **Redux Persist**: v6.0.0



## Architecture

### Design Patterns

1. **Container/Presenter Pattern**
   - Separation of logic and presentation
   - Enhanced component reusability

1. **Container/Presenter Pattern**
   - Separation of logic and presentation
   - Enhanced component reusability

2. **Custom Hooks**
   - Shared business logic
   - State management abstraction

3. **Service Layer**
   - Centralized API communication
   - Consistent error handling



## API Integration

### Endpoints Structure
```typescript
BASE_URL = 'https://task-hospital.vercel.app/api'

// Authentication
POST   /auth/login
POST   /auth/register

// Hospitals
GET    /hospitals
GET    /hospitals/:id
GET    /hospitals/:id/services

// Bookings
POST   /bookings
GET    /bookings
PUT    /bookings/:id
DELETE /bookings/:id
```

## Authentication

### Implementation
- JWT token-based authentication
- Secure token storage using AsyncStorage
- Automatic token refresh
- Protected routes

## Theme and Styling

### Design System
- Consistent color palette
- Typography scale
- Spacing system
- Component-specific themes

### Responsive Design
- Flexible layouts
- Device-specific adjustments
- Orientation handling


##  Test Account Credentials

  ### User Account
- Email: test@test.com
- Password: 123456


*This project was developed as part of a technical assessment for Essex Studios.*
