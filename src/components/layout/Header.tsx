import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import { useAuth } from '../../context/AuthContext'

const navLinks = [
  { label: 'Home', to: ROUTES.HOME },
  { label: 'Restaurants', to: ROUTES.RESTAURANTS },
  { label: 'Features', to: `${ROUTES.HOME}#features` },
  { label: 'How it works', to: `${ROUTES.HOME}#how-it-works` },
]

export function Header() {
  const { user, loading, signOut } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch {
      // Header stays usable; errors surface on dedicated auth pages.
    }
    setMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/85 shadow-sm backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-20 items-center justify-between gap-4">
          <Link
            to={ROUTES.HOME}
            className="flex shrink-0 items-center gap-3"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-lg font-bold text-white shadow-lg shadow-brand-500/25">
              FH
            </span>
            <div>
              <p className="text-lg font-bold tracking-tight text-gray-900">FoodHub</p>
              <p className="text-xs font-medium text-gray-500">React + Firebase ordering app</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 rounded-full border border-gray-200 bg-white/80 p-1.5 shadow-sm lg:flex">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="rounded-full px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-brand-50 hover:text-brand-700"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            {loading ? (
              <div className="h-11 w-28 animate-pulse rounded-full bg-gray-100" />
            ) : user ? (
              <>
                <div className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 shadow-sm">
                  {user.displayName || user.email}
                </div>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to={ROUTES.LOGIN}
                  className="rounded-full px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-brand-700"
                >
                  Sign in
                </Link>
                <Link
                  to={ROUTES.SIGNUP}
                  className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition hover:bg-brand-700"
                >
                  Get started
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50 lg:hidden"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition ${
                  mobileMenuOpen ? 'top-1.5 rotate-45' : ''
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-5 rounded-full bg-current transition ${
                  mobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`absolute left-0 top-3 h-0.5 w-5 rounded-full bg-current transition ${
                  mobileMenuOpen ? 'top-1.5 -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="pb-4 lg:hidden">
            <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-xl shadow-gray-200/60">
              <nav className="grid gap-2">
                {navLinks.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-2xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-brand-50 hover:text-brand-700"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-4 border-t border-gray-100 pt-4">
                {loading ? (
                  <div className="h-11 w-full animate-pulse rounded-2xl bg-gray-100" />
                ) : user ? (
                  <div className="grid gap-3">
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
                      {user.displayName || user.email}
                    </div>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="rounded-2xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Link
                      to={ROUTES.LOGIN}
                      onClick={() => setMobileMenuOpen(false)}
                      className="inline-flex items-center justify-center rounded-2xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
                    >
                      Sign in
                    </Link>
                    <Link
                      to={ROUTES.SIGNUP}
                      onClick={() => setMobileMenuOpen(false)}
                      className="inline-flex items-center justify-center rounded-2xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
                    >
                      Get started
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
