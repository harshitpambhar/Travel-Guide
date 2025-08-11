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

## Routes

- `/signup` - Sign up page
- `/signin` - Sign in page

## Components

### SignUp.tsx
- Main signup component with toggle functionality
- Handles both user and admin registration
- Form validation and submission

### SignIn.tsx
- Simple signin form
- Links to signup page for new users

## Dependencies

The following packages are required and already included:
- `react-hook-form` - Form handling
- `@hookform/resolvers` - Form validation resolvers
- `zod` - Schema validation
- `@radix-ui/react-*` - UI components
- `tailwindcss` - Styling

## Usage

1. Navigate to `/signup` to access the signup page
2. Choose between User or Admin mode using the toggle buttons
3. Fill in the required fields
4. Submit the form to create an account
5. Use the signin page at `/signin` to access existing accounts

## Customization

The signup functionality can be easily customized by:
- Modifying the validation schemas in the components
- Updating the form fields and requirements
- Changing the UI styling using Tailwind classes
- Adding additional authentication logic in the onSubmit handlers

## Integration

The signup system is integrated with:
- Header navigation (Sign Up and Sign In buttons)
- Toast notification system
- Routing system
- Existing UI component library
