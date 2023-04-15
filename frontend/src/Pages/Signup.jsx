import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { mobile, monitor, tablet } from '../Responsive'
import { Req } from '../Url'
import LogoS from '../Utils/Logo.png'
import Loader from '../Components/Loader'
const Container = styled.div``
const Nav = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
padding: 10px;
`
const Logo = styled.img`
 height: 50px;
 ${mobile({
    height: "40px"
})}
`
const Button = styled.button`
cursor: pointer;
background-color: #e50914;
border: none;
color: white;
font-size: 15px;
height: 30px;
width: 60px;
border-radius: 5px;
`
const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
height: 70vh;
`
const Input = styled.input`
margin: 5px;
font-size: 15px;
padding-left: 5px;
height: 30px;
outline: none;
border: 1px solid gray;
`
const Form = styled.form`
display: flex;
flex-direction: column;
`
const Cont = styled.div`
width: 30%;
${mobile({
    width: "90%"
})}
${tablet({
    width: "70%"
})}
${monitor({
    width: "40%"
})}
`
const SignUp = styled.button`
height: 50px;
border-radius: 5px;
background-color: #e50914;
border: none;
color: white;
margin-top: 10px;
font-size: 15px;
`
const Head = styled.h1`
font-weight: 400;
margin-bottom: 10px;
font-size: 40px;
color: #333;
${mobile({
    fontSize: "32px"
})}
`
const Load = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`
const Signup = () => {
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [email, setemail] = useState("")
    const [load,setload] = useState(false)
    const [message,setmessage] = useState()
    const navigate = useNavigate()
    const handleSignup = async (e) => {
        e.preventDefault()
        setload(true)
        await Req.post("/auth/signup", { username, email, password })
            .then((res) => {
                if (res.status === 200) {
                    setload(false)
                    navigate("/signin")
                }
            }).catch((err) => {
                setload(false)
                if(err.response.data === "duplicateuser"){
                    setmessage("duplicateuser")
                }
                else if(err.response.data === "duplicateemail"){
                    setmessage("duplicateemail")
                }
            })
    }
    return (
        <>
        {load ? <Load><Loader type="Signup"/></Load>: <Container>
            <Nav>
                <Logo src={LogoS}></Logo>
                <Link to="/signin">
                    <Button>SignIn</Button>
                </Link>
            </Nav>
            <Wrapper>
                <Cont>
                    <Head>Create An Account</Head>
                    <Form onSubmit={handleSignup}>
                        <Input required onChange={(e) => setusername(e.target.value)} placeholder='Username'></Input>
                        {message === "duplicateuser"&&<p style={{marginLeft:"6px",fontSize:"12px",color:"red"}}>User has Already been Registered</p>}
                        <Input required onChange={(e) => setemail(e.target.value)} placeholder='Email'></Input>
                        {message === "duplicateemail"&&<p style={{marginLeft:"6px",fontSize:"12px",color:"red"}}>Email has Already been Registered</p>}
                        <Input required onChange={(e) => setpassword(e.target.value)} placeholder='Password'></Input>
                        <SignUp type="submit">Sign Up</SignUp>
                    </Form>
                </Cont>
            </Wrapper>
        </Container>}</>
    )
}

export default Signup