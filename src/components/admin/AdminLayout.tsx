import { Link, NavLink, Outlet } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import { useAuth } from '../../context/AuthContext'

const adminNav = [{ label: 'Dashboard', to: ROUTES.ADMIN }]

export function AdminLayout() {
  const { profile, signOut } = useAuth()

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl">
        <aside className="hidden w-72 flex-col border-r border-white/10 bg-slate-900/80 p-6 lg:flex">
          <Link to={ROUTES.HOME} className="text-sm font-medium text-slate-400 hover:text-white">
            ← Back to FoodHub
          </Link>
          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
              Admin Panel
            </p>
            <h1 className="mt-2 text-2xl font-bold">FoodHub Control</h1>
            <p className="mt-2 text-sm text-slate-400">
              Manage restaurants and restaurant owners.
            </p>
          </div>

          <nav className="mt-10 space-y-2">
            {adminNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end
                className={({ isActive }) =>
                  `block rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm font-semibold">{profile?.displayName || 'Admin'}</p>
            <p className="mt-1 truncate text-xs text-slate-400">{profile?.email}</p>
            <button
              type="button"
              onClick={() => signOut()}
              className="mt-4 w-full rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
            >
              Logout
            </button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-white/10 px-4 py-4 sm:px-6 lg:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300 lg:hidden">
                Admin Panel
              </p>
              <h2 className="text-xl font-bold">Restaurant Management</h2>
            </div>
            <Link
              to={ROUTES.HOME}
              className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10 lg:hidden"
            >
              Home
            </Link>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
