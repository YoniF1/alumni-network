
import { useState, useContext } from 'react';
import { Stack, Box, FormControl, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Textarea } from '@mui/joy';
import { AuthContext } from '../../App';
import axios from 'axios';
import { useSetProfilePicture,useUpdateUserProfilePicAndBiography, useAddBiography, useBiography } from './hooks';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

const Biography = () => {
  const { user } = useContext(AuthContext);
  const setProfilePictureUrlHook = useSetProfilePicture()
  const updateProfilePicAndBioHook = useUpdateUserProfilePicAndBiography()
  const addBiographyHook = useAddBiography()
  const biography = useBiography()
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicture(file);
    } else {
      setProfilePicture(null); 
    }
  };

  const handleSubmit = async () => {
    if (!profilePicture) return;

    const formData = new FormData();
    formData.append('profilePicture', profilePicture);

    try {
      const uploadResponse = await axios.post(import.meta.env.BACKEND_URL + '/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if(user) {
        updateProfilePicAndBioHook(user?.id, uploadResponse.data.url, biography, 3 ) // check this
      }

      setProfilePictureUrlHook(uploadResponse.data.url)

      if (!user?.id) {
        console.error('User is missing, cannot update profile');
        return; 
      }


      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile', error);
      alert('Failed to update profile');
    }
  };

  return (
    <>
    <Stack spacing={10} sx={{ width: '50vw' }}>
      <Typography variant="h2">Update your biography and profile picture</Typography>
      <Box>
        <FormControl fullWidth>
          <Textarea
            placeholder="Type in here..."
            variant='outlined'
            value={biography}
            onChange={(e) => addBiographyHook(e.target.value)}
            size='lg'
            minRows={6}
            style={{ width: '100%', padding: '10px' }}
          />
        </FormControl>
        <Button component="label" variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}>
            Upload file
            <VisuallyHiddenInput type="file" name="profilePicture" onChange={handleFileChange} />
        </Button>
        {profilePicture ? profilePicture.name : null}
      </Box>
      <Button variant='contained' sx={{ width: '20vw' }} onClick={handleSubmit}>
        Update Profile
      </Button>
    </Stack>
  </>
  );
};

export default Biography;
