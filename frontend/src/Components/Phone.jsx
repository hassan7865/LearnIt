import React from 'react'
import phone from "../Utils/Phone.png"
import MobileFriendlyOutlinedIcon from '@mui/icons-material/MobileFriendlyOutlined';
import styled from 'styled-components';
import { mobile, monitor, tablet } from '../Responsive';
const Container = styled.div`
padding:10vh 15vw 10vh 15vw ;
color: white;
display: flex;
justify-content: center;
align-items: center;
gap: 150px;
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
const Right = styled.div`
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
const Left = styled.div`
`
const PhoneCont = styled.div`
width: 180px;
position: relative;
display: flex;
align-items: center;
justify-content: center;
height: 350px;
${mobile({
    width:"160px",
    height:"300px"
})}
${tablet({
    width:"160px",
    height:"300px"
})}
`
const Screen = styled.img`
height: 260px;
width: 162px;
top: 40px;
object-fit: cover;
position: absolute;
${mobile({
    width:"145px",
    height:"230px",
    top:"35px"
})}
${tablet({
    width:"145px",
    height:"230px",
    top:"35px"
})}
`
const PhoneImg = styled.img`
width: 100%;
height: 100%;
`
const Cont = styled.div`
background-color: black;
border: 3px solid #333;
width: 320px;
top:250px;
height: 80px;
display: flex;
align-items: center;
gap: 20px;
padding: 10px;
position: absolute;
${mobile({
    width:"250px",
    height:"60px",
    padding:"5px",
    top:"225px"
})}
${tablet({
     width:"250px",
    height:"60px",
    padding:"5px",
    top:"225px"
})}
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
const ContLeft = styled.div`
height: 100%;
width: 30%;
`
const ContRight = styled.div`

`
const Title = styled.p`
margin-bottom: 5px;
font-weight: 500;
${mobile({
    fontSize:"13px"
})}
${tablet({
    fontSize:"13px"
})}
`
const Add = styled.p`
font-size: 13px;
color: blue;
${mobile({
    fontSize:"12px"
})}
${tablet({
    fontSize:"12px"
})}
`
const Head = styled.h1`
font-size: 50px;
font-weight: 600;
margin-bottom: 10px;
${mobile({
    display:"none"
})}
${tablet({
    display:"none"
})}
${monitor({
    display:"none"
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
const Phone = () => {
  return (
   <Container>
    <Left>
        <PhoneCont>
        <Screen src='https://www.w3schools.com/whatis/img_js.png'></Screen>
        <PhoneImg src={phone}></PhoneImg>
        <Cont>
            <ContLeft>
                <Image src='https://www.espruino.com/images/front_icon_1.png'></Image>
            </ContLeft>
            <ContRight>
                <Title>JavaScript Course</Title>
                <Add>Add to Watch List</Add>
            </ContRight>
            <MobileFriendlyOutlinedIcon />
        </Cont>
        </PhoneCont>
    </Left>
    <Right>
        <Head>Download your shows to watch offline.</Head>
        <Para>Save your favorites easily and always have something to watch.</Para>
    </Right>
   </Container>
  )
}

export default Phone