import { useState, useEffect } from 'react'
import { BrowserRouter as Router, useLocation } from 'react-router-dom'
import { ConfigProvider, theme as antdTheme } from 'antd'
import { lightTheme, darkTheme } from './theme/themeConfig'
import AppRoutes from './AppRoutes'
import Header from './components/Header'
import Footer from './components/Footer'

const AppLayout = ({ darkMode, toggleTheme }: { darkMode: boolean; toggleTheme: () => void }) => {
  const location = useLocation()
  const hideLayout = ['/', '/registration', '/forgot'].includes(location.pathname)

  return (
    <>
      {!hideLayout && <Header darkMode={darkMode} toggleTheme={toggleTheme} />}
      <AppRoutes />
      {!hideLayout && <Footer />}
    </>
  )
}

const App = () => {
  const [darkMode, setDarkMode] = useState(false)

  // ✅ Load theme from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem('darkMode')
    if (storedTheme) {
      setDarkMode(storedTheme === 'true')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !darkMode
    setDarkMode(newTheme)
    localStorage.setItem('darkMode', String(newTheme)) // ✅ Save to localStorage
  }

  return (
    <ConfigProvider
      theme={
        darkMode
          ? { ...darkTheme, algorithm: antdTheme.darkAlgorithm }
          : { ...lightTheme, algorithm: antdTheme.defaultAlgorithm }
      }
    >
      <Router>
        <AppLayout darkMode={darkMode} toggleTheme={toggleTheme} />
      </Router>
    </ConfigProvider>
  )
}

export default App
