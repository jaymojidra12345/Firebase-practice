import { initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { FieldValue, getFirestore } from 'firebase-admin/firestore'
import { onCall, HttpsError } from 'firebase-functions/v2/https'

initializeApp()

const db = getFirestore()
const auth = getAuth()

interface CreateRestaurantPayload {
  ownerEmail: string
  ownerPassword: string
  ownerDisplayName: string
  restaurantName: string
  description: string
  cuisine: string
  deliveryTime: string
}

async function assertAdmin(uid: string) {
  const adminDoc = await db.collection('users').doc(uid).get()
  if (!adminDoc.exists || adminDoc.data()?.role !== 'admin') {
    throw new HttpsError('permission-denied', 'Only admins can perform this action.')
  }
}

export const createRestaurantWithOwner = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'You must be signed in.')
  }

  await assertAdmin(request.auth.uid)

  const data = request.data as CreateRestaurantPayload
  const ownerEmail = String(data.ownerEmail ?? '').trim().toLowerCase()
  const ownerPassword = String(data.ownerPassword ?? '')
  const ownerDisplayName = String(data.ownerDisplayName ?? '').trim()
  const restaurantName = String(data.restaurantName ?? '').trim()
  const description = String(data.description ?? '').trim()
  const cuisineRaw = String(data.cuisine ?? '').trim()
  const deliveryTime = String(data.deliveryTime ?? '').trim()

  if (!ownerEmail || !ownerPassword || !ownerDisplayName || !restaurantName) {
    throw new HttpsError('invalid-argument', 'Please fill in all required fields.')
  }

  if (ownerPassword.length < 6) {
    throw new HttpsError('invalid-argument', 'Password must be at least 6 characters.')
  }

  const cuisine = cuisineRaw
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  let ownerUid: string

  try {
    const existing = await auth.getUserByEmail(ownerEmail)
    ownerUid = existing.uid

    const existingProfile = await db.collection('users').doc(ownerUid).get()
    const profileData = existingProfile.data()

    if (profileData?.role === 'admin') {
      throw new HttpsError('failed-precondition', 'Cannot assign an admin as a restaurant owner.')
    }

    if (profileData?.restaurantId) {
      throw new HttpsError(
        'already-exists',
        'This user is already linked to another restaurant.',
      )
    }
  } catch (error) {
    const firebaseError = error as { code?: string }
    if (firebaseError.code !== 'auth/user-not-found') {
      throw error
    }

    const created = await auth.createUser({
      email: ownerEmail,
      password: ownerPassword,
      displayName: ownerDisplayName,
    })
    ownerUid = created.uid
  }

  const restaurantRef = db.collection('restaurants').doc()
  const userRef = db.collection('users').doc(ownerUid)
  const userSnapshot = await userRef.get()

  await db.runTransaction(async (transaction) => {
    transaction.set(restaurantRef, {
      name: restaurantName,
      description,
      cuisine,
      rating: 0,
      deliveryTime: deliveryTime || '30-40 min',
      ownerId: ownerUid,
      isActive: true,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    })

    if (userSnapshot.exists) {
      transaction.update(userRef, {
        role: 'restaurant_owner',
        restaurantId: restaurantRef.id,
        displayName: ownerDisplayName,
        updatedAt: FieldValue.serverTimestamp(),
      })
    } else {
      transaction.set(userRef, {
        uid: ownerUid,
        email: ownerEmail,
        displayName: ownerDisplayName,
        role: 'restaurant_owner',
        restaurantId: restaurantRef.id,
        photoURL: null,
        phone: null,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      })
    }
  })

  return {
    restaurantId: restaurantRef.id,
    ownerId: ownerUid,
    ownerEmail,
  }
})
