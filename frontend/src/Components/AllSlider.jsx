import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { mobile, tablet } from '../Responsive'
import { Req } from '../Url'
import Skeleton from './Skeleton'
import Slider from './Slider'
const Container = styled.div`
margin-top: ${props=>props.type = "Random" ? "0px":"20px"}
`
const Cont = styled.div`
${mobile({
  overflow:"hidden"
})}
${tablet({
  overflow:"hidden"
})}
`
const Head = styled.p`
color: white;
display: flex;
align-items: center;
gap: 10px;
margin:10px 0 10px 10px;
font-size: 20px;
${mobile({
  fontSize:"15px"
})}
${tablet({
  fontSize:"15px"
})}
`
const Prog = styled.h1`
  font-size: 40px;
  font-weight: 300;
  margin-top: 50px;
  text-align: center;
  color: white;
  ${mobile({
    fontSize:"23px",
    margin:"25px 0 30px 0px"

  })}
`
const Wrapper = styled.div`
overflow: hidden;
`
const AllSlider = () => {
  const [random,setrandom] = useState()
  const [popular,setpopular] = useState()
  const [python,setpython] = useState()
  const [javascript,setjavascript] = useState()
  useEffect(()=>{
    const getrandom =async()=>{
      try{
        const res = await Req.get("/video/allvideos")
        setrandom(res.data)
      }catch(err){
        
      }
    }
    getrandom()
  },[])
  useEffect(()=>{
    const getPopular = async()=>{
      try{
        const res = await Req.get("/video/popular")
        setpopular(res.data)
      }catch(err){
        
      }
    }
    getPopular()
  },[])
  useEffect(()=>{
    const getpython = async()=>{
      try{
        const res = await Req.get("/video/python")
        setpython(res.data)
      }catch(err){
        
      }
    }
    getpython()
  },[])
  useEffect(()=>{
    const getscript = async()=>{
      try{
        const res = await Req.get("/video/javascript")
        setjavascript(res.data)
      }catch(err){
        
      }
    }
    getscript()
  },[])
  return (
    <Container type="Random">
        <Cont>
        {random ? 
        <Wrapper>
            <Slider size={true} data={random.slice(0,16)}/>
          </Wrapper>
        :<Skeleton type="Random"/>}
        </Cont>
        <Cont>
        {popular?<Wrapper>
            <Head>Popular</Head>
            <Slider data={popular.slice(0,8)}/>
        </Wrapper>:<Skeleton/>}
        </Cont>
        {python?<Wrapper><Cont>
        <Prog>Famous Programming Language</Prog>
        <Head>Python</Head>
        <Slider data={python}/>
        </Cont></Wrapper>:<Skeleton/>}
        {javascript?<Wrapper>
        <Cont>
        <Head>JavaScript</Head>
        <Slider data={javascript}></Slider>
        </Cont>
        </Wrapper>:<Skeleton/>}
    </Container>
  )
}

export default AllSlider