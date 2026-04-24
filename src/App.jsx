import { useEffect, useState } from 'react'
import About from './About'
import Address from './Address'
import Custdetails from './Custdetails'
import Login from './Login'

const PAGE_KEY = 'mp-const-active-page'
const USER_KEY = 'mp-const-auth-user'
const VALID_PAGES = new Set(['login', 'about', 'custdetails', 'address'])

function getInitialPage() {
  const savedPage = window.sessionStorage.getItem(PAGE_KEY)
  return VALID_PAGES.has(savedPage) ? savedPage : 'login'
}

function getInitialUser() {
  const raw = window.sessionStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function App() {
  const [page, setPage] = useState(getInitialPage)
  const [user, setUser] = useState(getInitialUser)

  useEffect(() => {
    window.sessionStorage.setItem(PAGE_KEY, page)
  }, [page])

  useEffect(() => {
    if (!user) {
      window.sessionStorage.removeItem(USER_KEY)
      return
    }
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user))
  }, [user])

  const handleLogout = () => {
    window.sessionStorage.removeItem(PAGE_KEY)
    window.sessionStorage.removeItem(USER_KEY)
    window.sessionStorage.removeItem('mp-const-about-view')
    window.sessionStorage.removeItem('mp-const-about-selected-lead')
    setUser(null)
    setPage('login')
  }

  if (page === 'about') {
    return (
      <About
        currentUser={user}
        onBackToLogin={handleLogout}
        onOpenCustdetails={() => setPage('custdetails')}
        onOpenAddress={() => setPage('address')}
      />
    )
  }

  if (page === 'custdetails') {
    return <Custdetails onClose={() => setPage('about')} />
  }

  if (page === 'address') {
    return <Address onClose={() => setPage('about')} />
  }

  return (
    <Login
      onSignIn={(loginUser) => {
        setUser(loginUser)
        setPage('about')
      }}
    />
  )
}

export default App
