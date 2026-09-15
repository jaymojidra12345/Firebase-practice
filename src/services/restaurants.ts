import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  type DocumentSnapshot,
  type Timestamp,
} from 'firebase/firestore'
import { db } from '../config/firebase'
import { COLLECTIONS } from '../constants/collections'
import { USER_ROLES, type CreateRestaurantInput, type Restaurant } from '../types'
import { getUserDocRef, getUserProfileByEmail } from './users'

function toDate(value: Timestamp | Date | undefined): Date {
  if (!value) {
    return new Date()
  }
  if (value instanceof Date) {
    return value
  }
  return value.toDate()
}

function mapRestaurant(snapshot: DocumentSnapshot): Restaurant {
  const data = snapshot.data()

  return {
    id: snapshot.id,
    name: String(data?.name ?? ''),
    description: String(data?.description ?? ''),
    cuisine: Array.isArray(data?.cuisine) ? data.cuisine.map(String) : [],
    rating: Number(data?.rating ?? 0),
    deliveryTime: String(data?.deliveryTime ?? ''),
    logoUrl: data?.logoUrl ?? null,
    bannerUrl: data?.bannerUrl ?? null,
    ownerId: String(data?.ownerId ?? ''),
    isActive: Boolean(data?.isActive ?? true),
    createdAt: toDate(data?.createdAt as Timestamp | Date | undefined),
    updatedAt: toDate(data?.updatedAt as Timestamp | Date | undefined),
  }
}

export async function listRestaurants(): Promise<Restaurant[]> {
  const restaurantsQuery = query(
    collection(db, COLLECTIONS.RESTAURANTS),
    orderBy('createdAt', 'desc'),
  )
  const snapshot = await getDocs(restaurantsQuery)
  return snapshot.docs.map(mapRestaurant)
}

export async function assignExistingUserAsOwner(
  ownerEmail: string,
  input: CreateRestaurantInput,
): Promise<string> {
  const ownerProfile = await getUserProfileByEmail(ownerEmail)

  if (!ownerProfile) {
    throw new Error('No user found with that email. Ask them to sign up first, or create a new owner account.')
  }

  if (ownerProfile.role === USER_ROLES.ADMIN) {
    throw new Error('An admin account cannot be assigned as a restaurant owner.')
  }

  if (ownerProfile.restaurantId) {
    throw new Error('This user is already linked to another restaurant.')
  }

  const restaurantRef = doc(collection(db, COLLECTIONS.RESTAURANTS))
  const userRef = getUserDocRef(ownerProfile.uid)

  await runTransaction(db, async (transaction) => {
    transaction.set(restaurantRef, {
      name: input.name.trim(),
      description: input.description.trim(),
      cuisine: input.cuisine,
      rating: 0,
      deliveryTime: input.deliveryTime.trim() || '30-40 min',
      ownerId: ownerProfile.uid,
      isActive: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

    transaction.update(userRef, {
      role: USER_ROLES.RESTAURANT_OWNER,
      restaurantId: restaurantRef.id,
      updatedAt: serverTimestamp(),
    })
  })

  return restaurantRef.id
}
