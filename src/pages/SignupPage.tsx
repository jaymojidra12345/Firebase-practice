import { type FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthButton } from '../components/auth/AuthButton'
import { AuthDivider, GoogleSignInButton } from '../components/auth/GoogleSignInButton'
import { AuthInput } from '../components/auth/AuthInput'
import { AuthLayout } from '../components/auth/AuthLayout'
import { PasswordInput } from '../components/auth/PasswordInput'
import { ROUTES } from '../constants/routes'
import { useAuth } from '../context/AuthContext'

export function SignupPage() {
  const navigate = useNavigate()
  const { signUp, signInWithGoogle } = useAuth()

  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGoogleSignIn = async () => {
    setError('')
    setGoogleLoading(true)
    try {
      await signInWithGoogle()
      navigate(ROUTES.HOME)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google sign-in failed.')
    } finally {
      setGoogleLoading(false)
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError('')

    if (!displayName.trim()) {
      setError('Full name is required.')
      return
    }
    if (!email.trim()) {
      setError('Email is required.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    try {
      await signUp(email, password, displayName)
      navigate(ROUTES.HOME)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join FoodHub and start ordering from top restaurants."
    >
      {error && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <GoogleSignInButton
        loading={googleLoading}
        disabled={loading}
        onClick={handleGoogleSignIn}
      />

      <AuthDivider />

      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthInput
          label="Full name"
          name="displayName"
          type="text"
          autoComplete="name"
          placeholder="John Doe"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />

        <AuthInput
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <PasswordInput
          label="Password"
          name="password"
          autoComplete="new-password"
          placeholder="At least 6 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <PasswordInput
          label="Confirm password"
          name="confirmPassword"
          autoComplete="new-password"
          placeholder="Re-enter your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <AuthButton type="submit" loading={loading} disabled={googleLoading}>
          Create account
        </AuthButton>

        <p className="text-center text-xs leading-relaxed text-gray-500">
          By creating an account, you agree to our terms of service and privacy policy.
        </p>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to={ROUTES.LOGIN} className="font-semibold text-brand-600 hover:text-brand-700">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}
