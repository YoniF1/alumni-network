import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../App'

const Logout = () => {
  const navigate = useNavigate()
  const { setUser } = useContext(AuthContext)

  useEffect(() => {
    logoutUser()
    setUser(null)
  }, [])

  const logoutUser = async() => {
    try {
        await axios.post(import.meta.env.VITE_BACKEND_URL + '/logout', null, { withCredentials: true})
        navigate('/login')
    } catch (error) {
        console.log('logging out', error)
    }
  }

  return null
}

export default Logout