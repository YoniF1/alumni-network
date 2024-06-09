import { useEffect, useState } from "react"
import axios from 'axios'
import { Avatar } from "@mui/material"

interface PostProfilePictureProps {
  userId: number;
}

const PostProfilePicture = ({ userId }: PostProfilePictureProps) => {
  const [profilePic, setProfilePic] = useState<string>('')

  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL + `/users/${userId}`)
        setProfilePic(response.data.profile_picture)
      } catch (error) {
        console.error('Failed to fetch profile picture:', error)
      }
    };

    if (userId) {
      fetchProfilePic();
    }
  }, [userId]);

  return profilePic ? (
    <Avatar alt="Profile Picture" src={profilePic} sx={{ width: 100, height: 100 }} />
  ) : null
}

export default PostProfilePicture
