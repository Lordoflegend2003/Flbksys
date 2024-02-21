import React, { useEffect, useState, useContext } from "react";
const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider(props){
    const [authuser , setAuthuser] = useState(null);
    const [isLoggedIn , setIsloggedin] = useState(false);

    const value = {
        authuser,
        setAuthuser,
        isLoggedIn,
        setIsloggedin,
    }


    return (
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    )
}