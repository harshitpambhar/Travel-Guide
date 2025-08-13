# GlobeTrotter

GlobeTrotter is a modern travel booking and planning platform designed to help users discover, book, and manage travel experiences, flights, hotels, and packages. Built with a scalable architecture and a beautiful UI, it leverages the latest web technologies and integrates with Supabase for backend services.



## Features
- User authentication and profile management
- Browse and book hotels, flights, experiences, and travel packages
- Admin panel for managing locations and requests
- AI-powered travel planner
- Wishlist and booking management
- Responsive design for mobile and desktop
- Data import and migration scripts

## Tech Stack
- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** Supabase (PostgreSQL, Auth, Storage)
- **State Management:** React Context API
- **Linting & Formatting:** ESLint
- **Other Tools:** PostCSS, Vite, npm

## Project Structure
```
GlobeTrotter-Team80/
├── public/                # Static assets
├── scripts/               # Data import and admin scripts
├── src/
│   ├── assets/            # Images and illustrations
│   ├── components/        # UI and layout components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Supabase client and utilities
│   ├── pages/             # Application pages (Hotels, Flights, Packages, etc.)
│   ├── services/          # API service modules
│   ├── types/             # TypeScript types
│   ├── utils/             # Utility functions
├── supabase/              # Database migrations and seeds
├── package.json           # Project metadata and dependencies
├── README.md              # Project documentation
└── ...
```

## Setup & Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/harshitpambhar/GlobeTrotter-Team80.git
   cd GlobeTrotter-Team80
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Configure Supabase:**
   - Create a Supabase project and update credentials in `src/lib/supabase.ts`.
   - Run migration scripts in `supabase/migrations/` to set up the database.
4. **Start the development server:**
   ```sh
   npm run dev
   ```

## Usage
- Access the app at `http://localhost:5173` (default Vite port).
- Sign up or log in to explore features.
- Admins can access the admin panel for location and request management.
- Use the AI Planner for personalized travel recommendations.

## Contributing
Contributions are welcome! Please read `USER_CONTRIBUTION_GUIDE.md` for guidelines.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License
This project is licensed under the MIT License.

---

For more details, see the documentation files in the repository.
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

