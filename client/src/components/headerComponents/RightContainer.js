import React from 'react'
import ToBeDropped from './ToBeDropped'
import DropDownIcon from './DropDownIcon'
import LogOutDropDown from './LogOutDropDown'


export default function RightContainer({children}) {
    const totalNotifications = 7
    return (
      <ul className="navbar-nav ml-auto">
        {/* Notifications Dropdown Menu */}
        <DropDownIcon totalNotifications={totalNotifications}>
             <ToBeDropped totalNotifications={totalNotifications}/>
        </DropDownIcon>
        <LogOutDropDown />

      </ul>
    )
}
