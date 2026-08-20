import { Link } from 'react-router-dom'
import { ROUTES } from '../constants/routes'

export function HomePage() {
  return (
    <section className="bg-gradient-to-br from-brand-500 to-brand-700 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Order food from your favourite restaurants
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-brand-100">
          A Swiggy/Zomato-style platform built with React, TypeScript, and Firebase.
          Real-time orders, auth, storage, and more.
        </p>
        <Link
          to={ROUTES.RESTAURANTS}
          className="mt-8 rounded-lg bg-white px-6 py-3 font-semibold text-brand-600 hover:bg-brand-50"
        >
          Browse Restaurants
        </Link>
      </div>
    </section>
  )
}
