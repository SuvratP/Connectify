import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { followUser, unfollowUser } from '../../actions/userAction';

const User = ({ person }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );
  const dispatch = useDispatch();

  const handleFollow = () => {
    if (following) {
      dispatch(unfollowUser(person._id, user));
    } else {
      dispatch(followUser(person._id, user));
    }
    setFollowing((prev) => !prev);
  };

  return (
    <div className="follower">
      <div>
        <img src={person.profilePicture} alt="" className="followerImage" />
        <div className="name">
          <span>{person.firstname}</span>
          <span>{person.username}</span>
        </div>
      </div>
      <button
        className={
          following ? 'button fc-button UnfollowButton' : 'button fc-button'
        }
        onClick={handleFollow}
      >
        {following ? 'Unfollow' : 'Follow'}
      </button>
    </div>
  );
};

export default User;
