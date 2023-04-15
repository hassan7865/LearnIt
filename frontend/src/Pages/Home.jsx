import React from 'react'

import styled from 'styled-components'
import AllSlider from '../Components/AllSlider'
import FeaturedVideo from '../Components/FeaturedVideo'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
const Container = styled.section`
background-color: black;
height: 100%;
overflow: hidden;
`
const Home = () => {
  return (
    <Container>
        <Navbar/>
        <FeaturedVideo/>
        <AllSlider/>
        <Footer/>
    </Container>
  )
}

export default Home