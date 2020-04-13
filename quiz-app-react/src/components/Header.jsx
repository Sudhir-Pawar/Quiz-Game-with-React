import React, { useState } from "react";
import Gamecards from './Gamecards';
import axios from "axios";
function Header() {
  const [isClicked, setIsClicked] = useState(false);
  const [quizes, setQuizes] = useState([]);
  function handleClick() {
    setIsClicked(true);
    axios.get("http://localhost:9000/quiz").then((res) => {
      const quizes = res.data;
      setQuizes(quizes);
    });
  }

  return (
    <div className="heading">
      <h1>Quiz Game</h1>
      {!isClicked ? (
        <p onClick={handleClick}>Click here to start</p>
      ) :  <Gamecards quizes={quizes}/>
      }
    </div>
  );
}
export default Header;
