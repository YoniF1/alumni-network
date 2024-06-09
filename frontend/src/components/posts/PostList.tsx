import { Grid, Paper, Stack } from '@mui/material';
import PostProfilePicture from './PostProfilePicture'
import PostInput from './PostInput'
import { useFetchCohortPosts, usePosts, useCohortId } from './hooks'
import { useEffect } from 'react'

const PostList = () => {
  const fetchCohortPosts = useFetchCohortPosts()
  const cohortPosts = usePosts()
  const cohortId = useCohortId()

  useEffect(() => {
    if (cohortId) {
      fetchCohortPosts(cohortId)
    }
  }, [cohortId, fetchCohortPosts])

  return (
    <>
          <Stack sx={{ display: 'flex', flexDirection: 'column' }}>
          <PostInput />
          {cohortPosts.slice().reverse().map((post) => (
          <Paper key={post.id} style={{ padding: "40px 20px", margin: "20px 0" }}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid>
                <PostProfilePicture userId={post.user_id} />
              </Grid>
              <Grid justifyContent="left" item xs zeroMinWidth>
                <h3 style={{ margin: 0, textAlign: "left" }}>{post.first_name} {post.last_name}</h3>
                <h4 style={{ textAlign: "left" }}>{post.title}</h4>
                <h1 style={{ textAlign: "left" }}>{post.content}</h1>
                <p style={{ textAlign: "left", color: "gray" }}>posted {new Date(post.created_at).toLocaleString()}</p>
              </Grid>
            </Grid>
          </Paper>
          ))}
          </Stack>
    </>
  );
}

export default PostList