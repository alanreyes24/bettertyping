import React, { useEffect, useState } from "react";
import axios from "axios";

function History() {

    const [allUserTests, setAllUserTests] = useState([]);

    async function retrieveAllTestsByUser() {

        try {

            let response = await axios.get('http://localhost:3090/test/allByUser', {
                withCredentials: true
            });

            setAllUserTests(response.data);


        } catch (error) {
            console.log(error)
        }


    }

    useEffect(() => {
        retrieveAllTestsByUser();
    })



    return(
        <>
            <div> Your History </div>

            {allUserTests.map((test, index) => (
                <div key={index} className='leaderboard-item'>
                  <div style={{ display: "flex", flex: 1, textAlign: "center" }}>
                    {index + 1}:
                    <div style={{ marginLeft: "0.25rem" }}>{test.username}</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    true WPM: {test.results.trueWPM}
                  </div>
                  <div style={{ textAlign: "center" }}>
                    accuracy: {test.results.accuracy}
                  </div>
                </div>
              ))}



        </>
    )

}

export default History;