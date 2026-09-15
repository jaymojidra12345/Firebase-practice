import { type FormEvent, useCallback, useEffect, useState } from 'react'
import { assignExistingUserAsOwner, listRestaurants } from '../../services/restaurants'
import type { Restaurant } from '../../types'

const initialForm = {
  ownerEmail: '',
  restaurantName: '',
  description: '',
  cuisine: '',
  deliveryTime: '30-40 min',
}

function parseCuisine(value: string) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

export function AdminDashboardPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loadingList, setLoadingList] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [form, setForm] = useState(initialForm)

  const loadRestaurants = useCallback(async () => {
    setLoadingList(true)
    try {
      const data = await listRestaurants()
      setRestaurants(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load restaurants.')
    } finally {
      setLoadingList(false)
    }
  }, [])

  useEffect(() => {
    void loadRestaurants()
  }, [loadRestaurants])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    setSuccess('')
    setSubmitting(true)

    try {
      const restaurantId = await assignExistingUserAsOwner(form.ownerEmail, {
        name: form.restaurantName,
        description: form.description,
        cuisine: parseCuisine(form.cuisine),
        deliveryTime: form.deliveryTime,
        ownerId: '',
      })
      setSuccess(`Restaurant created and linked. Restaurant ID: ${restaurantId}`)
      setForm(initialForm)
      await loadRestaurants()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not create restaurant.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass =
    'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20'

  return (
    <div className="space-y-8">
      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-slate-400">Total restaurants</p>
          <p className="mt-2 text-3xl font-bold">{restaurants.length}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-slate-400">Active restaurants</p>
          <p className="mt-2 text-3xl font-bold">
            {restaurants.filter((restaurant) => restaurant.isActive).length}
          </p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-slate-400">Restaurant owners</p>
          <p className="mt-2 text-3xl font-bold">
            {new Set(restaurants.map((restaurant) => restaurant.ownerId)).size}
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div>
          <h3 className="text-xl font-bold">Create restaurant</h3>
          <p className="mt-1 text-sm text-slate-400">
            Link a restaurant to a user who has already signed up on FoodHub.
          </p>
        </div>

        {error && (
          <div className="mt-5 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-5 rounded-2xl border border-green-400/30 bg-green-500/10 px-4 py-3 text-sm text-green-200">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 grid gap-5 lg:grid-cols-2">
          <div className="space-y-5">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-300">
              Restaurant owner
            </h4>
            <label className="block space-y-2">
              <span className="text-sm text-slate-300">Owner email</span>
              <input
                type="email"
                className={inputClass}
                value={form.ownerEmail}
                onChange={(e) => setForm((prev) => ({ ...prev, ownerEmail: e.target.value }))}
                placeholder="owner@example.com"
                required
              />
            </label>
            <p className="text-xs leading-relaxed text-slate-500">
              The owner must sign up first as a customer. After you create the restaurant here,
              their role will change to restaurant owner.
            </p>
          </div>

          <div className="space-y-5">
            <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-300">
              Restaurant details
            </h4>
            <label className="block space-y-2">
              <span className="text-sm text-slate-300">Restaurant name</span>
              <input
                className={inputClass}
                value={form.restaurantName}
                onChange={(e) => setForm((prev) => ({ ...prev, restaurantName: e.target.value }))}
                placeholder="Spice Garden"
                required
              />
            </label>
            <label className="block space-y-2">
              <span className="text-sm text-slate-300">Description</span>
              <textarea
                className={`${inputClass} min-h-24 resize-y`}
                value={form.description}
                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="North Indian cuisine with fast delivery."
                required
              />
            </label>
            <label className="block space-y-2">
              <span className="text-sm text-slate-300">Cuisine tags</span>
              <input
                className={inputClass}
                value={form.cuisine}
                onChange={(e) => setForm((prev) => ({ ...prev, cuisine: e.target.value }))}
                placeholder="Indian, Biryani, Vegetarian"
              />
            </label>
            <label className="block space-y-2">
              <span className="text-sm text-slate-300">Delivery time</span>
              <input
                className={inputClass}
                value={form.deliveryTime}
                onChange={(e) => setForm((prev) => ({ ...prev, deliveryTime: e.target.value }))}
                placeholder="30-40 min"
              />
            </label>
          </div>

          <div className="lg:col-span-2">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? 'Creating...' : 'Create restaurant'}
            </button>
          </div>
        </form>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold">Restaurants</h3>
            <p className="mt-1 text-sm text-slate-400">All restaurants created from this panel.</p>
          </div>
          <button
            type="button"
            onClick={() => void loadRestaurants()}
            className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
          >
            Refresh
          </button>
        </div>

        {loadingList ? (
          <div className="mt-6 h-32 animate-pulse rounded-2xl bg-white/5" />
        ) : restaurants.length === 0 ? (
          <p className="mt-6 text-sm text-slate-400">No restaurants yet. Create the first one above.</p>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-white/10 text-slate-400">
                <tr>
                  <th className="px-3 py-3 font-medium">Restaurant</th>
                  <th className="px-3 py-3 font-medium">Cuisine</th>
                  <th className="px-3 py-3 font-medium">Owner ID</th>
                  <th className="px-3 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {restaurants.map((restaurant) => (
                  <tr key={restaurant.id} className="border-b border-white/5 text-slate-200">
                    <td className="px-3 py-4">
                      <p className="font-semibold text-white">{restaurant.name}</p>
                      <p className="mt-1 max-w-xs truncate text-xs text-slate-400">
                        {restaurant.description}
                      </p>
                    </td>
                    <td className="px-3 py-4">{restaurant.cuisine.join(', ') || '—'}</td>
                    <td className="px-3 py-4 font-mono text-xs">{restaurant.ownerId}</td>
                    <td className="px-3 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          restaurant.isActive
                            ? 'bg-green-500/15 text-green-300'
                            : 'bg-slate-500/15 text-slate-300'
                        }`}
                      >
                        {restaurant.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}
