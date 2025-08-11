# 🌍 GlobeTrotter – AI-Powered Global Travel Planner

**Team 80 – Smart India Hackathon Project**  
**TL:** Harshit Pambhar  
**Members:** Sarthak Talaviya, Krish Ramanandi, Smit Sureja  

---


## 🚀 Features

### Authentication System
- **User Signup**: Regular users can create accounts with name, email, phone, and password
- **User & Admin Login**: Both regular users and administrators can sign in
- **Security**: Admin accounts are pre-configured and cannot be created through signup
- **Role-based Access**: Different interfaces for regular users and administrators

#### Admin Accounts (Pre-configured)
- **Admin User**: `admin@globetrotter.com` / `admin123`
- **Super Admin**: `superadmin@globetrotter.com` / `super123`

#### Authentication Flow
1. **Regular Users**: Sign up → Sign in → Access user features
2. **Administrators**: Sign in directly → Access admin panel
3. **Security**: No public admin account creation to prevent unauthorized access

### User Features
- Browse travel destinations and experiences
- Search for hotels, flights, and packages
- Submit location requests for new destinations
- Manage personal profile and preferences
- Access AI-powered travel planning

### Admin Features
- **Location Request Management**: Review, approve, or decline user-submitted locations
- **User Management**: View and manage all registered users
- **Content Management**: Manage hotels, experiences, packages, and flights
- **Analytics Dashboard**: Comprehensive platform performance insights
- **System Settings**: Configure admin preferences and notifications

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: Shadcn UI, Tailwind CSS
- **State Management**: React Hook Form, Zod validation
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Charts**: Recharts (for admin analytics)

## 📁 Project Structure

```
src/
├── components/
│   ├── admin/           # Admin-specific components
│   ├── layout/          # Layout components (Header, etc.)
│   ├── sections/        # Page sections
│   ├── ui/              # Reusable UI components
│   └── user/            # User-specific components
├── pages/
│   ├── admin/           # Admin panel pages
│   ├── SignUp.tsx       # User registration
│   ├── SignIn.tsx       # User & admin authentication
│   └── ...              # Other application pages
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configurations
└── types/                # TypeScript type definitions
```

## 🔐 Security Features

- **Role-based Access Control**: Separate interfaces for users and admins
- **Pre-configured Admin Accounts**: No public admin account creation
- **Authentication State Management**: Secure localStorage-based session management
- **Form Validation**: Comprehensive input validation using Zod schemas

## 🚦 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd GlobeTrotter-Team80
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🔑 Admin Access

To access the admin panel:
1. Use one of the pre-configured admin accounts
2. Sign in through the `/signin` page
3. You'll be automatically redirected to `/admin`
4. Access all admin features through the tabbed interface

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- Desktop computers
- Tablets
- Mobile devices

## 🎨 UI/UX Features

- Modern, clean design using Tailwind CSS
- Consistent component library with Shadcn UI
- Smooth animations and transitions
- Intuitive navigation and user experience
- Accessible design patterns

## 🔄 State Management

- **Authentication State**: Managed through localStorage and React state
- **Form State**: Handled with React Hook Form for optimal performance
- **Component State**: Local state management using React hooks
- **Data Persistence**: Client-side storage for demonstration purposes

## 🚧 Development Notes

- This is a demonstration application using localStorage for data persistence
- In production, implement proper backend authentication and database storage
- Admin accounts should be managed through secure backend systems
- Implement proper password hashing and security measures

## 📄 License

This project is part of the GlobeTrotter Team 80 development effort.

