export type UserRole = 'customer' | 'restaurant_owner' | 'admin'

export interface UserProfile {
  uid: string
  email: string
  displayName: string
  role: UserRole
  photoURL?: string
  phone?: string
  createdAt: Date
}

export interface Restaurant {
  id: string
  name: string
  description: string
  cuisine: string[]
  rating: number
  deliveryTime: string
  logoUrl?: string
  bannerUrl?: string
  ownerId: string
  isActive: boolean
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
