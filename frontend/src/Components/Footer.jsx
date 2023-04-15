import React from 'react'
import styled from 'styled-components'
import { mobile } from '../Responsive'

const Container = styled.div`
    background-color:#080808;
    height: 10vh;
    width: 100%;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 5px;
    ${mobile({
      fontSize:"12px"
    })}
`
const Footer = () => {
  return (
    <Container>
        LearnIt.inc
    </Container>
  )
}

export default Footer