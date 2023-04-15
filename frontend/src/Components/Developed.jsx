import React from 'react'
import styled from 'styled-components'
import { mobile } from '../Responsive'
import GitHubIcon from '@mui/icons-material/GitHub';
import Dev from '../Utils/Dev.jpg'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
const Container = styled.div`
    position: absolute;
    top: 2vh;
    right: 0.5vw;
    height: 300px;
    width: 250px;
    background-color:#333;
    ${mobile({
      width:"50vw",
    })}
`
const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 50vh;
    width: 100%;
    margin-top: 20px;
`
const Profile = styled.img`
height: 100%;
width: 100%;
border-radius: 50%;
object-fit: cover;
border: 3px solid #222222;
`
const ImageContainer = styled.div`
height: 150px;
width: 150px;
position: relative;
margin-bottom: 20px;
${mobile({
      height:"100px",
      width:"100px"
    })}
`
const Name = styled.p`
font-size: 16px;
font-weight: 300;
color: #fafafa;
`
const Icons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`
const Icon = styled.a`
color: inherit;
`
const Developed = ({openA,setopenA}) => {
  return (
    <>
   {openA &&<Container>
        <Wrapper>
        <ArrowBackRoundedIcon onClick={()=>setopenA(false)} style={{marginRight:"80%"}}/>
            <ImageContainer>
            <Profile src={Dev}></Profile>
            </ImageContainer>
            <Name>Hassan Siddiqui</Name>
            <Icons>
                <Icon href='https://www.facebook.com/hassan.siddiqui.92505956/'><FacebookIcon/></Icon>
                <Icon href='https://github.com/hassan7865'><GitHubIcon/></Icon>
                <Icon href='https://www.instagram.com/hassansiddiqui_here/'><InstagramIcon/></Icon>
            </Icons>
            </Wrapper>
           
    </Container>}
    </>
  )
}

export default Developed