import React,{Component} from 'react';
import "./Formstyles.css";
import {Link,Redirect} from 'react-router-dom';
import login from "../images/login.png";
import {getCookie,isLoggedIn,setCookie}  from "../Auth";
import {toast} from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';  
    
toast.configure()

class Login extends Component{
    
    state={

        email:'',
        password:'',
        errors:{},
        userLoggedIn:false
    }

    checkAuth = () => {
        console.log("IsLoggedIn", isLoggedIn());
        if (isLoggedIn() && this.state.userLoggedIn === false) {
            this.setState({
                userLoggedIn:true
            });
        }
    };

    componentDidMount(){
        this.checkAuth();
    }

    handlePassword = (e) => {
        this.setState({
          password:e.target.value,
        });
    };

    handleEmail = (e) => {
        this.setState({
          email:e.target.value,
        });
    };

    validation=()=>{
        let isValid=true;
        let errors={};
        const {email,password}=this.state;
       
        if(email==""){
            isValid=false;
            errors["email"]="Please enter your email";
        }
        if(email!=""){
            var emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!emailPattern.test(email)) {
              isValid = false;
              errors["email"] = "Please enter valid email address.";
        }
        }

        if(password==""){
            isValid=false;
            errors["password"]="Please set a password.";
        }
        if(password!=""){
            //password between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character
            var passwordPattern=new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/);
            if(!passwordPattern.test(password)){
                isValid=false;
                errors["password"]="Password should be 8 to 15 characters long which contain atleast one lowercase letter,one uppercase letter, one numeric digit and one special character."
            }            
        }
        this.setState({
            errors
        });
        return isValid;
    }

    handleLoginSubmit = (e) => {
        e.preventDefault();
        if(this.validation()){
        let newUser = {
          password:this.state.password,
          email:this.state.email 
        };

        fetch('http://localhost:8000/api/login', 
            { 
            method: 'POST',
            body: JSON.stringify(newUser),
            // credentials:'same-origin',
            headers: { 
                
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                },
                
            })
            .then(function(response) {
            return response.json();
            }).then((response) => {
            if(response.error == "Unauthorized"){
                toast.error("Wrong credentials,check again!",{position: toast.POSITION.BOTTOM_LEFT,autoClose:1700})
                this.setState({
                    email:"",
                    password:""
                });
            }else{
            this.setState({
                password:'',
                email:''  
            });
            toast.success('Successfully Logged In!',{position: toast.POSITION.BOTTOM_LEFT,autoClose:2000})
            const token = response.token;
            console.log(token)
            setCookie("token", token, 1);
            this.checkAuth();
        }}).catch(function(error) {
            toast.error(error,{position: toast.POSITION.BOTTOM_LEFT,autoClose:1500})      
        });
    }
    }



    render(){
        return(
            <React.Fragment>
                {this.state.userLoggedIn && <Redirect to="/Users"/>}
                <div className="container1">
                        <div className="topnav">
                                <ul className="first">
                                    <li><Link to="/">SIGNUP</Link></li>
                                    <li><Link to="/Login">LOGIN</Link></li>
                                </ul>
                        </div>   
                <div className="bg-img1">        
                <div className="container">
                <center>
                    <img className="loginimage" src={login}/>
                    <p>Login</p>
                </center>
                <hr></hr>
                <form onSubmit={this.handleLoginSubmit}>
                    <label name="Email Id" className="labels"><b>Email Id</b></label>
                    <input type="text" placeholder="Enter Email Id" name="Email Id" 
                    className={`${this.state.errors.email ? "error" : "Logininput"}`}
                    value={this.state.email} 
                    onChange={this.handleEmail}
                    />
                    {this.state.errors.email?<div className="text-danger">{this.state.errors.email}</div>:null}
                    <label name="psw" className="labels"><b>Password</b></label>
                    <input type="password" 
                    className={`${this.state.errors.password ? "error" : "Logininput"}`} 
                    placeholder="Enter Password" 
                    name="psw"
                    value={this.state.password} 
                    onChange={this.handlePassword}
                    />
                    {this.state.errors.password?<div className="text-danger1">{this.state.errors.password}</div>:null}
                    <button type="submit" className="btn"><b>Login</b></button>
                </form>
                </div> 
                </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Login;