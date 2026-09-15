import { type User } from 'firebase/auth'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  setDoc,
  where,
  type DocumentSnapshot,
  type Timestamp,
} from 'firebase/firestore'
import { db } from '../config/firebase'
import { COLLECTIONS } from '../constants/collections'
import { USER_ROLES, type UserProfile, type UserRole } from '../types'

function isUserRole(value: unknown): value is UserRole {
  return (
    value === USER_ROLES.CUSTOMER ||
    value === USER_ROLES.RESTAURANT_OWNER ||
    value === USER_ROLES.ADMIN
  )
}

function toDate(value: Timestamp | Date | undefined): Date {
  if (!value) {
    return new Date()
  }
  if (value instanceof Date) {
    return value
  }
  return value.toDate()
}

function mapUserProfile(snapshot: DocumentSnapshot): UserProfile {
  const data = snapshot.data()

  return {
    uid: snapshot.id,
    email: String(data?.email ?? ''),
    displayName: String(data?.displayName ?? ''),
    role: isUserRole(data?.role) ? data.role : USER_ROLES.CUSTOMER,
    photoURL: data?.photoURL ?? null,
    phone: data?.phone ?? null,
    restaurantId: data?.restaurantId ?? null,
    createdAt: toDate(data?.createdAt as Timestamp | Date | undefined),
    updatedAt: toDate(data?.updatedAt as Timestamp | Date | undefined),
  }
}

export function getUserDocRef(uid: string) {
  return doc(db, COLLECTIONS.USERS, uid)
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snapshot = await getDoc(getUserDocRef(uid))
  if (!snapshot.exists()) {
    return null
  }
  return mapUserProfile(snapshot)
}

export async function getUserProfileByEmail(email: string): Promise<UserProfile | null> {
  const normalizedEmail = email.trim().toLowerCase()
  const usersQuery = query(
    collection(db, COLLECTIONS.USERS),
    where('email', '==', normalizedEmail),
    limit(1),
  )
  const snapshot = await getDocs(usersQuery)

  if (snapshot.empty) {
    return null
  }

  return mapUserProfile(snapshot.docs[0])
}

export async function ensureUserProfile(user: User): Promise<UserProfile> {
  const existing = await getUserProfile(user.uid)
  if (existing) {
    return existing
  }

  const ref = getUserDocRef(user.uid)
  await setDoc(ref, {
    uid: user.uid,
    email: (user.email ?? '').trim().toLowerCase(),
    displayName: user.displayName ?? '',
    photoURL: user.photoURL ?? null,
    phone: user.phoneNumber ?? null,
    role: USER_ROLES.CUSTOMER,
    restaurantId: null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  const created = await getUserProfile(user.uid)
  if (!created) {
    throw new Error('User profile could not be created.')
  }

  return created
}
