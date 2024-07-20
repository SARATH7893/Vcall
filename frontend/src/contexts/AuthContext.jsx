import axios from "axios";
import httpStatus from "http-status";
import { useNavigate } from "react-router-dom";
// import server from "../environment";
import { createContext, useContext, useState } from "react";

export const AuthContext=createContext({});

const client=axios.create({
    baseURL:"http://localhost:8080/api/v1/users"
})

export const AuthProvider=({children})=>{
    const authContext=useContext(AuthContext);
    const [userData,setUserData]=useState(authContext);
    const router=useNavigate();

    const handleRegister=async (name,username,password)=>{
        try{
            let request=await client.post("/register",{
                name:name,
                username:username,
                password:password
            })
            if(request.status===httpStatus.CREATED){
                return request.data.message
            }

        }catch(err){
            throw err;
        }
    }

    const handleLogin=async (username,password)=>{
            try{
                let request=await client.post("/login",{
                    username:username,
                    password:password
                });
                if(request.status===httpStatus.OK){
                    localStorage.setItem("token",request.data.token);
                }
            }catch(err){
                throw err;
            }
    }


    const data={
        userData,setUserData,handleRegister,handleLogin
    }
    return(
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}