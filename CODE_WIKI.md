# FoodHub Code Wiki

## Overview

FoodHub is a frontend-only practice project for building a food ordering platform with React and Firebase. The current repository focuses on Phase 1 authentication and the initial application shell, while the domain model and route constants already anticipate later features such as restaurants, carts, orders, and dashboards.

- Frontend framework: React 19 with TypeScript
- Build tool: Vite 8
- Routing: React Router 7
- Styling: Tailwind CSS 4
- Backend services used from the client: Firebase Auth, Firestore, Storage, Analytics

## Architecture Summary

The application is organized as a layered client-side React app:

1. Bootstrap layer
   - `src/main.tsx` mounts the React tree.
   - `src/App.tsx` wraps the app with global providers.

2. Application services layer
   - `src/config/firebase.ts` initializes Firebase SDK services.
   - `src/context/AuthContext.tsx` exposes authentication state and auth actions through React context.

3. Navigation layer
   - `src/routes/AppRouter.tsx` defines public auth routes and layout-wrapped app routes.
   - `src/constants/routes.ts` centralizes route paths.

4. Presentation layer
   - `src/pages/*` contains route-level screens.
   - `src/components/auth/*` contains reusable auth UI building blocks.
   - `src/components/layout/*` contains the shared site chrome.

5. Shared model and utility layer
   - `src/types/index.ts` defines domain types for planned app entities.
   - `src/utils/authErrors.ts` translates Firebase auth errors into user-friendly messages.

## Runtime Flow

```text
main.tsx
  -> App
    -> AuthProvider
      -> AppRouter
        -> public auth pages OR layout-wrapped app pages

AuthProvider
  -> subscribes to Firebase auth state
  -> stores user/loading in React state
  -> exposes signIn/signUp/signInWithGoogle/signOut/resetPassword

Pages
  -> call useAuth()
  -> invoke auth actions
  -> redirect with React Router on success
```

## Repository Layout

```text
Firebase-practice/
|-- public/                    Static public assets
|-- src/
|   |-- assets/                App images and SVG assets
|   |-- components/
|   |   |-- auth/              Reusable authentication UI components
|   |   `-- layout/            Shared layout chrome
|   |-- config/                Firebase initialization
|   |-- constants/             Shared route definitions
|   |-- context/               Global React context providers
|   |-- pages/                 Route-level page components
|   |-- routes/                Router composition
|   |-- types/                 Shared TypeScript domain models
|   |-- utils/                 Utility helpers
|   |-- App.tsx                Provider composition root
|   |-- index.css              Tailwind import and theme tokens
|   `-- main.tsx               React entrypoint
|-- .env.example               Required Firebase environment variables
|-- package.json               Scripts and dependency declarations
|-- README.md                  Project summary and phase roadmap
|-- tsconfig*.json             TypeScript configuration
`-- vite.config.ts             Vite plugin setup
```

## Major Modules

### Bootstrap And App Composition

#### `src/main.tsx`

Responsibility:
- Imports global CSS.
- Creates the React root.
- Renders the application inside `StrictMode`.

Key behavior:
- Calls `createRoot(document.getElementById('root')!).render(...)`.

#### `src/App.tsx`

Responsibility:
- Defines the top-level app composition.
- Installs cross-cutting providers before rendering routes.

Key behavior:
- Wraps `AppRouter` with `AuthProvider`.

Why it matters:
- Any component using `useAuth()` depends on this provider being present above it in the tree.

### Firebase Configuration

#### `src/config/firebase.ts`

Responsibility:
- Reads Firebase config from Vite environment variables.
- Initializes the Firebase application once.
- Exports service singletons for use across the app.

Exports:
- `app`: initialized Firebase app instance.
- `auth`: Firebase Authentication service.
- `db`: Firestore service.
- `storage`: Firebase Storage service.
- `analyticsPromise`: lazy analytics initialization guarded by `isSupported()`.

Design notes:
- Analytics initialization is intentionally asynchronous because analytics support depends on the runtime environment.
- Firestore and Storage are configured even though the current UI does not yet use them. This signals the intended expansion path.

### Authentication Context

#### `src/context/AuthContext.tsx`

Responsibility:
- Acts as the central authentication state manager.
- Wraps Firebase Auth SDK calls with app-specific behavior and error normalization.
- Exposes auth state and auth actions through React context.

Primary interface:
- `user: User | null`
- `loading: boolean`
- `signIn(email, password)`
- `signUp(email, password, displayName)`
- `signInWithGoogle()`
- `signOut()`
- `resetPassword(email)`

Key functions:

`AuthProvider({ children })`
- Subscribes to `onAuthStateChanged(auth, callback)` in `useEffect`.
- Stores the authenticated Firebase user in local state.
- Tracks initial auth resolution with `loading`.
- Memoizes the context value to avoid unnecessary rerenders.

`signIn(email, password)`
- Trims the email.
- Calls `signInWithEmailAndPassword`.
- Converts Firebase errors via `getAuthErrorMessage()`.

`signUp(email, password, displayName)`
- Creates a Firebase user with email/password.
- Updates the Firebase profile with the provided display name.
- Copies the updated display name into local state immediately after signup.

`signInWithGoogle()`
- Uses `GoogleAuthProvider` with `signInWithPopup`.

`signOut()`
- Calls Firebase `signOut`.

`resetPassword(email)`
- Sends a password reset email through Firebase.

`useAuth()`
- Reads the current auth context.
- Throws a guard error if used outside `AuthProvider`.

Dependency relationships:
- Depends on `auth` from `src/config/firebase.ts`.
- Depends on `getAuthErrorMessage()` from `src/utils/authErrors.ts`.
- Is consumed by layout and auth pages.

### Routing

#### `src/constants/routes.ts`

Responsibility:
- Centralizes route path strings in a single object.

Current role:
- Reduces string duplication across pages and components.
- Already includes future routes that are not yet implemented, such as cart, orders, profile, and dashboards.

#### `src/routes/AppRouter.tsx`

Responsibility:
- Defines route structure for the whole application.

Current route map:
- Public routes:
  - `/login` -> `LoginPage`
  - `/signup` -> `SignupPage`
- Layout-wrapped routes:
  - `/` -> `HomePage`
  - `/restaurants` -> `RestaurantsPage`
  - `*` -> `NotFoundPage`

Design notes:
- `Layout` wraps only the main application pages, not the auth pages. This gives login and signup their own dedicated full-screen experience.

### Layout Components

#### `src/components/layout/Layout.tsx`

Responsibility:
- Composes the shared site frame.
- Renders `Header`, `Outlet`, and `Footer`.

Key dependency:
- Uses React Router `Outlet` to render child routes.

#### `src/components/layout/Header.tsx`

Responsibility:
- Displays the brand, key navigation links, and auth-aware actions.

Key behavior:
- Reads `user`, `loading`, and `signOut` from `useAuth()`.
- Shows a loading placeholder while auth state is resolving.
- Shows `Logout` and the current user identity when authenticated.
- Shows `Sign in` and `Sign up` actions when unauthenticated.

Important detail:
- Errors from header sign-out are swallowed intentionally so the header remains usable and auth error messaging stays concentrated on auth pages.

#### `src/components/layout/Footer.tsx`

Responsibility:
- Renders a minimal project footer.

### Authentication UI Components

These components encapsulate form presentation so `LoginPage` and `SignupPage` can focus on state and submission logic.

#### `src/components/auth/AuthLayout.tsx`

Responsibility:
- Provides the full-page auth screen layout.
- Displays marketing copy and branding on large screens.
- Hosts page-specific auth forms on the right side.

Key behavior:
- Accepts `title`, `subtitle`, and `children`.
- Provides a responsive split layout with a branded sidebar.

#### `src/components/auth/AuthButton.tsx`

Responsibility:
- Standardizes primary and secondary button styling for auth flows.

Key behavior:
- Accepts `loading` and `variant`.
- Shows a spinner while loading.
- Disables itself when `loading` or `disabled` is set.

#### `src/components/auth/AuthInput.tsx`

Responsibility:
- Standardizes labeled text/email input fields.

Key behavior:
- Generates an input id from `id` or `name`.
- Accepts an optional inline error state for styling and helper text.

#### `src/components/auth/PasswordInput.tsx`

Responsibility:
- Wraps a password field with visibility toggle behavior.

Key behavior:
- Uses local `visible` state.
- Switches input `type` between `password` and `text`.
- Shows a `Show` / `Hide` control.

#### `src/components/auth/GoogleSignInButton.tsx`

Responsibility:
- Encapsulates the Google sign-in button UI and loading state.

Key behavior:
- Shows a custom inline Google SVG icon.
- Replaces the icon with a spinner while processing.

#### `src/components/auth/GoogleSignInButton.tsx` -> `AuthDivider`

Responsibility:
- Renders the separator between Google sign-in and email/password forms.

### Pages

#### `src/pages/HomePage.tsx`

Responsibility:
- Renders the landing hero for the app.
- Sends users to restaurant browsing.

Current status:
- Static marketing-style content; no data fetching yet.

#### `src/pages/LoginPage.tsx`

Responsibility:
- Handles email/password sign-in.
- Handles Google sign-in.
- Handles password reset flow.

Local state:
- `view`: switches between sign-in and forgot-password modes.
- `email`, `password`
- `loading`, `googleLoading`
- `error`, `success`

Key functions:

`handleGoogleSignIn()`
- Calls `signInWithGoogle()`.
- Redirects to home on success.

`handleSignIn(event)`
- Performs lightweight client-side validation.
- Calls `signIn(email, password)`.
- Redirects to home on success.

`handleForgotPassword(event)`
- Validates presence of email.
- Calls `resetPassword(email)`.
- Displays a success message instead of redirecting.

Design notes:
- This page owns transient form state and validation.
- Auth API details remain in the context layer.

#### `src/pages/SignupPage.tsx`

Responsibility:
- Handles account creation with email/password.
- Supports Google sign-in as an alternate onboarding path.

Local state:
- `displayName`, `email`, `password`, `confirmPassword`
- `loading`, `googleLoading`
- `error`

Key function:

`handleSubmit(event)`
- Validates required fields.
- Enforces a minimum six-character password.
- Verifies password confirmation matches.
- Calls `signUp(email, password, displayName)`.
- Redirects to home on success.

`handleGoogleSignIn()`
- Mirrors the login page's Google auth flow.

#### `src/pages/RestaurantsPage.tsx`

Responsibility:
- Placeholder for restaurant discovery.

Current status:
- Static page indicating the feature is planned for a later phase and will use Firestore data.

#### `src/pages/NotFoundPage.tsx`

Responsibility:
- Handles unmatched routes.
- Provides a link back to home.

### Shared Types

#### `src/types/index.ts`

Responsibility:
- Defines shared domain entities used to model the planned product.

Defined types:
- `UserRole`
- `UserProfile`
- `Restaurant`
- `MenuItem`
- `CartItem`
- `OrderStatus`
- `Order`

Architectural value:
- Even though most of these models are not wired into the UI yet, they act as an early contract for future Firestore collections and page features.

### Utilities

#### `src/utils/authErrors.ts`

Responsibility:
- Converts raw Firebase Auth error codes into user-facing messages.

Key function:

`getAuthErrorMessage(error)`
- Detects an auth `code` on unknown error values.
- Returns a mapped friendly message when known.
- Falls back to a generic message when unknown.

Why it matters:
- Keeps Firebase-specific error translation out of page components and the auth context call sites.

### Styling And Build Configuration

#### `src/index.css`

Responsibility:
- Imports Tailwind.
- Defines brand color tokens.
- Applies global body defaults.

#### `vite.config.ts`

Responsibility:
- Enables the React plugin and Tailwind Vite plugin.

#### `tsconfig.json` and `tsconfig.app.json`

Responsibility:
- Configure TypeScript project references and frontend compiler behavior.

Notable compiler settings:
- Bundler-style module resolution
- React JSX transform
- `noUnusedLocals` and `noUnusedParameters`
- `noEmit` for app compilation through Vite

## Dependency Relationships

### Internal Dependency Graph

```text
main.tsx
  -> App.tsx

App.tsx
  -> context/AuthContext.tsx
  -> routes/AppRouter.tsx

context/AuthContext.tsx
  -> config/firebase.ts
  -> utils/authErrors.ts

routes/AppRouter.tsx
  -> constants/routes.ts
  -> components/layout/Layout.tsx
  -> pages/*

components/layout/Header.tsx
  -> constants/routes.ts
  -> context/AuthContext.tsx

components/layout/Layout.tsx
  -> Header.tsx
  -> Footer.tsx
  -> react-router-dom Outlet

pages/LoginPage.tsx
  -> components/auth/*
  -> constants/routes.ts
  -> context/AuthContext.tsx
  -> react-router-dom navigation

pages/SignupPage.tsx
  -> components/auth/*
  -> constants/routes.ts
  -> context/AuthContext.tsx
  -> react-router-dom navigation
```

### External Dependencies

- `react`, `react-dom`
  - Component system, hooks, root rendering, and `StrictMode`.

- `react-router-dom`
  - Browser routing, links, nested routes, route outlet, and imperative navigation.

- `firebase`
  - Auth SDK for sign-in flows and auth state subscription.
  - Firestore, Storage, and Analytics services for future expansion.

- `tailwindcss`, `@tailwindcss/vite`
  - Utility-first styling and Vite integration.

- `vite`, `@vitejs/plugin-react`
  - Development server, bundling, and React support.

- `typescript`
  - Static typing and project compilation checks.

- `oxlint`
  - Linting command configured in `package.json`.

## Current Feature Boundaries

Implemented now:
- App bootstrap and routing
- Auth-aware header
- Login with email/password
- Signup with email/password
- Google sign-in
- Password reset
- Shared auth UI components
- Firebase client initialization

Prepared but not yet implemented:
- Restaurant detail pages
- Cart and order flows
- User profile
- Owner and admin dashboards
- Firestore-backed restaurant browsing

This is visible in the mismatch between the rich route/type roadmap and the smaller set of currently mounted pages.

## Running The Project

### Prerequisites

- Node.js and npm
- A Firebase project with web app configuration

### Environment Setup

Copy `.env.example` to `.env` and provide:

```bash
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

Notes:
- These variables are read with `import.meta.env`.
- Missing or invalid values will break Firebase initialization or downstream auth flows.

### Install And Start

```bash
npm install
npm run dev
```

This starts the Vite development server.

### Available Scripts

- `npm run dev` - start the development server
- `npm run build` - run TypeScript project build checks and create a production bundle
- `npm run preview` - preview the production bundle locally
- `npm run lint` - run Oxlint

### Recommended Verification

After configuring Firebase:

1. Start the dev server.
2. Visit `/signup` and create a user.
3. Visit `/login` and verify email/password sign-in.
4. Test Google sign-in if the provider is enabled in Firebase Auth.
5. Trigger password reset from the login page.

## Suggested Next Documentation Targets

If the project grows, the next useful wiki sections would be:

- Firestore schema documentation once collections are implemented
- Route guards and role-based access once protected pages exist
- API and data-flow diagrams for restaurants, carts, and orders
- Deployment notes for Firebase Hosting and security rules

## Key Takeaways

- The repository is currently an auth-first scaffold for a larger food ordering platform.
- `AuthContext` is the central behavioral module and the main integration point with Firebase.
- Route composition is cleanly separated between public auth screens and shared-layout application screens.
- Shared domain types and route constants already define the intended future scope beyond the current UI.
