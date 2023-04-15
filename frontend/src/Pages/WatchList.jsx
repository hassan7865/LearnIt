import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Navbar from '../Components/Navbar'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { mobile } from '../Responsive';
import { Req } from '../Url';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { NotAddWatchList } from '../Redux/LoginRedux';
import Footer from '../Components/Footer';
import LoaderButton from '../Components/LoaderButton';

const Container = styled.div`
  height: ${props=>props.type === 1 || props.type === 0 ? "100vh" : "100%"};
  background-color: #222;
  padding: 20px;
`
const Wrapper = styled.div`
width:100%;
margin-bottom: 20px;
display: flex;
${mobile({
  flexDirection:"column"
})}
`
const Left = styled.div`
width: 100%;
height: 100%;
flex: 1;
padding: 20px;
${mobile({
  padding:"0px"
})}
`
const Right = styled.div`
flex: 2;
padding: 20px;
justify-content: center;
${mobile({
  padding:"0"
})}

`
const Image = styled.img`
width: 100%;
height: 100%;
`
const Head = styled.h1`
color: white;
font-weight: 500;
font-size: 50px;
${mobile({
  fontSize:"30px"
})}
`
const VideoInfo = styled.div`
  display: flex;
  font-weight: 300;
color: #a5a5a5;
align-items: center;
margin-top: 10px;
gap: 10px;
`
const Date = styled.p``
const Views = styled.p`
display: flex;
align-items: center;
gap: 5px;
`
const Like  = styled.p`
display: flex;
align-items: center;
gap: 5px;
`
const Buttons = styled.div`
margin-top: 50px;
display: flex;
gap: 10px;
${mobile({
  marginTop:"10px"
})}
`
const Button = styled.button`
width: 150px;
cursor: pointer;
height: 40px;
font-size: 15px;
background-color:${props=>props.type === "1" ? "black" :"white"};
color: ${props=>props.type === "1" ? "white" :"black"};
border: none;
border-radius: 5px;
`
const Warn = styled.h1`
color: white;
font-weight: 300;
text-align: center;
margin-top: 100px;
`
const WatchList = () => {
  const dispatch = useDispatch()
  const [mylist,setmylist] = useState([])
  const [load,setload] = useState(false)
  useEffect(()=>{
    const getmylist = async()=>{
      await Req.get("/video/list")
      .then((res)=>{
          setmylist(res.data)
      })
    }
    getmylist()
  })
  const MinusList = async(id)=>{
    setload(true)
    dispatch(NotAddWatchList(id))
    await Req.put(`/user/Minvideolist/${id}`)
    .then((res)=>{
      if(res.status === 200){
        setload(false)
      }
    })
  }
  
  const navigate = useNavigate()
  const Remove = ()=>{
    return(
      <p>Remove From List</p>
    )
  }
  return (
    <>
    <Navbar type="Video"/>
    
   <Container type={mylist.length}>
   {mylist.length !==0?
   mylist.map((items)=>(
    <Wrapper key={items._id}>
      <Left>
        <Image src={items.imgUrl}></Image>
      </Left>
      <Right>
        <Head>{items.title}</Head>
        <VideoInfo>
          <Date>{moment(items?.createdAt).fromNow()}</Date>
          <Views><VisibilityOutlinedIcon/>{items.views.length}</Views>
          <Like><FavoriteIcon style={{color:'#ff2679'}}/>{items.like.length}</Like>
        </VideoInfo>
        <Buttons>
          <Button onClick={()=>navigate(`/video/${items._id}`)} type='1'>Play</Button>
          <Button onClick={()=>MinusList(items._id)} type='2'>{load ? <LoaderButton/>:<Remove/>}</Button>
        </Buttons>
      </Right>
    </Wrapper>
       )):<Warn>No Videos in Watch List</Warn>}
   </Container>
   <Footer/>
   </>
  )
}

export default WatchList