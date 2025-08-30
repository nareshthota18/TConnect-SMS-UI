import { Route, Routes } from 'react-router-dom'
import Login from './pages/authentication/Login'
import Registration from './pages/authentication/Registration'
import Forgot from './pages/authentication/Forgot'
import AdminDashboard from './pages/admin/AdminDashboard'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  )
}

export default AppRoutes
