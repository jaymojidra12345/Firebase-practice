import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle: string
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <aside className="relative hidden w-1/2 overflow-hidden bg-gradient-to-br from-brand-600 via-brand-500 to-brand-700 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/30 blur-3xl" />
          <div className="absolute -bottom-16 -right-16 h-96 w-96 rounded-full bg-white/20 blur-3xl" />
        </div>

        <Link to={ROUTES.HOME} className="relative z-10 text-2xl font-bold text-white">
          FoodHub
        </Link>

        <div className="relative z-10 space-y-6">
          <p className="text-5xl leading-tight font-bold text-white">
            Delicious food,
            <br />
            delivered fast.
          </p>
          <p className="max-w-md text-lg text-brand-100">
            Order from your favourite restaurants and track your meals in real time.
          </p>
          <div className="flex gap-3 text-3xl">
            <span aria-hidden="true">🍕</span>
            <span aria-hidden="true">🍔</span>
            <span aria-hidden="true">🍜</span>
            <span aria-hidden="true">🥗</span>
          </div>
        </div>

        <p className="relative z-10 text-sm text-brand-100/80">
          Firebase practice project — Phase 1 Authentication
        </p>
      </aside>

      <main className="flex w-full flex-col lg:w-1/2">
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4 sm:px-8 lg:border-none lg:px-12 lg:pt-12">
          <Link to={ROUTES.HOME} className="text-xl font-bold text-brand-600 lg:hidden">
            FoodHub
          </Link>
          <Link
            to={ROUTES.HOME}
            className="hidden text-sm font-medium text-gray-500 hover:text-brand-600 lg:inline-flex"
          >
            ← Back to home
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-4 py-8 sm:px-8 lg:px-12 lg:py-12">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {title}
              </h1>
              <p className="mt-2 text-sm text-gray-500 sm:text-base">{subtitle}</p>
            </div>
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
