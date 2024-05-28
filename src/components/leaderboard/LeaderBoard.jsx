import React from 'react';
import Header from '../header/Header';
import './LeaderBoard.css';



const mockData = [
  { name: 'Alan', wpm: 63.7 },
  { name: 'Beth', wpm: 59.4 },
  { name: 'Cathy', wpm: 57.2 },
  { name: 'David', wpm: 55.3 },
  { name: 'Eve', wpm: 52.6 },
];

function LeaderBoard() {
  return (
    <>
      <Header />
      <div className="leaderboard">
        <h1>leaderboard</h1>
        <ul className="leaderboard-list">
          {mockData.map((entry, index) => (
            <li key={index} className="leaderboard-item">
              {entry.name} - WPM: {entry.wpm}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default LeaderBoard;