import { Route, Routes } from 'react-router-dom'
import Login from './pages/authentication/Login'
import Registration from './pages/authentication/Registration'
import Forgot from './pages/authentication/Forgot'
import Dashboard from './pages/dashboard/Dashboard'
import Student from './pages/student/Student'
import Staff from './pages/staff/Staff'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/student" element={<Student />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/staff" element={<Staff />} />
    </Routes>
  )
}

export default AppRoutes
