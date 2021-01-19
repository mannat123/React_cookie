import React, { Component } from "react";
import {BrowserRouter,Route,Switch} from "react-router-dom";
import SignUp from "./Components/SignUp.jsx";
import Login from "./Components/Login.jsx";
import Users from "./Components/Users.jsx";


export default class App extends Component {
 
  render() {
    return (
      <BrowserRouter>
        <Switch>
            <Route path="/Login" exact component={Login}/>
            <Route path="/" exact component={SignUp}/>
            <Route path="/Users" exact component={Users}/>
        </Switch>    
       </BrowserRouter>     
    );
  }
}
