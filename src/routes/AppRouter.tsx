import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AdminLayout } from '../components/admin/AdminLayout'
import { ProtectedRoute } from '../components/auth/ProtectedRoute'
import { Layout } from '../components/layout/Layout'
import { ROUTES } from '../constants/routes'
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { ProfilePage } from '../pages/ProfilePage'
import { RestaurantsPage } from '../pages/RestaurantsPage'
import { SignupPage } from '../pages/SignupPage'
import { USER_ROLES } from '../types'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.SIGNUP} element={<SignupPage />} />

        <Route element={<ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]} />}>
          <Route element={<AdminLayout />}>
            <Route path={ROUTES.ADMIN} element={<AdminDashboardPage />} />
            <Route path={ROUTES.ADMIN_DASHBOARD} element={<Navigate to={ROUTES.ADMIN} replace />} />
          </Route>
        </Route>

        <Route element={<Layout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.RESTAURANTS} element={<RestaurantsPage />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
