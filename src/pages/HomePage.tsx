import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
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
    title: 'Secure authentication',
    description:
      'Email, Google sign-in, password reset, and scalable user identity management are already built in.',
    tag: 'Security',
  },
  {
    title: 'Real-time growth path',
    description:
      'The project is structured for live order updates, storage uploads, dashboards, and scalable data management.',
    tag: 'Scalability',
  },
  {
    title: 'Reusable UI foundation',
    description:
      'Shared layout, auth components, route constants, and typed models make future features easier to add.',
    tag: 'Foundation',
  },
  {
    title: 'Smart restaurant discovery',
    description:
      'Filter by cuisine, delivery time, ratings, and offers so hungry users can find the right meal quickly.',
    tag: 'Discovery',
  },
  {
    title: 'Order history ready',
    description:
      'The architecture leaves room for saved addresses, reorder shortcuts, invoices, and customer support trails.',
    tag: 'Retention',
  },
]

const steps = [
  {
    step: '01',
    title: 'Discover restaurants',
    description: 'Search and explore popular restaurants, cuisines, and featured offers near you.',
  },
  {
    step: '02',
    title: 'Build your meal',
    description: 'Open menus, customize items, add extras, and keep everything in one cart.',
  },
  {
    step: '03',
    title: 'Place your order',
    description: 'Confirm delivery details, apply offers, and check out with a secure account.',
  },
  {
    step: '04',
    title: 'Track in real time',
    description: 'Follow order progress from confirmation to delivery with live status updates.',
  },
]

const categories = [
  { name: 'Pizza', detail: 'Wood-fired, cheesy, late-night favorite' },
  { name: 'Burgers', detail: 'Stacked, grilled, and loaded' },
  { name: 'Biryani', detail: 'Aromatic rice bowls for sharing' },
  { name: 'Healthy Bowls', detail: 'Salads, protein, and light meals' },
  { name: 'Desserts', detail: 'Cakes, ice cream, and sweets' },
  { name: 'Coffee', detail: 'Cafe drinks and bakery bites' },
  { name: 'Chinese', detail: 'Noodles, dumplings, and wok favorites' },
  { name: 'South Indian', detail: 'Dosa, idli, and filter coffee' },
  { name: 'Gujarati', detail: 'Thali, farsan, and homestyle meals' },
  { name: 'Mexican', detail: 'Tacos, wraps, and loaded nachos' },
  { name: 'Breakfast', detail: 'Poha, paratha, and morning plates' },
  { name: 'Ice Cream', detail: 'Scoops, sundaes, and shakes' },
]

const highlights = [
  'Responsive layout for mobile, tablet, and desktop',
  'Strong hero messaging and conversion-focused CTAs',
  'Prepared for restaurant, cart, and dashboard features',
  'Clean structure for scalable application growth',
]

const featuredRestaurants = [
  {
    name: 'Spice Route Kitchen',
    cuisine: 'Indian • Grills • Biryani',
    eta: '28 min',
    rating: '4.8',
    offer: '20% off first order',
    accent: 'from-orange-500 to-amber-400',
  },
  {
    name: 'Harbor Slice',
    cuisine: 'Pizza • Pasta • Garlic bread',
    eta: '22 min',
    rating: '4.7',
    offer: 'Free delivery',
    accent: 'from-rose-500 to-orange-400',
  },
  {
    name: 'Green Fork Bowls',
    cuisine: 'Healthy • Salads • Smoothies',
    eta: '18 min',
    rating: '4.9',
    offer: 'Low-calorie picks',
    accent: 'from-emerald-500 to-lime-400',
  },
  {
    name: 'Night Owl Burgers',
    cuisine: 'Burgers • Fries • Shakes',
    eta: '25 min',
    rating: '4.6',
    offer: 'Combo meals from ₹199',
    accent: 'from-slate-700 to-orange-500',
  },
  {
    name: 'Sakura Wok',
    cuisine: 'Chinese • Thai • Noodles',
    eta: '31 min',
    rating: '4.5',
    offer: 'Buy 1 get 1 noodles',
    accent: 'from-red-500 to-yellow-400',
  },
  {
    name: 'Mocha Lane Cafe',
    cuisine: 'Coffee • Desserts • Bakery',
    eta: '16 min',
    rating: '4.8',
    offer: 'Free pastry on ₹399+',
    accent: 'from-amber-700 to-orange-300',
  },
  {
    name: 'The Dhokla House',
    cuisine: 'Gujarati • Farsan • Thali',
    eta: '24 min',
    rating: '4.7',
    offer: 'Family thali at ₹249',
    accent: 'from-yellow-500 to-orange-400',
  },
  {
    name: 'Taco Street',
    cuisine: 'Mexican • Tacos • Nachos',
    eta: '27 min',
    rating: '4.6',
    offer: 'Add-on nachos free',
    accent: 'from-lime-500 to-orange-500',
  },
  {
    name: 'Royal Thali',
    cuisine: 'North Indian • Veg • Unlimited',
    eta: '33 min',
    rating: '4.8',
    offer: 'Weekend unlimited spread',
    accent: 'from-amber-600 to-red-400',
  },
]

const popularDishes = [
  { name: 'Hyderabadi Chicken Biryani', kitchen: 'Spice Route Kitchen', price: '₹289', time: '28 min' },
  { name: 'Wood-fired Margherita', kitchen: 'Harbor Slice', price: '₹249', time: '22 min' },
  { name: 'Protein Power Bowl', kitchen: 'Green Fork Bowls', price: '₹219', time: '18 min' },
  { name: 'Double Cheese Smash Burger', kitchen: 'Night Owl Burgers', price: '₹199', time: '25 min' },
  { name: 'Chilli Garlic Noodles', kitchen: 'Sakura Wok', price: '₹179', time: '31 min' },
  { name: 'Hazelnut Mocha + Brownie', kitchen: 'Mocha Lane Cafe', price: '₹169', time: '16 min' },
  { name: 'Gujarati Unlimited Thali', kitchen: 'The Dhokla House', price: '₹249', time: '24 min' },
  { name: 'Loaded Nacho Tacos', kitchen: 'Taco Street', price: '₹229', time: '27 min' },
]

const offers = [
  {
    title: 'First order 20% off',
    detail: 'New accounts get an instant discount on the first eligible restaurant order.',
    badge: 'New users',
  },
  {
    title: 'Free delivery above ₹199',
    detail: 'Skip delivery fees on nearby kitchens during lunch and dinner windows.',
    badge: 'Daily',
  },
  {
    title: 'Weekend family packs',
    detail: 'Shareable biryani, pizza, and thali bundles priced for groups of 3–5.',
    badge: 'Sat–Sun',
  },
  {
    title: 'Late-night combos',
    detail: 'Burgers, fries, and shakes stay available after 11 PM in launch cities.',
    badge: 'After 11 PM',
  },
]

const occasions = [
  {
    title: 'Breakfast',
    window: '7:00 AM – 11:00 AM',
    description: 'Poha, paratha, idli, filter coffee, and light cafe plates to start the day.',
  },
  {
    title: 'Lunch',
    window: '12:00 PM – 3:30 PM',
    description: 'Thalis, bowls, biryani, and office-friendly meals with faster kitchen ETAs.',
  },
  {
    title: 'Snacks',
    window: '4:00 PM – 7:00 PM',
    description: 'Farsan, fries, coffee, and dessert drops for the in-between hunger stretch.',
  },
  {
    title: 'Dinner & late night',
    window: '7:30 PM – 1:00 AM',
    description: 'Family dinners, pizza nights, and campus-friendly late orders in one place.',
  },
]

const audiences = [
  {
    title: 'For hungry customers',
    description:
      'Find nearby restaurants, compare menus, track orders, and reorder favorites without friction.',
    points: ['Cuisine and rating filters', 'Saved addresses and repeat orders', 'Live delivery status'],
  },
  {
    title: 'For restaurant partners',
    description:
      'Get discovered by more diners, publish menus, and manage incoming orders from one dashboard.',
    points: ['Menu and offer management', 'Order alerts and preparation status', 'Ratings and customer insights'],
  },
  {
    title: 'For the platform team',
    description:
      'Grow from a practice app into a full marketplace with auth, data, and admin tools already planned.',
    points: ['Secure authentication today', 'Scalable restaurant data', 'Owner and admin dashboards next'],
  },
]

const promises = [
  {
    title: 'Hot food, on time',
    description: 'Delivery windows are designed around nearby kitchens so meals arrive while they still taste great.',
  },
  {
    title: 'Transparent pricing',
    description: 'See item totals, delivery fees, and offers before you confirm — no last-second surprises.',
  },
  {
    title: 'Secure accounts',
    description: 'Secure authentication protects sign-in with email, Google, and password recovery.',
  },
  {
    title: 'Support that scales',
    description: 'The product is planned for order history, help requests, and restaurant-side issue handling.',
  },
]

const membershipPerks = [
  {
    title: 'Priority delivery slots',
    description: 'Members get first access to busy kitchen windows during lunch and weekend peaks.',
  },
  {
    title: 'Saved favorites everywhere',
    description: 'Keep restaurants, dishes, and addresses ready so the next order takes seconds.',
  },
  {
    title: 'Offer stacking',
    description: 'Combine restaurant deals with platform coupons once checkout and wallets are live.',
  },
  {
    title: 'Reorder in one tap',
    description: 'Past orders become shortcuts for weekday lunches, family dinners, and late-night snacks.',
  },
]

const partnerBenefits = [
  {
    title: 'Get discovered locally',
    description: 'Show up in cuisine, rating, and offer collections instead of waiting for walk-ins.',
  },
  {
    title: 'Publish menus once',
    description: 'Keep items, prices, photos, and availability in one kitchen profile.',
  },
  {
    title: 'Own the rush hour',
    description: 'Accept, prepare, and mark orders ready without juggling chats and phone calls.',
  },
  {
    title: 'See what sells',
    description: 'Ratings, popular dishes, and repeat-order signals help kitchens plan the next menu.',
  },
]

const qualityChecks = [
  {
    title: 'Kitchen quality signals',
    description: 'Ratings, preparation times, and cancellation reasons will sit next to every restaurant card.',
  },
  {
    title: 'Clear allergen notes',
    description: 'Menus are planned to surface spice levels, veg/non-veg tags, and common allergen flags.',
  },
  {
    title: 'Contactless by default',
    description: 'Delivery instructions and doorstep notes will travel with every order ticket.',
  },
  {
    title: 'Issue handling',
    description: 'Missing items, delays, and refunds will route through a support trail instead of dead-end chats.',
  },
]

const cities = [
  'Ahmedabad',
  'Surat',
  'Vadodara',
  'Rajkot',
  'Mumbai',
  'Pune',
  'Bengaluru',
  'Hyderabad',
  'Delhi NCR',
  'Jaipur',
  'Indore',
  'Chennai',
]

const faqs = [
  {
    question: 'Is FoodHub a live ordering app today?',
    answer:
      'Authentication, routing, and the landing experience are live. Restaurant browsing, carts, and checkout are the next product phases.',
  },
  {
    question: 'Do I need an account to explore restaurants?',
    answer:
      'You can browse the restaurant experience without signing in. An account is required when you place an order or save favorites.',
  },
  {
    question: 'How will orders be tracked?',
    answer:
      'Order status will move from confirmed to cooking, on the way, and delivered, with room for live status updates.',
  },
  {
    question: 'Can restaurants join the platform?',
    answer:
      'Yes. Partner onboarding, menus, and owner dashboards are part of the planned growth path after the customer flow.',
  },
  {
    question: 'What stack is FoodHub built on?',
    answer:
      'Modern web technologies with a focus on fast performance, responsive design, and secure authentication — with advanced features planned next.',
  },
  {
    question: 'Is the app mobile friendly?',
    answer:
      'Yes. The layout is designed first for phones, then expanded for tablets and desktops without losing the same flow.',
  },
  {
    question: 'Will there be vegetarian and healthy filters?',
    answer:
      'Yes. Cuisine tags, veg/non-veg labels, calorie-friendly bowls, and rating filters are part of the discovery design.',
  },
  {
    question: 'Can I schedule an order for later?',
    answer:
      'Scheduled slots are planned after checkout. For now, the landing page shows breakfast through late-night windows.',
  },
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
      'The UI communicates a premium app direction while staying practical for future features.',
  },
  {
    name: 'Meera',
    role: 'Busy professional',
    quote:
      'I like that I can scan cuisines, see delivery times, and jump into sign-in without a cluttered homepage.',
  },
  {
    name: 'Rohan',
    role: 'Campus student',
    quote:
      'Late-night burgers and biryani in one place is exactly the vibe. The featured restaurants make it easy to start.',
  },
  {
    name: 'Isha',
    role: 'Cafe partner',
    quote:
      'Coffee and dessert brands finally get a spotlight instead of being buried behind only dinner menus.',
  },
]

export function HomePage() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return

    const id = hash.replace('#', '')
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [hash])

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
                Modern food ordering system
              </span>

              <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl lg:leading-[1.05]">
                Delicious food,
                <span className="block text-brand-100">beautifully delivered across every screen.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-brand-50 sm:text-lg sm:leading-8 lg:text-xl">
                FoodHub is a modern food ordering platform where users can sign in, explore
                restaurants, place orders, and follow delivery status through a fast, responsive,
                and scalable platform.
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
                            key={category.name}
                            className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
                          >
                            {category.name}
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
                        Built with secure authentication and account recovery ready.
                      </p>
                    </div>
                    <div className="rounded-3xl bg-white p-5 ring-1 ring-gray-100 shadow-sm">
                      <p className="text-sm font-medium text-gray-500">Next product phase</p>
                      <p className="mt-3 text-xl font-semibold text-gray-900">Menus, carts, and dashboards</p>
                      <p className="mt-2 text-sm leading-6 text-gray-500">
                        The current structure is prepared for scalable restaurant and order data.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="offers" className="border-b border-orange-100 bg-brand-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
              Today’s deals
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              More reasons to open the app than a single hero banner.
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Offers, meal windows, and first-order perks now sit on the homepage so FoodHub feels
              like a marketplace, not a thin product teaser.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {offers.map((offer) => (
              <article
                key={offer.title}
                className="rounded-[1.75rem] border border-white bg-white p-6 shadow-sm"
              >
                <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                  {offer.badge}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">{offer.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">{offer.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="cuisines" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
              Popular cuisines
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Order from the cravings people actually search for.
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              From weeknight biryani to late-night pizza, FoodHub is built around the meals that
              fill a real marketplace — not a thin demo homepage.
            </p>
          </div>
          <Link
            to={ROUTES.RESTAURANTS}
            className="inline-flex items-center justify-center rounded-2xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-brand-100 hover:bg-brand-50 hover:text-brand-700"
          >
            See all restaurants
          </Link>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <article
              key={category.name}
              className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-lg font-bold text-brand-700">
                {category.name.slice(0, 1)}
              </div>
              <h3 className="mt-5 text-xl font-semibold text-gray-900">{category.name}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">{category.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="meal-times" className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
              All-day menus
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Breakfast through late night, without leaving the homepage.
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              FoodHub is designed around how people actually eat: a morning coffee, a rushed lunch,
              evening snacks, and a family dinner that still arrives hot.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {occasions.map((item) => (
              <article
                key={item.title}
                className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-sm"
              >
                <p className="text-sm font-semibold text-brand-600">{item.window}</p>
                <h3 className="mt-3 text-2xl font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-3 leading-7 text-gray-600">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="dishes" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
            Popular dishes
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            The meals people will reorder, not just restaurants they browse.
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Dish cards preview how menus, prices, and delivery times will sit together once kitchen
            data is connected to the platform.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {popularDishes.map((dish) => (
            <article
              key={dish.name}
              className="rounded-[1.75rem] border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                {dish.kitchen}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-gray-900">{dish.name}</h3>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="font-semibold text-brand-700">{dish.price}</span>
                <span className="rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-600">
                  {dish.time}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="restaurants" className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
              Featured kitchens
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              A fuller restaurant lineup for the landing page.
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              These preview cards show how the marketplace will feel once restaurant data
              is connected — ratings, delivery time, and offers in one glance.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredRestaurants.map((restaurant) => (
              <article
                key={restaurant.name}
                className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className={`h-28 bg-gradient-to-br ${restaurant.accent}`} />
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{restaurant.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">{restaurant.cuisine}</p>
                    </div>
                    <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
                      {restaurant.rating}
                    </span>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2 text-sm">
                    <span className="rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-700">
                      {restaurant.eta}
                    </span>
                    <span className="rounded-full bg-brand-50 px-3 py-1 font-medium text-brand-700">
                      {restaurant.offer}
                    </span>
                  </div>
                </div>
              </article>
            ))}
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
            The project already combines authentication, routing, reusable UI, and secure
            integration so the next features can grow on a strong base.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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

      <section id="membership" className="bg-gray-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-200">
                FoodHub Plus
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                A membership story that makes the homepage feel complete.
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-300">
                Repeat orders, saved addresses, and busy lunch hours need more than a one-time
                signup. These perks preview the loyalty layer the product can grow into.
              </p>
              <Link
                to={ROUTES.SIGNUP}
                className="mt-8 inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
              >
                Create a free account
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {membershipPerks.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6"
                >
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-300">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
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
                  Built for the next phases
                </p>
                <h3 className="mt-3 text-2xl font-bold">Everything after the first order</h3>
                <p className="mt-4 text-gray-300">
                  The landing page now explains the full product story, so visitors understand both
                  what is live today and what the platform is growing into.
                </p>

                <ul className="mt-8 space-y-3 text-sm text-gray-200">
                  <li>Role-based user profiles</li>
                  <li>Restaurant and menu management</li>
                  <li>Cart, orders, ratings, and wishlists</li>
                  <li>Owner and admin dashboards</li>
                  <li>Payments, invoices, and support tickets</li>
                </ul>
              </div>

              <div className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
                  Delivery promise
                </p>
                <h3 className="mt-3 text-2xl font-bold text-gray-900">
                  Designed around speed, clarity, and trust.
                </h3>
                <div className="mt-6 grid gap-4">
                  {promises.map((item) => (
                    <div key={item.title} className="rounded-3xl bg-gray-50 p-5">
                      <p className="text-lg font-semibold text-gray-900">{item.title}</p>
                      <p className="mt-2 text-sm leading-6 text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="partners" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
            For restaurant partners
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Kitchens get a homepage story too, not only hungry customers.
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Partner onboarding, menus, and dashboards are the next phase. Until then, the landing
            page shows why a restaurant would actually join.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {partnerBenefits.map((item) => (
            <article
              key={item.title}
              className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-sm"
            >
              <h3 className="text-2xl font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-3 leading-7 text-gray-600">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="audiences" className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
              Who FoodHub serves
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              One platform for diners, kitchens, and the team behind them.
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              A food marketplace only works when every side of the product is clear. The landing page
              now spells out value for customers, restaurant partners, and builders.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {audiences.map((item) => (
              <article
                key={item.title}
                className="rounded-[2rem] border border-gray-200 bg-white p-8 shadow-sm"
              >
                <h3 className="text-2xl font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-3 leading-7 text-gray-600">{item.description}</p>
                <ul className="mt-6 space-y-3 text-sm text-gray-700">
                  {item.points.map((point) => (
                    <li key={point} className="rounded-2xl bg-brand-50 px-4 py-3 font-medium text-brand-700">
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="quality" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
              Trust and quality
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              The extra details that make ordering feel safe.
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Ratings, kitchen notes, and support paths belong on the landing page so visitors can
              picture the full product — not only the pretty hero.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {qualityChecks.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.75rem] border border-gray-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
                Coverage
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Built first for Indian cities, ready to expand.
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Launch markets can start local and grow. These cities represent the first coverage
                story the product can tell while restaurant data is still being connected.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {cities.map((city) => (
                <span
                  key={city}
                  className="rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
            What people notice
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Feedback from early users, partners, and reviewers.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="text-3xl font-bold text-brand-100">&quot;</div>
              <p className="mt-3 leading-7 text-gray-600">{item.quote}</p>
              <div className="mt-6">
                <p className="font-semibold text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500">{item.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="faq" className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">FAQ</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Answers before you create an account.
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              A fuller set of questions so the homepage can stand on its own instead of ending after
              a few feature cards.
            </p>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            {faqs.map((item) => (
              <article
                key={item.question}
                className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-900">{item.question}</h3>
                <p className="mt-3 leading-7 text-gray-600">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="rounded-[2rem] bg-gradient-to-r from-brand-600 to-brand-700 px-6 py-10 text-white shadow-xl sm:px-10 lg:px-12 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-100">
                Ready to explore
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Create an account and start with the FoodHub experience.
              </h2>
              <p className="mt-4 text-base leading-7 text-brand-50 sm:text-lg">
                Sign in today, browse the restaurant preview, and keep building the full ordering
                flow from a landing page that now tells the complete product story.
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
