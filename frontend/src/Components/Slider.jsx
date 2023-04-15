import React, {useState } from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styled from 'styled-components';
import SliderItem from './SliderItem';
import { mobile, tablet } from '../Responsive';
const Container = styled.div`
position: relative;
background-color: black;
overflow: hidden;
${mobile({
    overflow:"scroll"
})}
${tablet({
    overflow:"scroll"
})}
`
const Icon = styled.div`
position: absolute;
color: white;
top: 0;
z-index: 99;
background-color: rgba(0,0,0,0.5);
width: 50px;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
bottom: 0;
left: ${props=>props.direction === "left" && "0"};
right:${props=>props.direction ==="right" && "0"};
${mobile({
    display:"none"
})}
${tablet({
    display:"none"
})}
`
const Slide = styled.div`
    display: flex;
    width: max-content;
    gap: 2px;
    transition: all ease 0.8s;
    transform: translateX(${props=>props.index*-100}vw);
`
const Slider = ({data,size}) => {
    const [index,setindex] = useState(0)
    const handleClick = (direction)=>{
       if(direction === "left"){
        setindex(index>0 && index-1)
       }
       if(direction === "right"){
        setindex(index < ((size ? 20 : 8)/4)-1 && index+1)
       }
    }
  return (
    <Container>
        {data.length >=8 && <Icon direction="left"><ArrowBackIosNewIcon onClick={()=>handleClick("left")}/></Icon>}
        <Slide index={index}>
        <SliderItem data={data}/>
        </Slide>
        {data.length >=8 &&<Icon direction="right"><ArrowForwardIosIcon onClick={()=>handleClick("right")} /></Icon>}
    </Container>
  )
}

export default Slider