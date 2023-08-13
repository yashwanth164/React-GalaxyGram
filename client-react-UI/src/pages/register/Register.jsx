import axios from "axios";
import "./register.css"
import { useRef } from "react";
import {useNavigate} from "react-router";

export default function Register() {
    const username=useRef();
    const email=useRef();
    const password=useRef();
    const passwordAgain=useRef();
    const navigate=useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        if(password.current.value !== passwordAgain.current.value){
            passwordAgain.current.setCustomValidity("Passwords don't match")
        }else{
            const user={
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,            
            }
            try{
                await axios.post("/auth/register",user);
                navigate('/login');
            }catch(err){
                console.log(err);
            }
        }
    };

  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">GalaxyGram</h3>
                <span className="loginDesc">Your Universe of Social Networking</span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input type="text" placeholder="Username" required ref={username} className="loginInput" minLength={6}/>
                    <input type="email" placeholder="Email" required ref={email} className="loginInput" />
                    <input type="password" placeholder="Password" required ref={password} className="loginInput" minLength={8} />
                    <input type="password" placeholder="Confirm password" required ref={passwordAgain} className="loginInput" minLength={8} />
                    <button className="loginButton" type="submit">Sign up</button>
                    <button className="loginRegisterButton">Log into account</button>
                </form>
            </div>
        </div>
    </div>
  )
}
