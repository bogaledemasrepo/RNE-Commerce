# 🛍️ E-Commerce Mobile Application

[![React Native](https://img.shields.io/badge/React_Native-0.74+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-SDK_51+-000000?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=for-the-badge)](CONTRIBUTING.md)

A modern, production-ready React Native e-commerce mobile application built with **Expo Router**, **TypeScript**, and modern UI/UX design patterns. Designed with clean modular architecture, fluid screen transitions, robust state management, and responsive layouts tailored for modern iOS and Android devices.

---

## 📖 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [App Architecture & Design Patterns](#-app-architecture--design-patterns)
- [Configuration & Environment](#-configuration--environment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚀 Features

### 🔐 1. Authentication & Security

- **Stateful Auth Flow:** Clean login and sign-up user journeys with instant input validation.
- **Secure Credentials:** Password visibility toggles, form state handling, and inline error messaging.
- **Navigation Guards:** Route protection ensuring unauthenticated users are seamlessly directed to the login stack.

### 🛍️ 2. Product Discovery & Catalog

- **Infinite Scroll Feed:** Optimized product list with smooth scrolling performance and dynamic data fetching.
- **Dynamic Category Filters:** Interactive category pills and quick filters.
- **Search & Scan:** Instant search query handling coupled with barcode/QR scanning quick actions.
- **Hero Carousel:** Interactive promotional banners with auto-scroll and pagination indicators.
- **Responsive Layouts:** Flexible grid layouts supporting various screen densities and orientations.

### 🔍 3. Product Details Screen

- **Multi-Image Gallery:** Fluid horizontal carousel displaying high-resolution product images with active dot indicators.
- **Interactive Swatches:** Selection mechanics for color palettes and size variants.
- **Quantity Steppers:** Intuitive count selectors with minimum/maximum boundaries.
- **Sticky Action Bar:** Floating bottom bar containing instant "Add to Cart" and "Buy Now" CTA buttons.

### 🛒 4. Cart & Checkout Management

- **Itemized Cart Summary:** Editable item quantities, dynamic subtotal updates, and item removal actions.
- **Multi-Step Checkout:** Guided 3-step checkout workflow:
  1. *Shipping Address Selection*
  2. *Payment Method Integration*
  3. *Final Order Review & Confirmation*
- **Promo Code Engine:** Real-time coupon verification and discount application.
- **Dynamic Breakdown:** Transparent line items for tax, shipping fees, discounts, and total amount.

### 🚚 5. Order Tracking & History

- **Tabbed Order Filtering:** Quick switching between **Active**, **Completed**, and **Cancelled** orders.
- **Contextual Status Badges:** Visual indicator chips (*Processing*, *In Transit*, *Delivered*, *Cancelled*).
- **Live Order Tracking:** Step-by-step shipment timeline updates from placement to delivery.

### 🔔 6. Notifications System

- **Filtered Inbox:** Categorized notification tabs (*All*, *Unread*, *Orders*, *Promos*).
- **Read/Unread Management:** Visual indicators and batch read updates.
- **Deep-Linking Integration:** Tap notifications to navigate straight to order tracking or target promotions.

### 👤 7. User Profile & Settings

- **Account Dashboard:** Overview of personal information, avatar upload, and saved preferences.
- **Address & Payment Books:** Management of saved delivery addresses and default payment methods.
- **Theme & Security:** Dark Mode / Light Mode toggles, biometric login settings, and password updates.

---

## 🛠️ Tech Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [React Native](https://reactnative.dev/) / [Expo](https://expo.dev/) | Cross-platform mobile architecture (SDK 51+) |
| **Routing** | [Expo Router](https://docs.expo.dev/router/introduction/) | File-based, nested tab & stack router |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Type-safe development with strict type checking |
| **UI & Styling** | Native StyleSheet API | Pure performance styling, custom theme tokens (`COLORS`, `SPACING`, `TYPOGRAPHY`), and `expo-linear-gradient` |
| **Iconography** | `@expo/vector-icons` | Vector icons using Ionicons, Feather, AntDesign, and FontAwesome |
| **Feedback** | `toastify-react-native` | Custom non-blocking alert toasts and notifications |

---

## 📂 Project Structure

```plaintext
ecommerce-mobile-app/
├── assets/                    # Static graphics, fonts, splash screens, and icons
│   ├── fonts/                 # Custom font definitions (e.g., Inter, SF Pro)
│   ├── icons/                 # App icon resources
│   └── images/                # Static promo banners, placeholders, and illustrations
│
├── app/                       # Expo Router file-based route tree
│   ├── (auth)/                # Authentication stack (unprotected screens)
│   │   ├── _layout.tsx        # Auth stack configuration
│   │   ├── login.tsx          # Login screen component
│   │   └── register.tsx       # Registration screen component
│   │
│   ├── (tabs)/                # Main tab navigator (protected screens)
│   │   ├── _layout.tsx        # Bottom bar tab navigator definition
│   │   ├── index.tsx          # Home product discovery feed
│   │   ├── categories.tsx     # Full category catalog view
│   │   ├── notifications.tsx  # Notifications inbox tab
│   │   └── profile.tsx        # User profile & account hub
│   │
│   ├── product/               # Dynamic product screens
│   │   └── [id].tsx           # Product detail page route
│   │
│   ├── checkout/              # Multi-step checkout funnel
│   │   ├── _layout.tsx        # Checkout stack header & steps layout
│   │   ├── address.tsx        # Step 1: Shipping address selection
│   │   ├── payment.tsx        # Step 2: Payment method choice
│   │   └── review.tsx         # Step 3: Order confirmation
│   │
│   ├── orders/                # Order management routes
│   │   ├── index.tsx          # Orders history listing (Active, Completed, Cancelled)
│   │   └── [id].tsx           # Order details & live tracking timeline
│   │
│   ├── cart.tsx               # Cart modal overlay screen
│   └── _layout.tsx            # Root layout, theme providers, and global guards
│
├── src/                       # Application core source code
│   ├── components/            # Modular reusable UI components
│   │   ├── common/            # Custom Button, Input, Badge, Loader, Modal
│   │   ├── product/           # ProductCard, ColorSwatch, SizePicker, ImageCarousel
│   │   ├── cart/              # CartItem, PromoCodeInput, OrderSummary
│   │   └── checkout/          # StepIndicator, PaymentCardSelector
│   │
│   ├── constants/             # Global design tokens and app constants
│   │   ├── colors.ts          # Color palette (Primary, Neutral, Accent, Semantics)
│   │   ├── layout.ts          # Screen dimensions, paddings, border radiuses
│   │   └── typography.ts      # Font families, sizes, and weights
│   │
│   ├── context/               # React Context Providers for global state management
│   │   ├── AuthContext.tsx    # User session and login token state
│   │   ├── CartContext.tsx    # Active cart items, quantities, and totals
│   │   └── ThemeContext.tsx   # Light/Dark mode state management
│   │
│   ├── hooks/                 # Custom React Hooks
│   │   ├── useAuth.ts         # Hook for authentication operations
│   │   ├── useCart.ts         # Hook for shopping cart dispatchers
│   │   └── useDebounce.ts     # Search input debouncing utility
│   │
│   ├── services/              # API and backend service layer
│   │   ├── api.ts             # Axios HTTP client configuration
│   │   ├── authService.ts     # Login/Register REST API endpoints
│   │   └── productService.ts # Catalog and order history requests
│   │
│   ├── types/                 # TypeScript type interfaces & definitions
│   │   ├── auth.ts            # User and Session types
│   │   ├── product.ts         # Product, Variant, Category types
│   │   └── order.ts           # Cart Item, Order, Shipping types
│   │
│   └── utils/                 # Helper functions & formatting utilities
│       ├── currency.ts        # Currency formatting ($XX.XX)
│       └── validation.ts      # Form validation logic (Email, Password strength)
│
├── app.json                   # Expo client configuration file
├── tsconfig.json              # TypeScript engine setup
├── package.json               # Package dependencies & npm scripts
└── README.md                  # Project documentation
```

---

## ⚡ Getting Started

Follow these steps to get a local development copy up and running.

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js**: `v18.0.0` or higher
- **npm** or **yarn** or **pnpm**
- **Expo Go App** on your iOS/Android physical device, or configured local simulators:
  - [Xcode](https://developer.apple.com/xcode/) (for iOS Simulator)
  - [Android Studio](https://developer.android.com/) (for Android Emulator)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/ecommerce-mobile-app.git
   cd ecommerce-mobile-app
   ```

2. **Install project dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

### Running the App

Start the Expo local development server:

```bash
npx expo start
```

In the terminal output, you will see a QR code along with options to launch the app:

- Press `i` to launch in the **iOS Simulator**.
- Press `a` to launch in the **Android Emulator**.
- Scan the QR code using the **Expo Go** application on your physical device.

---

## 🏗️ App Architecture & Design Patterns

- **Modular Component Design:** Atomic structural separation (`common/`, `product/`, `cart/`) ensures components are self-contained and easily testable.
- **Design Tokens:** Zero hardcoded colors or spacing values. Everything references unified definitions inside `src/constants/colors.ts`.
- **File-Based Routing:** Driven by `expo-router`, enabling deep-linking capabilities out-of-the-box and predictable stack/tab view management.
- **Type Safety:** Strict TypeScript interfaces for API responses, data contracts, and navigation parameters to reduce runtime errors.

---

## ⚙️ Configuration & Environment

Create a `.env` file in the project root to set up your target API endpoints and key configurations:

```env
EXPO_PUBLIC_API_BASE_URL=https://api.example.com/v1
EXPO_PUBLIC_ENABLE_ANALYTICS=true
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git checkout -b feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
