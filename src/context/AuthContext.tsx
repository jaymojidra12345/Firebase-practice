import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  updateProfile,
  type User,
} from 'firebase/auth'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { auth } from '../config/firebase'
import { getAuthErrorMessage } from '../utils/authErrors'

interface AuthContextValue {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, displayName: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

const googleProvider = new GoogleAuthProvider()

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password)
    } catch (error) {
      throw new Error(getAuthErrorMessage(error))
    }
  }, [])

  const signUp = useCallback(
    async (email: string, password: string, displayName: string) => {
      try {
        const credential = await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          password,
        )
        await updateProfile(credential.user, {
          displayName: displayName.trim(),
        })
        setUser({ ...credential.user, displayName: displayName.trim() })
      } catch (error) {
        throw new Error(getAuthErrorMessage(error))
      }
    },
    [],
  )

  const signInWithGoogle = useCallback(async () => {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (error) {
      throw new Error(getAuthErrorMessage(error))
    }
  }, [])

  const signOut = useCallback(async () => {
    try {
      await firebaseSignOut(auth)
    } catch (error) {
      throw new Error(getAuthErrorMessage(error))
    }
  }, [])

  const resetPassword = useCallback(async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email.trim())
    } catch (error) {
      throw new Error(getAuthErrorMessage(error))
    }
  }, [])

  const value = useMemo(
    () => ({ user, loading, signIn, signUp, signInWithGoogle, signOut, resetPassword }),
    [user, loading, signIn, signUp, signInWithGoogle, signOut, resetPassword],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
