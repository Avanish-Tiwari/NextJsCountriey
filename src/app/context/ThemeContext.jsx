'use client'

import {createContext, useContext, useEffect, useState} from "react"

const ThemeContext=createContext();

export function ThemeProvider ({children}){
    const [isDark,setIsDark]=useState(false);
    useEffect(()=>{
        const stored=localStorage.getItem("theme");
        if(stored=="Dark") setIsDark(true)
    },[]);
useEffect(()=>{
    localStorage.setItem("theme",isDark?"Dark":"Light")
},[isDark])
    const handleToggle=()=>{
        setIsDark(prev=>!prev);
    }
    return (
        <ThemeContext.Provider value={{isDark,handleToggle}}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme(){
    const context=useContext(ThemeContext);
    if(context==undefined){
        throw new Error("useTheme must be used within a ThemeProvider")
    }
    return context;
}