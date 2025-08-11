# 🌍 GlobeTrotter

**Team 80 – ODOO Hackathon Project**  
**TL:** Harshit Pambhar  
**Members:** Sarthak Talaviya, Krish Ramanandi, Smit Sureja  

---

## 📖 Project Overview
GlobeTrotter is a revolutionary **AI-powered travel planning application** designed to make **multi-city, global travel planning seamless, intelligent, and personalized**.  

With a worldwide dataset of **hotels, attractions, and transportation**, GlobeTrotter lets users plan trips anywhere in the world — from Tokyo to New York — with **dual currency display**, **AI-generated itineraries**, and even **Instagram-to-Itinerary conversion**.

Whether you’re a casual traveler or a digital nomad, GlobeTrotter transforms the way you **discover, organize, and book** your dream journeys.

---

## 🚀 Key Features

### 🌎 Global Coverage
- Access a worldwide dataset of **hotels, attractions, and activities**
- Search and plan trips to **any city in any country**
- AI suggests **top-rated places** automatically

### 💱 Dual Currency Display
- See **local currency prices** for hotels, attractions, and transport
- **Automatic conversion** to your **home currency** based on your profile
- Real-time exchange rates using APIs
- Example:  
  > User from India viewing a New York hotel: `$200 USD (₹16,500 INR)`  
  > User from UK viewing same hotel: `$200 USD (£157 GBP)`

### 🤖 AI-Powered Planning
- **Natural Language Trip Planner** – describe your dream trip, AI creates a full itinerary
- **Instagram-to-Itinerary** – turn influencer posts into bookable experiences
- **AI Travel Assistant** – hidden gems, crowd avoidance, weather-based changes, energy optimization

### 📅 Intelligent Itinerary Builder
- Add, edit, and delete activities day-by-day
- Categorize items: Food, Adventure, Sightseeing, Transport
- Duration & cost tracking
- Multi-city itinerary support

### 💰 Budget Optimization
- Real-time cost tracking in both currencies
- Category-wise breakdown with **Chart.js**
- **Neural Budget Predictor** suggests cost-saving options

### 👥 Collaboration & Sharing
- Invite friends to co-plan trips
- Public read-only itinerary links
- Copy other users’ trips

### 📄 Document Management
- Upload/view tickets, hotel bookings, and travel documents

### 🎨 Design & UX
- **Tailwind CSS** + Glassmorphism + Gradient backgrounds
- Smooth animations & micro-interactions
- Fully responsive & accessibility-friendly

---

## 🏗 Technical Architecture

**Frontend:**  
- React 18 + Tailwind CSS  
- React Hooks for state management  
- Chart.js for budget visualizations  
- Font Awesome icons  

**Backend:**  
- Node.js + Express.js  
- PostgreSQL / MySQL (stores hotels, attractions, cities, users, trips)  
- JWT authentication  
- Currency conversion API integration  

**AI Layer:**  
- Natural language processing for itinerary creation  
- Image/URL analysis for Instagram conversion  
- Predictive budget optimization

---

