// HeaderWrapper.js
import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
function HeaderWrapper({ passLoggedIn, passLogout, user }) {
  const location = useLocation();
  const isAIMode = location.pathname === "/ai-test";

  return (
    <Header
      passLoggedIn={passLoggedIn}
      passLogout={passLogout}
      user={user}
      AIMode={isAIMode}
    />
  );
}

export default HeaderWrapper;
