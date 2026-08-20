import { type FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthButton } from '../components/auth/AuthButton'
import { AuthInput } from '../components/auth/AuthInput'
import { AuthLayout } from '../components/auth/AuthLayout'
import { PasswordInput } from '../components/auth/PasswordInput'
import { ROUTES } from '../constants/routes'
import { useAuth } from '../context/AuthContext'

type LoginView = 'signin' | 'forgot'

export function LoginPage() {
  const navigate = useNavigate()
  const { signIn, resetPassword } = useAuth()

  const [view, setView] = useState<LoginView>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSignIn = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (!email.trim()) {
      setError('Email is required.')
      return
    }
    if (!password) {
      setError('Password is required.')
      return
    }

    setLoading(true)
    try {
      await signIn(email, password)
      navigate(ROUTES.HOME)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed.')
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (!email.trim()) {
      setError('Enter your email to reset your password.')
      return
    }

    setLoading(true)
    try {
      await resetPassword(email)
      setSuccess('Password reset email sent. Check your inbox.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send reset email.')
    } finally {
      setLoading(false)
    }
  }

  if (view === 'forgot') {
    return (
      <AuthLayout
        title="Reset your password"
        subtitle="We'll send a reset link to your email address."
      >
        <form onSubmit={handleForgotPassword} className="space-y-5">
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}
          {success && (
            <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {success}
            </div>
          )}

          <AuthInput
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <AuthButton type="submit" loading={loading}>
            Send reset link
          </AuthButton>

          <button
            type="button"
            onClick={() => {
              setView('signin')
              setError('')
              setSuccess('')
            }}
            className="w-full text-center text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            Back to sign in
          </button>
        </form>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to continue ordering delicious food.">
      <form onSubmit={handleSignIn} className="space-y-5">
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <AuthInput
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="space-y-1.5">
          <PasswordInput
            label="Password"
            name="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                setView('forgot')
                setError('')
              }}
              className="text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              Forgot password?
            </button>
          </div>
        </div>

        <AuthButton type="submit" loading={loading}>
          Sign in
        </AuthButton>

        <p className="text-center text-sm text-gray-500">
          Don&apos;t have an account?{' '}
          <Link to={ROUTES.SIGNUP} className="font-semibold text-brand-600 hover:text-brand-700">
            Create one
          </Link>
        </p>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-gray-50 px-3 text-gray-400">Coming soon</span>
          </div>
        </div>

        <AuthButton type="button" variant="secondary" disabled>
          Continue with Google
        </AuthButton>
      </form>
    </AuthLayout>
  )
}
