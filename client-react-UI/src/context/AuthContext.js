import {createContext, useReducer} from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE={
    user: {
        _id: "64d819caa0e3192c69f07f48",
        username: "testing",
        email: "yash@mail.com",
        profilePicture: "",
        coverPicture: "",
        followers: [],
        following: [],
        isAdmin: false,
        __v: 0
    },
    isFetching: false,
    error: false
};

export const AuthContext=createContext(INITIAL_STATE);

export const AuthContextProvider=({children})=>{
    const [state, dispatch]=useReducer(AuthReducer,INITIAL_STATE);
    return(
        <AuthContext.Provider value={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            dispatch
        }} >
            {children}
        </AuthContext.Provider> 
    );
};

