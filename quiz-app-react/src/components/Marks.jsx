import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
function Marks(props) {
  const { marks } = props.location.state;
  return (
    <div className="marks">
      <h2>You Got {marks} Marks</h2>
      {marks < 2 ? (
        <p>Better luck next time</p>
      ) : marks < 5 ? (
        <p>Need improvement</p>
      ) : marks < 8 ? (
        <p>Can be better</p>
      ) : (
        <p>Well Done</p>
      )}
      <Link to="/"><Button>Head back to Home?</Button></Link>
    </div>
  );
}

export default Marks;
