import React from 'react'
import { FaCarRear } from "react-icons/fa6";

function BurgerIcon({toggleSidebar}) {
  return (
    <div>
    
     <FaCarRear ClassName="burger-icon" onClick={toggleSidebar} size={30} />
    </div>
  )
}

export default BurgerIcon