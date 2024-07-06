import React, { useEffect, useState } from "react";
import Test from "./../home/homepage/components/test/Test";

function AITest({ user }) {
  // this is just used to make the <test> component work cuz i don't wanna rewrite the whole thing
  // to not use selectedDifficulty because the AI tests obviously won't be able to have chosen difficulty

  return (
    <>
      <div
        style={{
          padding: "20px",
          color: "white",
          fontSize: "2rem",
          backgroundColor: "#80C080",
        }}
      >
        <Test user={user} AIMode={true} />
      </div>
    </>
  );
}

export default AITest;
