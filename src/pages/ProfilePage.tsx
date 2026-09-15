import { Link } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import { useAuth } from '../context/AuthContext'
import { ROLE_LABELS } from '../types'

export function ProfilePage() {
  const { user, profile, loading } = useAuth()

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="h-40 animate-pulse rounded-3xl bg-gray-100" />
      </div>
    )
  }

  if (!user || !profile) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">Sign in to view your profile</h1>
        <p className="mt-2 text-gray-600">Your role and account details live in Firestore.</p>
        <Link
          to={ROUTES.LOGIN}
          className="mt-6 inline-flex rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Sign in
        </Link>
      </div>
    )
  }

  const rows = [
    { label: 'Name', value: profile.displayName || 'Not set' },
    { label: 'Email', value: profile.email || user.email || 'Not set' },
    { label: 'User ID', value: profile.uid },
    { label: 'Role', value: ROLE_LABELS[profile.role] },
    { label: 'Restaurant ID', value: profile.restaurantId || 'None yet' },
  ]

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Your profile</h1>
      <p className="mt-2 text-gray-600">
        This data is stored in Firestore at <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm">users/{profile.uid}</code>.
      </p>

      <div className="mt-8 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
          <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">
            {ROLE_LABELS[profile.role]}
          </span>
        </div>
        <dl className="divide-y divide-gray-100">
          {rows.map((row) => (
            <div key={row.label} className="grid gap-1 px-6 py-4 sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">{row.label}</dt>
              <dd className="break-all text-sm text-gray-900 sm:col-span-2">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
