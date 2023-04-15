import React from 'react'
import styled from 'styled-components'
import { mobile, monitor, tablet } from '../Responsive'
import imageLap from "../Utils/Laptop.png"
import Shot from '../Utils/Song.mp4'
const Container = styled.div`
  display: flex;
  align-items: center;
  padding:10vh 15vw 10vh 15vw;
  border-bottom: 8px solid #333;
  color: white;
  ${mobile({
    flexDirection:"column",
    gap:"30px"
  })}
  ${tablet({
     flexDirection:"column",
    gap:"30px"
  })}
  ${monitor({
     flexDirection:"column",
     gap:"30px"
  })}
`
const Left = styled.div`
${mobile({
  textAlign:"center"
})}
${tablet({
  textAlign:"center"
})}
  ${monitor({
    textAlign:"center"
  })}
`
const Head = styled.h1`
font-size:50px;
margin-bottom: 10px;
${mobile({
  fontSize:"40px"
})}
${tablet({
   fontSize:"40px"
})}
`
const Para = styled.p`
font-size: 20px;
${mobile({
  fontSize:"15px"
})}
${tablet({
   fontSize:"15px"
})}
`
const Right = styled.div`
`
const LapCont = styled.div`
width: 420px;
height: 195px;
position: relative;
${mobile({
  width:"350px"
})}
${tablet({
   width:"350px"
})}
`
const Screen = styled.video`
    height:146px;
    width: 315px;
    position: absolute;
    top: 9px;
    left: 48px;
    object-fit: cover;
    ${mobile({
      width:"265px",
      left:"40px"
    })}
    ${tablet({
      width:"265px",
      left:"40px"
    })}
`
const ImgLap = styled.img`
width: 100%;
height: 100%;
`
const Laptop = () => {
  return (
    <Container>
         <Left>
            <Head>Enjoy on your TV.</Head>
            <Para type="device">Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</Para></Left>
          <Right>
            <LapCont>
              <Screen autoPlay muted playsInline loop src={Shot}></Screen>
              <ImgLap src={imageLap}></ImgLap>
            </LapCont>
          </Right>
    </Container>
  )
}

export default Laptop