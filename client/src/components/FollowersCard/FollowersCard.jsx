// import React from 'react'
// import './FollowersCard.css'

// import { Followers } from '../../Data/FollowersData'
// const FollowersCard = () => {
//   return (
    
//     <div className="FollowersCard">
// <h3>Who is following you</h3>
//    </div>

//         {Followers. map((follower, id)=>{
//             return(
//                 <div className="follower">
//                     <div>
//                         <img src={follower.img} alt="" className='followerImage' />
//                         <div className="name">
//                             <span>{follower.name}</span>
//                             <span>@{follower.username}</span>
//                         </div>
//                     </div>
//                     <button className='button fc-button'>
//                         Follow
//                     </button>
//                 </div>
//             )
//         })}
//     </div>
//   )
// }

// export default FollowersCard

import React, { useEffect, useState } from 'react'
import './FollowersCard.css'
import { Followers } from '../../Data/FollowersData'
import User from "../User/User";
import { useSelector } from "react-redux";
import { getAllUser } from '../../api/UserRequest';


const FollowersCard = () => {
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);


  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data)
       console.log(data)
    };
    fetchPersons()
  },[])
  return (
    <div className="FollowersCard">
        <h3>People you may know</h3>

        {Followers.map((person, id)=>{
            return(
                <User person={person} key={id} />
            )
        })}
    </div>
  )
}

export default FollowersCard

