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
              <FolderItem to={"/Orders"} text={"Orders"}/>
              <FolderItem to={"/Clients"} text={"Customers"}/>
              <FolderItem to={"/Products"} text={"Products"}/>
              <FolderItem to={"/NewOrder"} text="New Order" />
          </ Folder>
          <GroupTitle text="EXAMPLES" />
          <FolderItem to="/Orders" text="Widgets" icon="fas fa-th"/>

          <Folder text="Charts">
              <FolderItem to={"/Charts"} text={"Charts"}/>
              <FolderItem to={"/Charts"} text={"Charts"}/>
              <FolderItem to={"/Charts"} text={"Charts"}/>
          </ Folder>
        </ SideNavBar>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
}
