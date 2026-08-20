import { Link } from 'react-router-dom'
import { ROUTES } from '../constants/routes'

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-gray-900">404</h1>
      <p className="mt-2 text-gray-600">Page not found.</p>
      <Link to={ROUTES.HOME} className="mt-6 inline-block text-brand-600 hover:underline">
        Go home
      </Link>
    </div>
  )
}
