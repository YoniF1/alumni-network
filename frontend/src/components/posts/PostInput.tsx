import { Typography, FormControl, Button } from '@mui/material'
import { Textarea } from '@mui/joy';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../App';
import { useFetchCohortFromUser, useAddPostToCohort, useCohortId, useFetchCohortPosts } from './hooks';
import { PostAndUserDetails } from '../../types/consts';
import { useCallback } from 'react';

const PostInput = () => {
    const { user } = useContext(AuthContext)
    const fetchCohortFromUser = useFetchCohortFromUser()
    const cohortId = useCohortId();
    const addPostToCohort = useAddPostToCohort();
    const [postTitle, setPostTitle] = useState('')
    const [postContent, setPostContent] = useState('');
    const fetchCohortPosts = useFetchCohortPosts();

    const fetchCohortData = useCallback(async () => {
      if (user) {
          try {
              await fetchCohortFromUser(user.id)
          } catch (error) {
              console.error('Failed to fetch cohort data:', error)
          }
      }
  }, [fetchCohortFromUser, user])

  useEffect(() => {
      fetchCohortData();
  }, [fetchCohortData]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      if (cohortId !== null && user) {
          const postDetails: PostAndUserDetails = {
              id: null,
              content: postContent,
              title: postTitle,
              user_id: user.id,
              cohort: cohortId,
              created_at: new Date(),
              first_name: user.first_name,
              last_name: user.last_name
          };

            addPostToCohort({ cohortId, post: postDetails });
            setPostTitle('');
            setPostContent('');

            fetchCohortPosts(cohortId);
      } else {
          console.error('Cohort ID or User is not available');
      }
  };
  

    return (
    <div>
      <Typography variant="h4">What's on your mind?</Typography>

      <FormControl fullWidth onSubmit={handleSubmit} component="form">
        <Textarea
          placeholder="Your title"
          variant='outlined'
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          size='lg'
          minRows={1}
          style={{ width: '100%', padding: '10px' }}
        />
        <Textarea
          placeholder="Your content"
          variant='outlined'
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          size='lg'
          minRows={3}
          style={{ width: '100%', padding: '10px' }}
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginBottom: '10px' }}>
          Post
        </Button>
      </FormControl>
    </div>
  );
}


// const MemoizedTaskInput = memo(TasksInput)

export default PostInput