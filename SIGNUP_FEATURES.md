# Sign Up Functionality

This document describes the sign up functionality that has been implemented in the GlobeTrotter-Team80 project.

## Features

### 1. User Sign Up
- **Form Fields:**
  - Name (minimum 2 characters)
  - Email (valid email format)
  - Password (minimum 8 characters)
  - Confirm Password (must match password)
  - Phone Number (minimum 7 characters)

### 2. Admin Sign Up
- **Form Fields:**
  - Admin Name (minimum 2 characters)
  - Email (valid email format)
  - Password (minimum 8 characters)
  - Confirm Password (must match password)
  - Secret Admin Key (minimum 6 characters)

### 3. Form Validation
- Uses Zod schema validation
- Real-time validation on blur
- Password confirmation matching
- Email format validation
- Required field validation

### 4. UI Features
- Toggle between User and Admin signup modes
- Responsive design with mobile support
- Beautiful illustration on desktop view
- Form animations and transitions
- Error message display
- Toast notifications on successful submission

### 5. Authentication Flow
- **Signup → Login → Homepage Flow:**
  1. User completes signup form
  2. Success toast notification appears
  3. User data is stored temporarily for login
  4. Automatic redirect to login page after 1 second
  5. User enters credentials on login page
  6. Success toast notification appears
  7. Authentication state is set to logged in with actual user data
  8. Automatic redirect to homepage after 1 second

- **Header State Management:**
  - **When NOT logged in:** Shows "Sign In" and "Sign Up" buttons
  - **When logged in:** Shows "Logout" button and user profile dropdown
  - **User Information Display:** Shows actual user name, email, and type (User/Admin)
  - Authentication state persists across page refreshes using localStorage

### 6. User Data Management
- **Dynamic User Names:** Header displays the actual name entered during signup
- **User Type Display:** Shows whether user signed up as "User" or "Admin"
- **Email Display:** Shows the email address used for registration
- **Data Persistence:** User information is maintained across sessions
- **Name Consistency:** User names are consistent across all components (no more "John Doe" fallback)
- **Loading States:** Proper loading states prevent showing incorrect user information during initialization
- **Proper Name Storage:** Stores actual user names from signup forms, not extracted from email addresses
- **Gmail ID Prevention:** Eliminates the issue of showing full Gmail IDs instead of user names

## Routes

- `/signup` - Sign up page
- `/signin` - Sign in page
- `/` - Homepage (redirected to after successful login)

## Components

### SignUp.tsx
- Main signup component with toggle functionality
- Handles both user and admin registration
- Form validation and submission
- Stores user data temporarily for login process
- Redirects to signin page after successful signup

### SignIn.tsx
- Simple signin form
- Links to signup page for new users
- Retrieves and uses user data from signup process
- Sets authentication state on successful login with actual user information
- Redirects to homepage after successful login

### Header.tsx
- Dynamic authentication state display
- Shows different buttons based on login status
- **Enhanced User Profile Display:**
  - User's actual name from signup
  - Email address
  - User type (User/Admin)
- Logout functionality with localStorage cleanup
- **Logout Behavior:** Redirects to login page instead of homepage
- User profile dropdown when authenticated

## Dependencies

The following packages are required and already included:
- `react-hook-form` - Form handling
- `@hookform/resolvers` - Form validation resolvers
- `zod` - Schema validation
- `@radix-ui/react-*` - UI components
- `tailwindcss` - Styling
- `react-router-dom` - Navigation and routing

## Usage

1. **New User Flow:**
   - Navigate to `/signup` to create a new account
   - Choose between User or Admin mode using the toggle buttons
   - Fill in the required fields (including your actual name) and submit
   - Get redirected to `/signin` automatically
   - Enter credentials to log in
   - Get redirected to homepage automatically
   - **Header now shows your actual name and user type**

2. **Existing User Flow:**
   - Navigate to `/signin` to access existing account
   - Enter email and password
   - Get redirected to homepage automatically

3. **After Login:**
   - Header shows "Logout" button and user profile dropdown
   - **User profile dropdown displays:**
     - Your actual name from signup
     - Your email address
     - Your user type (User/Admin)
   - Access to Profile, Wishlist, and Admin Panel
   - Authentication state persists across page refreshes

4. **Logout:**
   - Click "Logout" button in header
   - Authentication state is cleared
   - **Redirected to login page** (not homepage)
   - Header shows "Sign In" and "Sign Up" buttons again

## Customization

The signup functionality can be easily customized by:
- Modifying the validation schemas in the components
- Updating the form fields and requirements
- Changing the UI styling using Tailwind classes
- Adding additional authentication logic in the onSubmit handlers
- Implementing proper backend authentication instead of localStorage
- Customizing the user profile display format

## Integration

The signup system is integrated with:
- Header navigation (dynamic Sign Up/Sign In/Logout buttons)
- Toast notification system
- Routing system with automatic redirects
- Existing UI component library
- localStorage for authentication state persistence
- **Enhanced user profile management with actual user data**
- **Improved logout flow (redirects to login)**

## Technical Notes

- **Authentication State:** Currently uses localStorage for demonstration purposes
- **User Data Flow:** Signup data is temporarily stored and used during login
- **Redirect Timing:** 1-second delay allows users to see success messages
- **State Persistence:** Login state and user data survive page refreshes
- **Form Validation:** Real-time validation with helpful error messages
- **Responsive Design:** Works seamlessly on both desktop and mobile devices
- **Data Cleanup:** Temporary signup data is cleaned up after successful login
- **Logout Redirect:** Users are redirected to login page for better UX flow
- **Name Consistency Fix:** Eliminated "John Doe" fallback - now shows actual user names everywhere
- **Loading State Management:** Added proper loading states to prevent showing incorrect user data during initialization
- **Gmail ID Issue Fix:** Resolved problem where full email addresses were displayed instead of user names
- **Proper Name Handling:** User profile now correctly displays the name entered during signup, not email-based fallbacks
