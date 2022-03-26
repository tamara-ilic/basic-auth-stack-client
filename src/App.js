import './App.css'
import { useEffect, useState } from 'react'
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'

import LandingPage from './components/LandingPage'
import Register from './components/Register'
import Login from './components/Login'
import LoggedInArea from './components/LoggedInArea'

function App() {
  const [user, setUser] = useState(null)
  let navigate = useNavigate()

  useEffect(() => {
    const jwt = localStorage["user-jwt"]
    if (jwt) {
        fetch("http://localhost:8080/users/me", {
        headers: {
          Authorization: `Bearer ${JSON.parse(jwt)}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          if (data.success) {
            setUser(data.data)
            console.log(data.data)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user-jwt')
    setUser(null)
    navigate('/')
  }

  return (
    <div className="App">
      <header>
        <span>{user ? `Welcome back ${user.name}` : 'welcome'}</span>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/register'>Register</NavLink>
        {user ? <button className='button-logout' onClick={handleLogout}>Logout</button> : <NavLink to='/login'>Login</NavLink>}
        <NavLink to='/my-feed'>The Feed</NavLink>
    </header>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/register' element={<Register setUser={setUser}/>} />
        <Route path='/login' element={<Login setUser={setUser}/>} />
        <Route path='/my-feed' element={<LoggedInArea user={user}/>} />
      </Routes>
    </div>
  )
}

export default App
