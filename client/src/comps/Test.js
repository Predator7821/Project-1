import React from 'react'
import { actors } from '../data/Users'
const Test = () => {
  return (
    <>
    {actors.map((item)=>{
      return(
        <div>
          <span>
          {item.name.first_name+item.name.last_name}
        </span>
        <span>{item.dob.date+item.dob.location}</span>
        <img src={item.picture} alt=''/>
        <span>{item.biography}</span>
        </div>
        
      )
    })}
    </>
  )
}

export default Test