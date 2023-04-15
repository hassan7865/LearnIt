import React from 'react'
import styled from 'styled-components'
import LogoS from '../Utils/Logo.png'

import { mobile,tablet } from '../Responsive'
import Laptop from '../Components/Laptop';
import Phone from '../Components/Phone';
import { Link } from 'react-router-dom';
const Container = styled.div`
background-color: black;
position: relative;
`
const Image = styled.img`
height: 100vh;
width: 100%;
border-bottom: 8px solid #333;
object-fit: cover;
opacity: 0.5;
${mobile({
  height:"80vh"
})}
`
const Wrapper = styled.div`
position: absolute;
top: 0;
height: 100%;
width: 100%;
`
const Nav = styled.div`
 display: flex;
 align-items: center;
 padding: 10px;
 justify-content: space-between;
`
const Logo = styled.img`
height: 50px;
${mobile({
  height:"40px"
})}
${tablet({
  height:"40px"
})}
`
const Button = styled.button`
 background-color: #e50914;
 cursor: pointer;
 color: white;
 border: none;
 font-size: 15px;
 padding:${props=>props.type === "Second" ? "10px 15px 10px 15px" :  "8px 14px 8px 14px"};
 border-radius: 5px;
 ${mobile({
  padding:props=>props.type === "Second" ? "10px 15px 10px 15px" :  "5px 10px 5px 10px",
  fontSize:"12px"
 })}
`
const Upper = styled.div`
color: white;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
text-align: center;
height: 70vh;
gap: 10px;
`
const Head = styled.h1`
 font-size:50px;
 font-weight: 800;
 ${mobile({
  fontSize:"35px"
 })}
 ${tablet({
  fontSize:"35px"
 })}
`
const Para = styled.p`
font-size: 20px;
font-weight: 300;
margin-bottom: 10px;
${mobile({
  fontSize:"13px"
})}
${tablet({
  fontSize:"14px"
})}
`
const IntroPage = () => {
  return (
    <Container>
      <Image src="https://www.boriszaikin.com/assets/images/posts/featuring-news.png"></Image>
      <Wrapper>
        <Nav>
          <Logo src={LogoS}></Logo>
          <Link to="/signin">
          <Button>Login</Button>
          </Link>
        </Nav>
        <Upper>
          <Head>Unlimited movies, TV shows, and more.</Head>
          <Para>Watch anywhere. Cancel anytime.Ready to watch</Para>
          <Link to="/signup/form">
          <Button type='Second'>Get Started</Button>
          </Link>
        </Upper>
      </Wrapper>
      <Laptop/>
      <Phone/>
    </Container>
  )
}

export default IntroPage