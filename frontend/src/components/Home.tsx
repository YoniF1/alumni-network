
import { useContext, useEffect } from 'react';
import { AuthContext } from '../App';
import { HomeProps } from '../types/consts';
import ProfilePicture from './ProfilePicture';
import './Home.css'
import { useProfilePic } from './userDetails/hooks';

const Home = ({children}: HomeProps) => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className='container_title_items'>
        <div className='title'>
          {user ? (
            <h2>Welcome, {user.first_name} {user.last_name}</h2>
          ) : (
            <h2>No user logged in</h2>
          )}
        </div>
        <div className='profile_pic'>
           <ProfilePicture/>
        </div>
      </div>
   
      <div className='container'>
        {children}
      </div>  
    </>
  );
};

export default Home;