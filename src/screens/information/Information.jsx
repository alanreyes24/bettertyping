import React from "react";
import HeaderWrapper from "../../components/header/HeaderWrapper";

function Information({ user, handleUserChange, handleLogout }) {
  return (
    <>
      <HeaderWrapper
        passLoggedIn={handleUserChange}
        passLogout={handleLogout}
        user={user}
      />

      <div>
        {" "}
        A personal project collaborated on with Miles Oncken and Alan Reyes.
        bettertyping is a minimalistic and customizable aesthetic typing test
        website. It features many different test modes, the ability to view your
        test history, and display your individual test data with graphs.{" "}
      </div>
    </>
  );
}

export default Information;
