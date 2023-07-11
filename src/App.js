import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TransactionsPage from "./pages/TransactionPage"
import AuthCon from "./context/authCon"
import { useState } from "react"

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [username, setUserName ] = useState(localStorage.getItem("userName"))

  return (
    <PagesContainer>
      <AuthCon.Provider value={{token, setToken, username, setUserName}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/cadastro" element={<SignUpPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/nova-transacao/:tipo" element={<TransactionsPage />} />
          </Routes>
        </BrowserRouter>
      </AuthCon.Provider>
    </PagesContainer>
  )
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`
