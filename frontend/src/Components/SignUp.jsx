import React,{Component} from 'react';
import "./Formstyles.css";
import {Link,Redirect} from 'react-router-dom';
import {getCookie,isLoggedIn,setCookie}  from "../Auth";
import signupimage from "../images/signupimg.png";
import {toast} from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';  
    
toast.configure()

class SignUp extends Component{
    
    state={
        name:'',
        email:'',
        password:'',
        errors:{},
        userLoggedIn:false
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

    handleName = (e) => {
        this.setState({
          name:e.target.value,
        });
    };

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
        const {name,email,password}=this.state;
        if(name=="")
        {
           isValid=false;
           errors["name"]="Please enter your Name";
        }
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

    handleSignupSubmit = (e) => {
        e.preventDefault();
        if(this.validation()){
        let newUser = {
          name:this.state.name,
          password:this.state.password,
          email:this.state.email 
        };

        fetch('http://localhost:8000/api/register', 
            { 
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: { 
                
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                }
            },{
                credentials:'include'
            })
            .then(function(response) {
            if (!response.ok) {
                throw Error(response.message);
            }
            return response;
        }).then((response) => {
            this.setState({
                
                name:'',
                password:'',
                email:''  
            });
            toast.success('Successfully Signed In!',{position: toast.POSITION.BOTTOM_LEFT,autoClose:2000})
        }).catch(function(error) {
            toast.error(error,{position: toast.POSITION.BOTTOM_LEFT,autoClose:1500})
        });
    }
    }



    render(){
        if(this.state.userLoggedIn){
            return <Redirect to="/Users" />
        }
        return(
            <React.Fragment>
                <div className="container1">
                        <div className="topnav">
                                <ul className="first">
                                    <li><Link to="/">SIGNUP</Link></li>
                                    <li><Link to="/Login">LOGIN</Link></li>
                                </ul>
                        </div> 
                <div className="bg-img1">        
                <div className="container"> 
                <center><p>SignUp<img className="signupimage" src={signupimage}/></p></center>
                <hr></hr>        
                <form onSubmit={this.handleSignupSubmit}>
                    <label name="Name" className="labels"><b>Name</b></label>
                    <input type="text"
                     className={`${this.state.errors.username ? "error" : "Signupinput"}`}
                      placeholder="Enter Your Name" 
                      name="name" 
                      value={this.state.name}
                      onChange={this.handleName}
                    />
                    {this.state.errors.name?<div className="text-danger">{this.state.errors.name}</div>:null}
                    <label name="Email Id" className="labels"><b>Email Id</b></label>
                    <input type="text" placeholder="Enter Email Id" name="Email Id" 
                    className={`${this.state.errors.email ? "error" : "Signupinput"}`}
                    value={this.state.email} 
                    onChange={this.handleEmail}
                    />
                    {this.state.errors.email?<div className="text-danger">{this.state.errors.email}</div>:null}
                    <label name="psw" className="labels"><b>Password</b></label>
                    <input type="password" 
                    className={`${this.state.errors.password ? "error" : "Signupinput"}`} 
                    placeholder="Enter Password" 
                    name="psw"
                    value={this.state.password} 
                    onChange={this.handlePassword}
                    />
                    {this.state.errors.password?<div className="text-danger1">{this.state.errors.password}</div>:null}
                    <button type="submit" className="btn"><b>Register</b></button>
                </form>
                </div>  
                </div>
                </div> 
            </React.Fragment>
        );
    }
}

export default SignUp;