# TaskLance - Freelancer & Job Portal Platform

A modern, full-stack ready web application designed for freelancers to find work and clients to manage their hiring. Built with **React** and styled with **Tailwind CSS**.

![Freelancer Dashboard Preview](./src/assets/dashboard-preview.png)
*(Note: You can add a screenhsot here)*

## 🚀 Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Utility**: `clsx` and `tailwind-merge` for dynamic classes

## 🛠️ Installation & Setup

1.  **Clone the repository** (if you haven't already).
2.  **Navigate to the project folder**:
    ```bash
    cd MainApp
    ```
3.  **Install dependencies**:
    ```bash
    npm install
    ```
4.  **Run the development server**:
    ```bash
    npm run dev
    ```
    The app will run at `http://localhost:5173`.

## 📂 Project Structure

```
MainApp/
├── src/
│   ├── components/layout/  # Sidebar, Header, PanelLayout
│   ├── data/               # Mock data for dashboards
│   ├── lib/                # Utility functions (cn)
│   ├── pages/
│   │   ├── client/         # Client Dashboard, Search
│   │   ├── freelancer/     # Freelancer Dashboard, Job Search
│   │   └── shared/         # Common pages (Coming Soon)
│   ├── App.jsx             # Main Routing Configuration
│   └── index.css           # Tailwind v4 Theme & Base Styles
├── public/
├── server.js               # Basic Express server entry point
└── postcss.config.js       # PostCSS configuration
```

## ✨ Features

### 👨‍💻 For Freelancers
- **Dashboard**: View active projects, income stats, and proposal acceptance rates.
- **Find Jobs**: Search for opportunities with filters (Category, Type).
- **Navigation**: Dedicated sidebar for easy access to proposals and profile.

### 🏢 For Clients
- **Dashboard**: Track posted jobs, hired freelancers, and total spending.
- **Find Freelancers**: Browse freelancer profiles with ratings and skills.
- **Management**: Quick actions to post new jobs.

## 🔧 backend Integration
The project includes a `server.js` file as a starting point for a Node.js/Express backend. Currently, the frontend uses **Mock Data** (`src/data/mock.js`) to demonstrate UI functionality without requiring a database connection.

## 📝 Configuration
- **Tailwind Theme**: Colors and fonts are configured in `src/index.css` using the new `@theme` directive.
- **Routing**: Defined in `src/App.jsx`, utilizing `react-router-dom` for client-side navigation.

## 🤝 Contributing
Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.
