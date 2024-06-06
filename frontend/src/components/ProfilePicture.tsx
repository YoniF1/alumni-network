import { useEffect, useContext, useState } from "react"
import axios from 'axios'
import { AuthContext } from "../App"

const ProfilePicture = () => {
  const { user } = useContext(AuthContext)
  const [profilePic, setProfilePic] = useState<string>('')
  
  const fetchProfilePic = async() => {
    const response = await axios.get(`http://localhost:3000/users/${user?.id}`)
    console.log(response.data)
    setProfilePic(response.data.profile_picture)
  }

  useEffect(() => {
    fetchProfilePic()
  }, [profilePic])  

  return (
        <img src={profilePic} style={{ width: '150px', height: '150px' }} alt="Profile Picture" />
  )
}

export default ProfilePicture