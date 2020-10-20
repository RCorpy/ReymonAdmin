import React from "react";
import Logo from './menuComponents/Logo'
import User from './menuComponents/User'
import FolderItem from './menuComponents/FolderItem'
import Folder from './menuComponents/Folder'
import GroupTitle from './menuComponents/GroupTitle'
import SideNavBar from './menuComponents/SideNavBar'


export default function Menu() {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <Logo to={"/"} src={"/dist/img/AdminLTELogo.png"} text={"R-Admin"}/>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <User src={"/dist/img/user2-160x160.jpg"} name={"Reymon"} to="/RR" />
        {/* Sidebar Menu */}
        <SideNavBar>
          <Folder text="Dashboard" spanText="hello">
              <FolderItem to={"/"} text={"first Dash"}/>
              <FolderItem to={"/"} text={"second Dash"}/>
              <FolderItem to={"/"} text={"third Dash"}/>
          </ Folder>
          <GroupTitle text="EXAMPLES" />
          <FolderItem to="/RR" text="Widgets" icon="fas fa-th"/>

          <Folder text="Charts">
              <FolderItem to={"/Charts"} text={"first Dash"}/>
              <FolderItem to={"/Charts"} text={"second Dash"}/>
              <FolderItem to={"/Charts"} text={"third Dash"}/>
          </ Folder>
        </ SideNavBar>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
}
