import PostList from "./PostList"
import './Posts.css'

const Posts = ({cohortName}: {cohortName:string}) => {
  return (
    <>  
        <div className='container'>
          <h1>{cohortName}</h1>
          <PostList/>
        </div>
   
    </>
  )
}

export default Posts