import React from "react";
import LeftLink from './headerComponents/LeftLink'
import LeftContainer from './headerComponents/LeftContainer'
import ToBeDropped from './headerComponents/ToBeDropped'
import RightContainer from './headerComponents/RightContainer'



export default function Header() {
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
