import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
width: 30px;
  height:30px;
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
  width:26px;
  height: 26px;
  border-radius: 50%;
  background:white;
  }
  @keyframes rotation {
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg)}
} 
`
const LoaderButton = () => {
  return (
    <Container>

    </Container>
  )
}

export default LoaderButton