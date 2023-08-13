import { useContext, useRef } from "react";
import "./login.css"
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from '@mui/material/CircularProgress';

export default function Login() {
    const email=useRef();
    const password=useRef();
    const {user, isFetching, error, dispatch}=useContext(AuthContext);

    const handleClick = (e) => {
        e.preventDefault();
        loginCall({email:email.current.value,password:password.current.value}, dispatch);
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
                    <input type="Email" placeholder="Email" className="loginInput" required ref={email}/>
                    <input type="Password" placeholder="Password" className="loginInput" required ref={password} minLength={8}/>
                    <button className="loginButton" disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" size={20} />:"Login"}</button>
                    <span className="loginForgot">Forgot Password</span>
                    <button className="loginRegisterButton">Create a new account</button>
                </form>
            </div>
        </div>
    </div>
  )
}
