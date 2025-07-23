import React from 'react'

const user = ({person}) => {
  return (
    <div className="follower">
    <div>
        <img src={person.img} alt="" className='followerImage' />
        <div className="name">
            <span>{person.name}</span>
            <span>@{person.username}</span>
        </div>
    </div>
    <button className='button fc-button'>
        Follow
    </button>
</div>
    
  )
}

export default user