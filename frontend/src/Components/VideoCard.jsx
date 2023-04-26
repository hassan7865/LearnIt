import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { mobile, tablet } from '../Responsive';
import { Req } from '../Url';
import moment from "moment"
import { Link} from 'react-router-dom';
const Container = styled.div`
flex: 1;
`
const Wrapper = styled.div`
display: flex;
gap: 10px;
padding: 0 20px 10px 20px;
cursor: pointer;
${mobile({
  padding:"10px 5px 0px 5px",
  flexDirection:"column"
})}
`
const Image = styled.img`
width: 200px;
height: 100px;
object-fit: cover;
border-radius: 10px;
${mobile({
  width:"100%",
  borderRadius:"0px",
  height:"180px"
})}
`
const Title = styled.p`

`
const Upload = styled.p`
color: #757575;
font-size: 12px;
margin-top: 15px;
${mobile({
  marginTop:"5px"
})}
${tablet({
marginTop:"5px"
})}
`
const Info = styled.div`
    
`
const Views = styled.div`
color: #757575;
margin-top: 8px;
font-size: 12px;
display: flex;
align-items: center;
gap:5px;
${mobile({
  marginTop:"5px"
})}
${tablet({
    marginTop:"5px"
})}
;
`
const VideoInfo = styled.div`
  ${mobile({
    display:"flex",
    alignItems:"center",
    gap:"10px"
  })}
`
const VideoCard = () => {
  const [video,setvideo] = useState([])
  useEffect(()=>{
    const getvideos = async()=>{
      await Req.get("/video/allvideos")
      .then((res)=>{
        setvideo(res.data)
      })
    }
    getvideos()
  },[])
  const AddView = async(id)=>{
    await Req.put(`/video/view/${id}`)
  }
  return (
   <Container>
    {video.slice(0,10).map((items)=>(
      <Link to={`/video/${items._id}`} key={items._id} style={{textDecoration:"none",color:"inherit"}}>
    <Wrapper  onClick={()=>AddView(items._id)}>
        <Image src={items.imgUrl}></Image>
        <Info>
        <Title>{items.title}</Title>
        <VideoInfo>
        <Upload>{moment(items.createdAt).fromNow()}</Upload>
        <Views><VisibilityOutlinedIcon style={{fontSize:"20px"}}/>{items.views.length}</Views>
        </VideoInfo>
        </Info>
    </Wrapper>
    </Link>
    ))}
   </Container>
  )
}

export default VideoCard