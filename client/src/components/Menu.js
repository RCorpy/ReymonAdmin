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
          <FolderItem to={"/NewOrder"} text="New Order" icon="fas fa-file-signature" />
          <GroupTitle text="DASHBOARDS" />
          <Folder text="Dashboard" icon="fas fa-th"> {/*spanText="hello"*/}
              <FolderItem to={"/Orders"} text={"Orders"} icon="fas fa-money-bill-wave-alt"/>
              <FolderItem to={"/Clients"} text={"Customers"} icon="fas fa-user-edit"/>
              {/*<FolderItem to={"/Products"} text={"Products"}/>*/}
              
          </ Folder>

          <Folder text="Charts" icon="fas fa-chart-line">
              <FolderItem to={"/Charts"} text={"Charts"} icon="fas fa-chart-pie"/>
              <FolderItem to={"/Charts"} text={"Charts"} icon="fas fa-chart-bar"/>
              <FolderItem to={"/Charts"} text={"Charts"} icon="fas fa-chart-area"/>
          </ Folder>
        </ SideNavBar>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
}
