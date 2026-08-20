import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import { useAuth } from '../../context/AuthContext'

export function Header() {
  const { user, loading, signOut } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch {
      // Header stays usable; errors surface on dedicated auth pages.
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to={ROUTES.HOME} className="shrink-0 text-xl font-bold text-brand-600">
          FoodHub
        </Link>

        <nav className="flex items-center gap-2 text-sm font-medium sm:gap-4">
          <Link
            to={ROUTES.RESTAURANTS}
            className="hidden text-gray-600 hover:text-brand-600 sm:inline"
          >
            Restaurants
          </Link>
          <Link to={ROUTES.CART} className="hidden text-gray-600 hover:text-brand-600 sm:inline">
            Cart
          </Link>

          {loading ? (
            <div className="h-9 w-20 animate-pulse rounded-lg bg-gray-100" />
          ) : user ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="hidden max-w-[140px] truncate text-gray-600 md:inline">
                {user.displayName || user.email}
              </span>
              <button
                type="button"
                onClick={handleSignOut}
                className="rounded-lg border border-gray-200 px-3 py-2 text-gray-700 hover:border-gray-300 hover:bg-gray-50 sm:px-4"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to={ROUTES.LOGIN}
                className="hidden text-gray-600 hover:text-brand-600 sm:inline"
              >
                Sign in
              </Link>
              <Link
                to={ROUTES.SIGNUP}
                className="rounded-lg bg-brand-600 px-3 py-2 text-white hover:bg-brand-700 sm:px-4"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
