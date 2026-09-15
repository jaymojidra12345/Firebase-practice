export type UserRole = 'customer' | 'restaurant_owner' | 'admin'

export const USER_ROLES = {
  CUSTOMER: 'customer',
  RESTAURANT_OWNER: 'restaurant_owner',
  ADMIN: 'admin',
} as const satisfies Record<string, UserRole>

export const ROLE_LABELS: Record<UserRole, string> = {
  customer: 'Customer',
  restaurant_owner: 'Restaurant',
  admin: 'Admin',
}

export interface UserProfile {
  uid: string
  email: string
  displayName: string
  role: UserRole
  photoURL?: string | null
  phone?: string | null
  restaurantId?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Restaurant {
  id: string
  name: string
  description: string
  cuisine: string[]
  rating: number
  deliveryTime: string
  logoUrl?: string | null
  bannerUrl?: string | null
  ownerId: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CreateRestaurantInput {
  name: string
  description: string
  cuisine: string[]
  deliveryTime: string
  ownerId: string
}

export interface MenuItem {
  id: string
  restaurantId: string
  name: string
  description: string
  price: number
  category: string
  imageUrl?: string
  isAvailable: boolean
}

export interface CartItem {
  menuItemId: string
  name: string
  price: number
  quantity: number
  imageUrl?: string
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'

export interface Order {
  id: string
  customerId: string
  restaurantId: string
  items: CartItem[]
  total: number
  status: OrderStatus
  createdAt: Date
}
