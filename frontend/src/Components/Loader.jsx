import React from 'react'
import styled from 'styled-components'

const Container = styled.span`
width: ${props=>props.type === "send" ? "34px" : "48px"};
  height:${props=>props.type === "send" ? "34px" : "48px"};
  border-radius: 50%;
  display: inline-block;
  position: relative;
  background: linear-gradient(0deg, rgba(255, 61, 0, 0.2) 33%, #ff0000 100%);
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  &:after {
  content: '';  
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width:${props=>props.type === "send" ? "30px" : "44px"};
  height: ${props=>props.type === "send" ? "30px" : "44px"};
  border-radius: 50%;
  background:${props=>props.type === "Signup" || props.type === "list" ? "white" : "#000000"};
  }
  @keyframes rotation {
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg)}
} 
`
const Loader = ({type}) => {
  return (
    <Container type={type}></Container>
  )
}

export default Loader