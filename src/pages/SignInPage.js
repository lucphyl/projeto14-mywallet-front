import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import axios from "axios"
import { useContext, useState } from "react"
import AuthCon from "../context/authCon"
import { useQUickIN } from "../hooks/quiIN"

export default function SignInPage() {
  const {setToken, setUserName} = useContext(AuthCon)
  const [form,setForm] = useState({ email:"",password:""})
  const navigate = useNavigate()

  useQUickIN()


  function handleform(e) {
    setForm({...form, [e.target.name]: e.target.value})
  };

  function formSubmit(e){
    e.preventDefault()

    axios.post(`${process.env.REAT_APP_API_URL}//sign-in`, form)
    .then (response => { 
      setToken(response.data.token) 
      setUserName(response.data.username)
      localStorage.setItem("userName",response.data.username )
      localStorage.setItem("token",response.data.token )
      navigate("/home")
    })
    .catch((error)=> alert(error.response.data))
  };

  return (
    <SingInContainer>
      <form onSubmit={formSubmit}>
        <MyWalletLogo />
        <input 
          required 
          type="email" 
          autoComplete="username" 
          placeholder="E-mail" 
          name="email" 
          value={form.email} 
          onChange={handleform} 
        />
        
        <input 
          required 
          minLength={3} 
          type="password"
          placeholder="Senha" 
          name="password" 
          autoComplete="new-password" 
          value={form.password} 
          onChangeChange={handleform}
         />
        <button type="submite">Entrar</button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
