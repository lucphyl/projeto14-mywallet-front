import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import axios from "axios"
import { useQUickIN } from "../hooks/quiIN"

export default function SignUpPage() {
  const [form,setForm] = useState({name:"", email:"",password:"", confirmPassword:""})
  const navigate = useNavigate()

  useQUickIN()

  function handleform(e) {
    setForm({...form, [e.target.name]: e.target.value})
  };

  function formSubmit(e){
    e.preventDefault()
    if(form.password !== form.confirmPassword) return alert ("as senhas não batem, favor mudar")
    delete form.confirmPassword
    axios.post(`${process.env.REACT_APP_API_URL}/sign-up`, form)
    .then(response=>navigate("/"))
    .catch(error=> console.log(error.response.data))
  };

  return (
    <SingUpContainer>
      <form onSubmit={formSubmit}>

        <MyWalletLogo />
        <input required placeholder="Nome" name="name" value={form.name} onChange={handleform} />
        
        <input required type="email" autoComplete="username" placeholder="E-mail" name="email" value={form.email} onChange={handleform} />
        
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

        <input 
          required 
          minLength={3} 
          type="password" 
          placeholder="Confirme a senha" 
          name="confirmPassword" 
          autocomplete="new-password"
          value={form.confirmPassword}
          onChange={handleform}
         />
        
        <button type="submit">Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
