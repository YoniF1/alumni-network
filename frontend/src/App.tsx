import { Routes, Route } from 'react-router-dom';
import LoginRegister from './components/LoginRegister.tsx'
import Logout from './components/Logout.tsx';
import Nav from './components/Nav.tsx';
import Auth from './components/auth/Auth.tsx';
import Home from './components/Home.tsx';
import { createContext, useState } from 'react'
import './App.css'
import { AuthContextType, UserInterface } from './types/consts'
import UserDetailsForm from './components/userDetails/UserDetailsForm.tsx';


const initialValue = {
  user: null,
  setUser: () => {}
}

export const AuthContext = createContext<AuthContextType>(initialValue)

function App() {
    const [user, setUser] = useState<UserInterface | null>(null)

    return (
      <AuthContext.Provider value={{user, setUser}}>
          <Nav/>
          <div>
            <Routes>
              <Route path='/login' element={<LoginRegister page={"Login"}/>}/>
              <Route path='/register' element={<LoginRegister page={"Register"}/>}/>
              <Route path='/logout' element={<Logout/>}/>
              <Route path='/home' element={<Auth><Home><UserDetailsForm/></Home></Auth>}/>
            </Routes>
          </div>
      </AuthContext.Provider>
    )
  }
export default App
