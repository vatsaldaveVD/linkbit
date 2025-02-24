# Frontend Folder Structure

This document explains the folder structure of the frontend built with **React (Vite) + Redux + Ant Design + SCSS**.

## 📂 Project Structure
```
D:.
│   .gitignore
│   eslint.config.js
│   index.html
│   package-lock.json
│   package.json
│   README.md
│   vite.config.js
│
├───config               # Configuration files
│       route.js         # Defines app routes
│       theme.js         # Ant Design theme configuration
│
├───hooks                # Custom hooks
│       useFetch.js      # Fetch API hook
│
├───public               # Static assets
│       vite.svg
│
├───services             # API and backend services
│       api.js          # API calls and fetch functions
│
├───src
│   │   App.jsx         # Root component
│   │   index.css       # Global CSS (if needed)
│   │   main.jsx        # Entry file for React
│   │
│   ├───assets          # Static assets like images and icons
│   │       react.svg
│   │
│   ├───components      # UI Components
│   │   ├───layouts     # Layout components (Navbar, Sidebar, Footer)
│   │   └───ui          # Reusable UI components (Button, Modal, Input)
│   │
│   ├───pages           # Page components (Home, About, etc.)
│   │
│   ├───redux           # Redux state management
│   │   ├── store.js    # Redux store
│   │   ├── /features   # Redux slices
│   │
│   ├───routes          # App routing
│   │       AppRoutes.jsx
│   │
│   ├───styles          # SCSS Styles
│   │       main.scss
│   │       _global.scss
│   │       _mixins.scss
│   │       _variables.scss
│   │
│   ├───utils           # Helper functions and utilities
```

---

## 📌 Folder Breakdown

### 1️⃣ **`/config`** (Configuration)
- Stores app-wide configurations like routes and theme settings.

### 2️⃣ **`/hooks`** (Custom Hooks)
- Contains custom hooks for reusable logic (e.g., `useFetch.js`).

### 3️⃣ **`/public`** (Static Files)
- Stores public assets like favicons and static images.

### 4️⃣ **`/services`** (API Calls)
- Contains API service files to interact with the backend.

### 5️⃣ **`/src`** (Main Source Code)
- **`/assets`** – Static assets (e.g., icons, images).
- **`/components`** – Reusable UI components.
- **`/pages`** – Page components (Home, Dashboard, etc.).
- **`/redux`** – Redux state management (store and slices).
- **`/routes`** – Defines app routes (`AppRoutes.jsx`).
- **`/styles`** – Contains global styles (`main.scss`, `_mixins.scss`, `_variables.scss`).
- **`/utils`** – Utility functions and helpers.

---

## 🚀 Getting Started

### 1️⃣ Install Dependencies
Run the following command in the **frontend** directory:
```sh
npm install
```

### 2️⃣ Start the Development Server
```sh
npm run dev
```

### 3️⃣ Build for Production
```sh
npm run build
```

---

## 🛠️ Technologies Used
- **React (Vite)** – Fast frontend framework
- **Redux Toolkit** – State management
- **React Router** – Client-side routing
- **Ant Design** – UI library
- **SCSS** – Styling with mixins and variables

For any questions, feel free to ask! 🚀

