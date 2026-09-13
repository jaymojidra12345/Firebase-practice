import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'

const exploreLinks = [
  { label: 'Restaurants', to: ROUTES.RESTAURANTS },
  { label: 'Offers', to: `${ROUTES.HOME}#offers` },
  { label: 'Cuisines', to: `${ROUTES.HOME}#cuisines` },
  { label: 'Popular dishes', to: `${ROUTES.HOME}#dishes` },
]

const companyLinks = [
  { label: 'How it works', to: `${ROUTES.HOME}#how-it-works` },
  { label: 'For partners', to: `${ROUTES.HOME}#partners` },
  { label: 'Membership', to: `${ROUTES.HOME}#membership` },
  { label: 'FAQ', to: `${ROUTES.HOME}#faq` },
]

const accountLinks = [
  { label: 'Sign in', to: ROUTES.LOGIN },
  { label: 'Create account', to: ROUTES.SIGNUP },
  { label: 'Home', to: ROUTES.HOME },
]

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className="text-lg font-bold tracking-tight text-gray-900">FoodHub</p>
            <p className="mt-3 max-w-xs text-sm leading-6 text-gray-500">
              A modern food ordering platform for discovering restaurants, placing
              orders, and growing into a full marketplace.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900">Explore</p>
            <nav className="mt-4 grid gap-3 text-sm font-medium text-gray-600">
              {exploreLinks.map((item) => (
                <Link key={item.label} to={item.to} className="transition hover:text-brand-700">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900">Company</p>
            <nav className="mt-4 grid gap-3 text-sm font-medium text-gray-600">
              {companyLinks.map((item) => (
                <Link key={item.label} to={item.to} className="transition hover:text-brand-700">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900">Account</p>
            <nav className="mt-4 grid gap-3 text-sm font-medium text-gray-600">
              {accountLinks.map((item) => (
                <Link key={item.label} to={item.to} className="transition hover:text-brand-700">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <p className="mt-10 border-t border-gray-100 pt-6 text-sm text-gray-500">
          FoodHub — Your food ordering platform
        </p>
      </div>
    </footer>
  )
}
