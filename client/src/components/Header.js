import React from "react";
import LeftLink from './headerComponents/LeftLink'
import LeftContainer from './headerComponents/LeftContainer'
import RightContainer from './headerComponents/RightContainer'
import {connect} from 'react-redux'


function Header() {

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* Left navbar links */}
      <LeftContainer>
        <LeftLink href="index.html" text="Home" />
        <LeftLink href="#" text="Contact" />
      </LeftContainer>
      {/* Right navbar links */}
      <RightContainer>
    
      </RightContainer>
    </nav>
  );
}

const URL = process.env.URL || 'http://localhost:3000/'

const connectedHeader = connect(state => ({state:state}), ()=>({}))(Header)

export default connectedHeader;