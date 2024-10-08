// src/components/homepage/HomePage.jsx
import React from "react"; // Removed unused imports
import HeaderWrapper from "../../../components/header/HeaderWrapper";
import Test from "./components/test/Test";

function HomePage({ user, handleUserChange, handleLogout }) {
  return (
    <>
      <HeaderWrapper
        passLoggedIn={handleUserChange}
        passLogout={handleLogout}
        user={user}
      />
      <div
        style={{
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#273564",
        }}
      >
        <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
          <Test user={user} AIMode={false} />
        </div>
      </div>
    </>
  );
}

export default HomePage;
