import React from 'react';
import Header from './components/Header'
import {BrowserRouter as Router,Switch,Route,Link, Redirect} from 'react-router-dom';
import Quiz from './components/Quiz';
import NotFound from './components/NotFound';
import Marks from './components/Marks';

export default function App(){
    return (
        <Router >
            <Switch>
                <Route exact path="/" component={Header}></Route>
                <Route exact path="/quiz" component={Quiz}></Route>
                <Route exat path="/marks" component={Marks}></Route>
                <Route path="/404" component={NotFound}></Route>
                <Redirect to="/404"></Redirect>
            </Switch>
        </Router>
    );
};