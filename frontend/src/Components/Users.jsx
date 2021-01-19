import React,{Component} from 'react';
import { getCookie,expireCookie, isLoggedIn } from '../Auth';
import {Redirect} from "react-router-dom";
import "./Formstyles.css";

class Users extends Component{

    state={
        id:"",
        name:"",
        email:"",
        userLoggedIn:false,
        clicked:false,
        users:[],
        usersClicked:false
    }

    checkAuth = () => {
        console.log("IsLoggedIn", isLoggedIn());
        if (isLoggedIn()) {
            this.setState({
                userLoggedIn:true
            });
        }
    };

    componentDidMount(){
        this.checkAuth();
    }

    handleClick = ()=>{
        fetch('http://localhost:8000/api/profile', 
        { 
        method: 'GET',
        headers: { 
            
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'bearer ' + getCookie("token"),
            }
        })
        .then(function(response) {
        if (!response.ok) {
            throw Error(response.message);
        }
        return response.json();
    }).then((response) => {
        console.log(response)
        this.setState({
            id:`User Id: ${response.user.id}`,
            name:`Name: ${response.user.name}`,
            email:`Email Id: ${response.user.email}`,
            clicked:true
        });
        
    }).catch(function(error) {
        console.log(error)
    });

    }

    handleUsersClick = () => {

        fetch('http://localhost:8000/api/users', 
        { 
        method: 'GET',
        headers: { 
            
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'bearer ' + getCookie("token"),
            }
        })
        .then(function(response) {
        if (!response.ok) {
            throw Error(response.message);
        }
        return response.json();
    }).then((response) => {
        console.log(response)
        this.setState({
           users:response.users,
           usersClicked:true
        });
        
    }).catch(function(error) {
        console.log(error)
    });


    }

    handleLogout = () => {
        expireCookie("token");
        this.props.history.push('/Login');
    };

render(){
    // if(this.state.userLoggedIn === false){
    //     return <Redirect to="/Login"/>
    // }
    return(
        <div>
            <div className="container1">
                <div className="topnav">
                        <ul className="second">
                        <li><a href="#" onClick={e=>this.handleLogout(e)}>Logout</a></li>
                        </ul>
                </div> 
                <div className="bg-img1">
                <br></br>
                <center><h1 style={{color:'white',fontFamily:'Cambria',fontSize:40}}>Welcome user!</h1>
                <br></br>
                <button className="btn1" onClick={this.handleClick}>Click to view your profile</button></center>
                <br></br>
                <div className={ this.state.clicked ? 'displayusercard' : 'hiddenusercard' }>
                <p>{this.state.id}<br></br>{this.state.name}<br></br>{this.state.email}</p>
                </div>
                <br></br>
                <center><button className="btn1" onClick={this.handleUsersClick}>Click to view all users</button></center>
                {this.state.users.map((user)=>{
                return(
                  <div  key = {user.id} className={this.state.usersClicked ? 'displayusers' : 'hiddenusers'} >
                   <p>{`User Id: ${user.id}`} <br></br>
                   {`Name: ${user.name}`}</p>
                   </div>  
                )
               }
               )}
                <br></br>

                </div>
            </div>
        </div>
    );
}
}

export default Users;