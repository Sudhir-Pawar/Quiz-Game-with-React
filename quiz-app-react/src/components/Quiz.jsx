import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
import { Redirect } from "react-router-dom";


const root = {
  width: "200%",
  maxWidth: 500,
  margin: "50px auto",
};
const color = {
  backgroundColor: "#005082",
};

function Quiz(props) {
  const [quizInfo, setQuizInfo] = useState({
    marks: 0,
    currentQ: 0,
    length: props.location.state.questions.length,
    question:props.location.state.questions[0]
  });
  console.log(quizInfo);
  // const [question, setQuestion] = useState(props.location.state.questions[0]);

  function getNextQuestion(ans) {
    const { id } = props.location.state;
    const { _id: questionId } = quizInfo.question;
    axios
      .get(
        "http://localhost:9000/quiz/quizId/" + id + "/question/" + questionId
      )
      .then((res) => {
        const correctAns = res.data;
        if (correctAns.correct === ans) {
          setQuizInfo(prev=>{
            return {
              ...prev,
              marks:prev.marks+1,
            }
          })
        }
        console.log(quizInfo.currentQ +" "+ quizInfo.length);
        if(quizInfo.currentQ+1 < quizInfo.length){
          
          setQuizInfo(prev=>{
            return {
              ...prev,
              currentQ:prev.currentQ+1,
              question:props.location.state.questions[prev.currentQ+1]
            }
          })
        }
        else{
          props.history.push({pathname:"/marks",state:{marks:quizInfo.marks}});
        }
      });
      
  }

  return (
    <div className="quizQuestions">
      <h3>{quizInfo.question.question}</h3>
      <List component="nav" aria-label="mailbox folders" style={root}>
        <Divider />
        <ListItem
          button
          style={color}
          onClick={() => {
            getNextQuestion(0);
          }}
        >
          <ListItemText primary={quizInfo.question.options[0]} />
        </ListItem>
        <Divider />
        <ListItem
          button
          divider
          style={color}
          onClick={() => {
            getNextQuestion(1);
          }}
        >
          <ListItemText primary={quizInfo.question.options[1]} />
        </ListItem>
        <ListItem
          button
          style={color}
          onClick={() => {
            getNextQuestion(2);
          }}
        >
          <ListItemText primary={quizInfo.question.options[2]} />
        </ListItem>
        <Divider light />
        <ListItem
          button
          style={color}
          onClick={() => {
            getNextQuestion(3);
          }}
        >
          <ListItemText primary={quizInfo.question.options[3]} />
        </ListItem>
        <Divider />
      </List>
    </div>
  );
}

export default Quiz;
