import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import QuizCard from "./QuizCard";
import axios from "axios";
import { Route} from "react-router-dom";
import Quiz from "./Quiz";
function GameCards(props) {
 
  return (
    <div className="grid">
      <h2>Select a quiz to start</h2>
      <Grid container spacing={3} justify="space-evenly">
        {props.quizes.map((quiz, index) => {
          const { title, _id ,questions} = quiz;
          return (
            <QuizCard key={_id} title={title} id={_id} questions={questions}/>
          );
        })}
      </Grid>
    </div>
  );
}
export default GameCards;
