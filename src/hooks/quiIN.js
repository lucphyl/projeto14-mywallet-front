import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import AuthCon from "../context/authCon"



export function useQUickIN(){
    const {userName} = useContext(AuthCon)
    const navigate = useNavigate()
    
    useEffect(()=> {if (token || userName) navigate("/home")}, [])
};