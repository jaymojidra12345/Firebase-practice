import { Link } from 'react-router-dom'
import { ROUTES } from '../constants/routes'

const stats = [
  { value: '500+', label: 'Restaurants ready to onboard' },
  { value: '30 min', label: 'Average delivery target' },
  { value: '4.9/5', label: 'Customer satisfaction goal' },
  { value: '24/7', label: 'Platform availability goal' },
]

const features = [
  {
    title: 'Fast ordering experience',
    description:
      'Browse restaurants, view menus, and place orders in a few clicks with a clean mobile-first flow.',
    tag: 'Experience',
  },
  {
    title: 'Firebase-powered auth',
    description:
      'Email, Google sign-in, password reset, and scalable user identity management are already built in.',
    tag: 'Security',
  },
  {
    title: 'Real-time growth path',
    description:
      'The project is structured for live order updates, storage uploads, dashboards, and Firestore-backed data.',
    tag: 'Scalability',
  },
  {
    title: 'Reusable UI foundation',
    description:
      'Shared layout, auth components, route constants, and typed models make future features easier to add.',
    tag: 'Foundation',
  },
]

const steps = [
  {
    step: '01',
    title: 'Discover restaurants',
    description: 'Search and explore popular restaurants, cuisines, and featured offers.',
  },
  {
    step: '02',
    title: 'Place your order',
    description: 'Choose menu items, add them to cart, and confirm delivery details in seconds.',
  },
  {
    step: '03',
    title: 'Track in real time',
    description: 'Follow order progress from confirmation to delivery with live status updates.',
  },
]

const categories = ['Pizza', 'Burgers', 'Biryani', 'Healthy Bowls', 'Desserts', 'Coffee']

const highlights = [
  'Responsive layout for mobile, tablet, and desktop',
  'Strong hero messaging and conversion-focused CTAs',
  'Prepared for restaurant, cart, and dashboard features',
  'Clean structure that matches the current React architecture',
]

const testimonials = [
  {
    name: 'Aarav',
    role: 'Early user',
    quote:
      'The flow feels fast and clean. It already looks like the start of a real food delivery product.',
  },
  {
    name: 'Nisha',
    role: 'Restaurant owner',
    quote:
      'The landing page explains the product clearly and feels polished across device sizes.',
  },
  {
    name: 'Kabir',
    role: 'Frontend reviewer',
    quote:
      'The UI communicates a premium app direction while staying practical for future Firebase features.',
  },
]

export function HomePage() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 text-white">
        <div className="absolute inset-0">
          <div className="absolute left-[-4rem] top-[-3rem] h-56 w-56 rounded-full bg-white/10 blur-3xl sm:h-72 sm:w-72" />
          <div className="absolute right-[-5rem] top-24 h-64 w-64 rounded-full bg-orange-200/20 blur-3xl sm:h-80 sm:w-80" />
          <div className="absolute bottom-[-6rem] left-1/3 h-72 w-72 rounded-full bg-brand-100/10 blur-3xl sm:h-96 sm:w-96" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_38%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8 lg:pb-28 lg:pt-20">
          <div className="grid gap-14 lg:min-h-[calc(100vh-9rem)] lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-50 sm:text-sm">
                Food ordering system built with React + Firebase
              </span>

              <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl lg:leading-[1.05]">
                Delicious food,
                <span className="block text-brand-100">beautifully delivered across every screen.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-brand-50 sm:text-lg sm:leading-8 lg:text-xl">
                FoodHub is a modern food ordering platform where users can sign in, explore
                restaurants, place orders, and follow delivery status through a fast, responsive,
                and scalable frontend powered by Firebase.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  to={ROUTES.SIGNUP}
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-brand-700 shadow-xl shadow-brand-900/10 transition hover:bg-brand-50 sm:px-7"
                >
                  Start ordering
                </Link>
                <Link
                  to={ROUTES.RESTAURANTS}
                  className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/15 sm:px-7"
                >
                  Browse restaurants
                </Link>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {highlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-brand-50 backdrop-blur"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur"
                  >
                    <p className="text-2xl font-bold sm:text-3xl">{item.value}</p>
                    <p className="mt-2 text-sm text-brand-100">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-4 top-6 hidden h-24 w-24 rounded-3xl bg-white/10 blur-2xl sm:block" />
              <div className="rounded-[2rem] border border-white/15 bg-white/10 p-3 shadow-2xl backdrop-blur sm:p-4">
                <div className="rounded-[1.75rem] bg-[#fffaf6] p-4 text-gray-900 shadow-inner sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-brand-600">Live app preview</p>
                      <h2 className="mt-1 text-2xl font-bold sm:text-3xl">Your next meal is closer than ever</h2>
                    </div>
                    <span className="inline-flex self-start rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                      Responsive hero card
                    </span>
                  </div>

                  <div className="mt-6 rounded-3xl border border-orange-100 bg-white p-4 shadow-sm sm:p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                          Featured restaurant
                        </p>
                        <p className="mt-2 text-xl font-semibold">Spice Route Kitchen</p>
                        <p className="mt-1 text-sm text-gray-500">
                          Indian, grills, biryani, wraps, family meals
                        </p>
                      </div>
                      <div className="rounded-2xl bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                        28 min delivery
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-gray-600">
                      <span className="rounded-full bg-orange-50 px-3 py-1">Top rated</span>
                      <span className="rounded-full bg-orange-50 px-3 py-1">Free delivery</span>
                      <span className="rounded-full bg-orange-50 px-3 py-1">20% off first order</span>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 lg:grid-cols-2">
                    <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
                      <p className="text-sm font-medium text-gray-500">Search by craving</p>
                      <div className="mt-4 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-400">
                        Search pizza, burgers, biryani...
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {categories.slice(0, 4).map((category) => (
                          <span
                            key={category}
                            className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
                      <p className="text-sm font-medium text-gray-500">Live order tracking</p>
                      <p className="mt-3 text-lg font-semibold">Preparing your meal</p>
                      <div className="mt-4 h-2 rounded-full bg-gray-100">
                        <div className="h-2 w-2/3 rounded-full bg-brand-500" />
                      </div>
                      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-gray-500">
                        <div className="rounded-2xl bg-brand-50 px-2 py-2 font-semibold text-brand-700">
                          Confirmed
                        </div>
                        <div className="rounded-2xl bg-orange-50 px-2 py-2 font-semibold text-orange-700">
                          Cooking
                        </div>
                        <div className="rounded-2xl bg-gray-100 px-2 py-2">On the way</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl bg-gray-900 p-5 text-white shadow-sm">
                      <p className="text-sm font-medium text-gray-300">Authentication</p>
                      <p className="mt-3 text-xl font-semibold">Email and Google sign-in</p>
                      <p className="mt-2 text-sm leading-6 text-gray-300">
                        Built on Firebase Authentication with account recovery ready.
                      </p>
                    </div>
                    <div className="rounded-3xl bg-white p-5 ring-1 ring-gray-100 shadow-sm">
                      <p className="text-sm font-medium text-gray-500">Next product phase</p>
                      <p className="mt-3 text-xl font-semibold text-gray-900">Menus, carts, and dashboards</p>
                      <p className="mt-2 text-sm leading-6 text-gray-500">
                        The current structure is prepared for Firestore-powered restaurant and order data.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

 

      <section id="features" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-28">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
            Why FoodHub
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            A bigger, smarter landing experience for a real food delivery product.
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            The project already combines authentication, routing, reusable UI, and Firebase
            integration so the next features can grow on a strong base.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="inline-flex rounded-2xl bg-brand-50 px-3 py-2 text-sm font-semibold text-brand-700">
                {feature.tag}
              </div>
              <h3 className="mt-5 text-xl font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-3 leading-7 text-gray-600">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-10 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
                How it works
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                From restaurant discovery to doorstep delivery.
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-gray-600">
                The product flow is designed to stay simple for users while remaining scalable for
                features like carts, payments, order history, and dashboards.
              </p>

              <div className="mt-10 grid gap-5">
                {steps.map((item) => (
                  <div
                    key={item.step}
                    className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-600 text-sm font-bold text-white">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                        <p className="mt-2 leading-7 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6">
              <div className="rounded-[2rem] bg-gray-900 p-8 text-white shadow-xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-200">
                  Popular categories
                </p>
                <h3 className="mt-3 text-2xl font-bold">Meals users will love to order</h3>
                <p className="mt-4 text-gray-300">
                  These sections can later connect directly to Firestore collections and filtered
                  restaurant listings.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <span
                      key={category}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-100"
                    >
                      {category}
                    </span>
                  ))}
                </div>

                <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-orange-100">Built for the next phases</p>
                  <ul className="mt-4 space-y-3 text-sm text-gray-200">
                    <li>Role-based user profiles</li>
                    <li>Restaurant and menu management</li>
                    <li>Cart, orders, ratings, and wishlists</li>
                    <li>Owner and admin dashboards</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
                  Platform strength
                </p>
                <h3 className="mt-3 text-2xl font-bold text-gray-900">
                  Designed to scale from practice project to full product.
                </h3>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-gray-50 p-5">
                    <p className="text-sm font-medium text-gray-500">Conversion-focused UI</p>
                    <p className="mt-2 text-lg font-semibold text-gray-900">Stronger hero and CTAs</p>
                  </div>
                  <div className="rounded-3xl bg-gray-50 p-5">
                    <p className="text-sm font-medium text-gray-500">Responsive design</p>
                    <p className="mt-2 text-lg font-semibold text-gray-900">Mobile, tablet, desktop</p>
                  </div>
                  <div className="rounded-3xl bg-gray-50 p-5">
                    <p className="text-sm font-medium text-gray-500">Developer-friendly</p>
                    <p className="mt-2 text-lg font-semibold text-gray-900">Built from reusable sections</p>
                  </div>
                  <div className="rounded-3xl bg-gray-50 p-5">
                    <p className="text-sm font-medium text-gray-500">Future-ready</p>
                    <p className="mt-2 text-lg font-semibold text-gray-900">Works with Firebase growth</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="text-3xl font-bold text-brand-200">&quot;</div>
              <p className="mt-3 leading-7 text-gray-600">{item.quote}</p>
              <div className="mt-6">
                <p className="font-semibold text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500">{item.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="rounded-[2rem] bg-gradient-to-r from-brand-600 to-brand-700 px-6 py-10 text-white shadow-xl sm:px-10 lg:px-12 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-100">
                Ready to explore
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Launch FoodHub with a landing page that finally feels product-ready.
              </h2>
              <p className="mt-4 text-base leading-7 text-brand-50 sm:text-lg">
                Start with authentication today, showcase the platform with a stronger first
                impression, and continue building the full ordering experience from this foundation.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                to={ROUTES.LOGIN}
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                Sign in
              </Link>
              <Link
                to={ROUTES.SIGNUP}
                className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
              >
                Create account
              </Link>
              <Link
                to={ROUTES.RESTAURANTS}
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/15 sm:col-span-2"
              >
                Explore the restaurant experience
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
