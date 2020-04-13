import React, { useState } from 'react';
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

function QuizCard(props){

    return (
        <Grid item xs={3}>
          <div className="gamecard">
            <p>{props.title}</p>
            {console.log(props.questions)}
            <Link to={{pathname:"/quiz",state:{questions: props.questions,id: props.id}}} ><Button variant="contained">Start</Button></Link>
          </div>
        </Grid>
    );

}
export default QuizCard;