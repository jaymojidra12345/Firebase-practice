# FoodHub — Food Ordering Platform

A Swiggy/Zomato-style food ordering web app built to practice Firebase end-to-end.

## Stack

- **Frontend:** React 19, TypeScript, Vite, React Router, Tailwind CSS, Context API
- **Backend:** Firebase (Auth, Firestore, Storage, Cloud Functions, FCM, Hosting, Analytics)

## Getting started

```bash
npm install
cp .env.example .env   # add your Firebase config values
npm run dev
```

## Project phases

1. Authentication (email, Google, roles)
2. User profiles
3. Restaurant management
4. Menu management
5. Restaurant browsing (search, filters)
6. Shopping cart
7. Order management
8. Real-time order tracking
9. Image uploads (Storage)
10. Reviews & ratings
11. Wishlist / favourites
12. Coupons & discounts
13. Push notifications (FCM)
14. Restaurant & admin dashboards
15. Security Rules
16. Firebase Hosting deployment

## Firestore collections

`users`, `restaurants`, `menu`, `categories`, `cart`, `orders`, `reviews`, `notifications`, `coupons`

## Scripts

| Command        | Description          |
|----------------|----------------------|
| `npm run dev`  | Start dev server     |
| `npm run build`| Production build     |
| `npm run preview` | Preview production build |
| `npm run lint` | Run oxlint           |
