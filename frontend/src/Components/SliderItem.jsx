import React, {useState } from 'react'
import styled from 'styled-components'
import { mobile, monitor, tablet } from '../Responsive'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Link} from 'react-router-dom';
import { Req } from '../Url';
import moment from 'moment';

const Image = styled.img`
width: 100%;
height: 100%;
object-fit: cover;

`
const Cont = styled.div`
position: absolute;
top:0;
height:0%;
width: 100%;
transition: all ease 0.3s;

`
const InfoCont = styled.div`
width: 100%;
display: none;
align-items: center;
justify-content: center;
flex-direction: column;
height: 100%;
`
const Container = styled.div`
height: 32vh;
overflow: hidden;
position: relative;
width: 24.9vw;
background-color: black;
&:hover ${Image}{
  opacity: 0.5;
  display: none;
}
&:hover ${Cont}{
  height: 100%;
}
&:hover ${InfoCont}{
  display: flex;
}
${mobile({
    height:"100px",
    width:"180px"
})}
${tablet({
    height:"100px",
    width:"180px"
})}
`
const Play = styled.div`
 color:white;
 margin:20px 0 20px 0;
${mobile({
  margin:"0"
})}
${tablet({
  margin:"0"
})}
`
const Info = styled.div`
width: 100%;
margin-left: 20px;
`
const Title = styled.p`
  color:white;
  font-size: 18px;
  font-weight: 600;
  ${mobile({
    fontSize:"13px",
    fontWeight:"500"
  })}
  ${tablet({
     fontSize:"13px",
    fontWeight:"500"
  })}
   ${monitor({
      fontSize:"15px",
    fontWeight:"500"
  })}
`
const VideoScreen = styled.video`
  height: 100%;
  width: 100%;
  object-fit: cover;
  opacity: 0.4;
`
const Date = styled.p`
   color: #39e063;
   margin-top: 2px;
  font-size: 15px;
  font-weight: 600;
  ${mobile({
    fontSize:"13px",
    fontWeight:"500"
  })}
  ${tablet({
     fontSize:"13px",
    fontWeight:"500"
  })}
  ${monitor({
      fontSize:"13px",
    fontWeight:"500"
  })}
`
const SliderItem = ({data}) => {
  const [hover,sethover] = useState(false)
  const AddView = async(id)=>{
    await Req.put(`/video/view/${id}`)
  }
  return (
    <>
    {data.map((items)=>(
    <Container key={items._id} onMouseEnter={() => sethover(true)} onMouseLeave={() => sethover(false)}>
    <Image src={items.imgUrl}></Image>
    {hover && <VideoScreen src={items.videoUrl} autoPlay loop muted></VideoScreen>}
        <Cont>
         <InfoCont>
          <Play><Link to={`video/${items._id}`} style={{color:"inherit"}}><PlayArrowIcon onClick={()=>AddView(items._id)} style={{fontSize:"40px"}}/></Link></Play>
          <Info>
            <Title>{items.title}</Title>
            <Date>{moment(items?.createdAt).fromNow()}</Date>
          </Info>
         </InfoCont>
        </Cont>
    </Container>
    ))}
    </>
  )
}

export default SliderItem