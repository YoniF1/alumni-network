import { useEffect, useContext, useState } from "react"
import axios from 'axios'
import { AuthContext } from "../App"
import { Avatar } from "@mui/material"

const ProfilePicture = () => {
  const { user } = useContext(AuthContext)
  const [profilePic, setProfilePic] = useState<string>('')
  
  const fetchProfilePic = async() => {
    const response = await axios.get(import.meta.env.VITE_BACKEND_URL + `/users/${user?.id}`)
    console.log(response.data)
    setProfilePic(response.data.profile_picture)
  }

  useEffect(() => {
    fetchProfilePic()
  }, [profilePic])  

  return (
    <Avatar alt="Profile Picture" src={profilePic} sx={{ width: 150, height: 150 }}/>
  )
}

export default ProfilePicture