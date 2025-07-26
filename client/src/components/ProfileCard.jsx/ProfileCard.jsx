import React from "react";
import "./ProfileCard.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfileCard = () => {
  const { user } = useSelector((state) => state.authReducer.authData);

  const serverPublic = "https://your-cloudinary-url.com/"; // Or your base path

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img
          src={user.coverPicture || serverPublic + "defaultCover.jpg"}
          alt="Cover"
          className="cover-img"
        />
        <img
          src={user.profilePicture || serverPublic + "defaultProfile.png"}
          alt="Profile"
          className="profile-img"
        />
      </div>

      <div className="ProfileName">
      <span>{user.firstname} {user.lastname}</span>

  {/* Add more profile details conditionally */}
  {user.worksAt && <span>Works at {user.worksAt}</span>}
  {/* {user.livesin && <span>Lives in {user.livesin}</span>}
  {user.country && <span>From {user.country}</span>}
  {user.relationship && <span>Relationship: {user.relationship}</span>} */}

  {/* Optional fallback if nothing is provided */}
  {!user.worksAt && !user.livesin && !user.country && !user.relationship && (
    <span>Add your bio</span>
  )}
</div>


      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.followers?.length || 0}</span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.following?.length || 0}</span>
            <span>Following</span>
          </div>
        </div>
        <hr />
      </div>

      {/* Fix here: Make sure you use Link or navigate */}
      <Link to={`/profile/${user._id}`} className="myProfile">
        My Profile
      </Link>
    </div>
  );
};

export default ProfileCard;
