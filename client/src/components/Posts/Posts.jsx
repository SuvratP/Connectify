import React, { useEffect } from 'react'
import './Posts.css'
import Post from '../Post/Post'
import {useDispatch,useSelector} from 'react-redux'
import { getTimelinePosts } from '../../actions/postAction'
const Posts = () => {
  // const params = useParams()
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.authReducer.authData);
  const {posts, loading} = useSelector((state) => state.postReducer);
  useEffect(() => {
    // Example code (assuming posts is an array of objects)

    dispatch(getTimelinePosts(user._id));
  }, [dispatch , user]);
  if(!posts) return 'No Posts';
  // if(params.id) posts = posts.filter((post)=> post.userId===params.id)
  return (
    <div className="Posts">
      {console.log(posts)}
        {loading ? "Fetching Posts..." : posts.map((post, id)=>{
            return <Post key={id} data={post} id={id}/>
        })}
    </div>
  )
}

export default Posts

