import { Routes, Route, Navigate } from 'react-router-dom'
import LoginRegister from './components/LoginRegister.tsx'
import Logout from './components/Logout.tsx'
import Nav from './components/Nav.tsx'
import Auth from './components/auth/Auth.tsx'
import Home from './components/Home.tsx'
import Admin from './components/admin/Admin.tsx'
import { createContext, useState } from 'react'
import './App.css'
import { AuthContextType, UserInterface } from './types/consts'
import UserDetailsForm from './components/userDetails/UserDetailsForm.tsx'
import { useEffect } from 'react'

const initialValue = {
  user: null,
  setUser: () => {},
  token: null,
  setToken: () => {}
}

export const AuthContext = createContext<AuthContextType>(initialValue)

function App() {
    const [user, setUser] = useState<UserInterface | null>(null)
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
      const storedToken = localStorage.getItem('token')
      const storedUser = localStorage.getItem('user')
  
      if (storedToken) {
        setToken(storedToken)
      }
  
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    }, []);
  
    return (
      <AuthContext.Provider value={{ user, setUser, token, setToken }}>
          <Nav/>
          <div>
            <Routes>
              <Route path='/login' element={<LoginRegister page={"Login"}/>}/>
              <Route path='/register' element={<LoginRegister page={"Register"}/>}/>
              <Route path='/logout' element={<Logout/>}/>
              <Route path='/home' element={<Auth><Home><UserDetailsForm/></Home></Auth>}/>
              <Route path='/admin' element={<Auth>{user && user.isadmin ? <Admin /> : <Navigate to="/login"/>}</Auth>}/>
            </Routes>
          </div>
      </AuthContext.Provider>
    )
  }
export default App
