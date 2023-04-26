import React, { useEffect, useState } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import styled from 'styled-components'
import AddIcon from '@mui/icons-material/Add';
import { mobile, tablet } from '../Responsive'
import DoneIcon from '@mui/icons-material/Done';
import { Link } from 'react-router-dom';
import { Req } from '../Url';
import { useDispatch, useSelector } from 'react-redux';
import { AddWatchList, NotAddWatchList } from '../Redux/LoginRedux';
const Container = styled.div`

`
const ImageContainer = styled.div`
width: 100%;
height: 100vh;
background-color: black;
z-index: 999;
${mobile({
  height:"35vh"
})}
${tablet({
  height:"40vh"
})}
`
const Image = styled.img`
width:100% ;
height:100%;
opacity: 0.5;
object-fit: cover;
`
const Cont = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  gap: 40px;
  top: 0;
  margin-left: 20px;
  flex-direction: column;
  bottom: 0;
  ${mobile({
    height: "35vh",
    gap:"20px"
  })}
  ${tablet({
  height:"44vh",
  gap:"5px"
})}
`
const Head = styled.h1`
font-weight: 500;
color:#FFFF;
font-size: 6vw;
`
const Desc = styled.p`
width: 50%;
color: white;
${mobile({
  display:"none"
})}
${tablet({
  fontSize:"12px",
  width:"80%"
})}
`
const Buttons = styled.div`
display: flex;
gap: 5px;
`
const Button = styled.button`
display: flex;
cursor: pointer;
width:${props=>props.type === "list" ? "150px":"100px"};
align-items: center;
gap: 5px;
font-size: 16px;
justify-content: center;
height: 35px;
background-color: ${props=>props.type === "list" ? "rgba(109, 109, 110, 0.7)":"white"};
color:${props=>props.type === "list" ? "white":"black"} ;
border: none;
border-radius: 5px;
${mobile({
  width:props=>props.type === "list" ? "100px":"60px",
  fontSize:"12px",
  gap:"0px"
})}
${tablet({
  width:props=>props.type === "list" ? "90px":"60px",
  fontSize:"12px",
})}
`
const Skeleton = styled.div`
height: 100vh;
width: 100%;
background-color: #333;
animation: skeleton 0.8s ease infinite alternate;
${mobile({
        height:"30vh"
    })}
${tablet({
  heigth:"40vh"
})}
@keyframes skeleton {
  to{
  opacity: 0.6;
}
}
`
const FeaturedVideo = () => {
  const [fetch,setfetch] = useState([])
  const dispatch = useDispatch()
  useEffect(()=>{
    const getvideo = async()=>{
      try{
      const res = await Req.get("/video/allvideos")
      setfetch(res.data)
      }
      catch{

      }
    }
    getvideo()
  },[])
    const AddView = async(id)=>{
      await Req.put(`/video/view/${id}`)
    }
    const current = useSelector((state)=>state?.login.current)
    const AddList = async(id)=>{
      dispatch(AddWatchList(id))
      await Req.put(`/user/videolist/${id}`)
    }
    const MinusList = async(id)=>{
      dispatch(NotAddWatchList(id))
      await Req.put(`/user/Minvideolist/${id}`)
    }
    const fetchrandom = Math.floor(Math.random() * fetch.length)
    const fetchvid = fetchrandom!==0 && fetch[fetchrandom]
  return (
    <>
   {fetch && fetchvid ?
   
   <Container key={fetchvid._id}>
    <ImageContainer>
        <Image src={fetchvid.imgUrl}></Image>
        <Cont>
          <Head>{fetchvid.title}</Head>
          <Desc>{fetchvid.description}</Desc>
          <Buttons>
            <Link to={`video/${fetchvid._id}`} style={{textDecoration:"none"}}>
            <Button onClick={()=>AddView(fetchvid._id)}><PlayArrowIcon/>Play</Button>
            </Link>
            {current.myList.includes(fetchvid._id) ?
            <Button type='list'><DoneIcon style={{color:"#43ff32"}} />Watch List</Button >:
            <Button type='list' 
            onClick={e => {
              e.preventDefault()
              AddList(fetchvid._id)}}><AddIcon  />Watch List</Button>}
          </Buttons>
        </Cont>
    </ImageContainer>
   </Container>:<Skeleton></Skeleton>
   }
   </>
  )
}

export default FeaturedVideo