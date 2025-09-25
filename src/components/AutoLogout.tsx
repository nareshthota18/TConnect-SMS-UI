// utils/autoLogout.ts
import { NavigateFunction } from 'react-router-dom'

export const autoLogout = (navigate: NavigateFunction) => {
  const tokenExpires = localStorage.getItem('tokenExpires')
  if (!tokenExpires) return

  const expiryTime = new Date(tokenExpires).getTime()
  const currentTime = new Date().getTime()
  const timeout = expiryTime - currentTime

  if (timeout <= 0) {
    localStorage.removeItem("authToken");
    navigate('/')
    alert('Session expired. You have been logged out.1')
    return
  }

  setTimeout(() => {
    localStorage.removeItem("authToken");
    navigate('/')
    alert('Session expired. You have been logged out.2')
  }, timeout)
}
