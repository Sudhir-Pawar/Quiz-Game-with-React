const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const port = 9000;

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb://localhost:27017/QuizQuestionDB",
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err) {
    err ? console.log(err) : console.log("Connected to database");
  }
);
//Quiz Database Schemas
const QuestionsSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    min: 4,
    max: 4,
    required: true,
  },
  correct: {
    type: Number,
    required: true,
  },
});
const QuizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: {
    type: [QuestionsSchema],
  },
});
//Quiz model
const Quiz = new mongoose.model("quiz", QuizSchema);

app.post("/quiz", (req, res) => {
  const { title, questions } = req.body;
  const newQuiz = new Quiz({
    title: title,
    questions: questions,
  });
  newQuiz.save((err) => err && console.log(err));
  res.send("data saved");
});

app.get("/quiz/quizName/:quizName",(req, res) => {
  console.log(req);
  const quizName = req.params.quizName;
  console.log(quizName);
  Quiz.findOne({ title: quizName }, {_id:1,title : 1,'questions.question':1,'questions.options':1},(err, foundQuiz) => {
    err ? res.send(err) : foundQuiz && res.send(foundQuiz);
  });
});
app.get("/quiz/quizID/:id", (req, res) => {
  // console.log(req);
  
  const id = req.params.id;
  console.log(id);
  Quiz.findOne({_id:id }, {_id:1,title : 1,'questions.question':1,'questions.options':1},(err, foundQuiz) => {
    err ? res.send(err) : foundQuiz && res.send(foundQuiz);
  });
});
app.get("/quiz/quizId/:id/question/:questionId",(req,res)=>{
  const {id,questionId}=req.params;
  let correctAns=null;
  Quiz.findById(id,function(err,found){
      if(err){
        res.send(err);
      }
      else{
        if(found){
         found.questions.forEach(element => {
           const {_id,correct}=element;
           if(_id==questionId){
              res.send({correct:correct})
            }
         });
        }
      }
  });
});
app.get("/quiz", (req, res) => {
  Quiz.find({},{'questions.correct':0} ,function (err, foundQuizes) {
    err ? res.send(err) : foundQuizes && res.send(foundQuizes);
  });
});
app.listen(port, function (err) {
  err ? console.log(err) : console.log("server started on port " + port);
});

