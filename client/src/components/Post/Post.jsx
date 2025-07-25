import React, { useState } from 'react';
import './Post.css';
import Comment from '../../img/comment.png';
import Share from '../../img/share.png';
import Heart from '../../img/like.png';
import NotLike from '../../img/notlike.png';
import { useSelector } from 'react-redux';
import { likePost } from '../../api/PostRequest';

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);

  const [liked, setLiked] = useState(
    Array.isArray(data.likes) ? data.likes.includes(user._id) : false
  );

  const [likes, setLikes] = useState(
    Array.isArray(data.likes) ? data.likes.length : 0
  );

  const handleLike = () => {
    setLiked((prev) => !prev);
    likePost(data._id, user._id);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  return (
    <div className="Post">
      {/* Render image from Cloudinary directly */}
      <img
        src={data.image ? data.image : 'https://via.placeholder.com/400x300?text=No+Image'}
        alt="Post"
      />

      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt="like"
          style={{ cursor: 'pointer' }}
          onClick={handleLike}
        />
        <img src={Comment} alt="comment" />
        <img src={Share} alt="share" />
      </div>

      <span style={{ color: 'var(--gray)', fontSize: '12px' }}>{likes} likes</span>

      <div className="detail">
        <span><b>{data.name}</b></span>
        <span> {data.desc}</span>
      </div>
    </div>
  );
};

export default Post;
