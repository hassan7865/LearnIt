import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Navbar from '../Components/Navbar'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VideoCard from '../Components/VideoCard'
import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import moment from 'moment';
import { mobile, monitor, tablet } from '../Responsive'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import DoneIcon from '@mui/icons-material/Done';
import Reviews from '../Components/Reviews';
import { Req } from '../Url';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AddLike, DisLike, VideoFailure, VideoSuccess } from '../Redux/VideoRedux';
import { AddWatchList, NotAddWatchList } from '../Redux/LoginRedux';
import Footer from '../Components/Footer';
const Container = styled.div`
height:100%;
background-color: black;
color: white;
display: flex;
padding: 20px;
${mobile({
  flexDirection: "column",
  padding: "0",
})}
${tablet({
  padding: "0",
  flexDirection: "column",
})}
${monitor({
  flexDirection: "column"
})}
`
const Wrapper = styled.div`
flex: 2;

`
const VideoCont = styled.video`
height: 450px;
width: 100%;
${mobile({
  height: "40vh",
  objectFit: "contain"
})}
${tablet({
  height: "50vh",
  objectFit: "contain"
})}
`
const Title = styled.p`
padding-left: 10px;
margin-top: 10px;
`
const Views = styled.p`
display: flex;
align-items: center;
gap: 5px;
`
const Upload = styled.p``
const VideoInfo = styled.div`
padding:0 10px 0 10px;
display: flex;
align-items: center;
justify-content: space-between;
color: #a5a5a5;
margin-top: 5px;
${mobile({
  fontSize: "12px"
})}
${tablet({
  fontSize: "13px"
})}
`
const ViewsUpload = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  ${mobile({
  gap: "5px"
})}
${tablet({
  gap: "5px"
})}
`
const Like = styled.div`
display: flex;
cursor: pointer;
align-items: center;
gap: 5px;
`
const Button = styled.button`
display: flex;
align-items: center;
background-color: #333;
color: white;
cursor: pointer;
gap: 5px;
border: none;
padding: 5px 10px 5px 5px;
border-radius: 10px;
`
const Icon = styled.div`
display: flex;
gap:20px;
align-items: center;
`
const Description = styled.div`
margin-top: 30px;
padding: 20px;
border-radius: 10px;
background-color: #333;
${mobile({
  display: props => props.type && "none"
})}
${tablet({
  display: props => props.type && "none"
})}
${monitor({
  display: props => props.type && "none"
})}
`
const Desc = styled.p`
font-weight: 300;
font-size: 15px;
color: white;
`
const MoreText = styled.span``
const ShowMore = styled.span`
  font-weight: 600;
  margin-left: 20px;
  cursor: pointer;
  display: ${props => props.type && "none"};
`
const ShowLess = styled.div`
  font-weight: 600;
  margin-top: 5px;
  cursor: pointer;
`
const VideoCardCont = styled.div`
${mobile({
  margin: "0",
  display: props => props.type && "none"
})}
${tablet({
  display: props => props.type && "none"
})}
${monitor({
  display: props => props.type && "none"
})}
`
const ReviewsCont = styled.div`
display: none;
${mobile({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "20px",
  backgroundColor: "#222",
  padding: "10px"
})}
${tablet({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "20px",
  backgroundColor: "#222",
  padding: "10px"
})}
${monitor({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "20px",
  backgroundColor: "#222",
  padding: "10px"
})}
`
const ReviewsComp = styled.div`
  ${mobile({
  display: "none"
})}
  ${tablet({
  display: "none"
})}
  ${monitor({
  display: "none"
})}
`
const Video = () => {
  const location = useLocation().pathname.split("/")[2]
  const current = useSelector((state)=>state.login.current)
  const dispatch = useDispatch()
  const [showmore, setshowmore] = useState(false)
  const [open, setopen] = useState(false)
  useEffect(() => {
    const getvideo = async () => {
      await Req.get(`/video/searchvideo/${location}`)
        .then((res) => {
          dispatch(VideoSuccess(res.data))
        }).catch(() => {
          dispatch(VideoFailure())
        })
    }
    getvideo()
  }, [location,dispatch])
  const video = useSelector((state) => state.video.video)
  const LikeVid = async()=>{
    dispatch(AddLike(current._id))
    await Req.put(`/video/videolike/${video?._id}`)
  }
  const Dislike = async()=>{
    dispatch(DisLike(current._id))
    await Req.put(`/video/videodislike/${video?._id}`)
  }
  const AddList = async()=>{
    dispatch(AddWatchList(video?._id))
    await Req.put(`/user/videolist/${video?._id}`)
  }
  const MinusList = async()=>{
    dispatch(NotAddWatchList(video?._id))
    await Req.put(`/user/Minvideolist/${video?._id}`)
  }
  const a = video?.description
  return (
    <>
      <Navbar type="Video" />
      <Container>
        <Wrapper>
          <VideoCont src={video?.videoUrl} autoPlay controls />
          <Title>{video?.title}</Title>
          <VideoInfo>
            <ViewsUpload>
              <Upload>{moment(video?.createdAt).fromNow()}</Upload>
              <Views><VisibilityOutlinedIcon style={{ fontSize: "18px" }} />{video?.views?.length}</Views>
            </ViewsUpload>
            <Icon>
              {video?.like?.includes(current?._id)?<Like><FavoriteIcon onClick={()=>Dislike()} style={{color:"red"}}/>Liked</Like>:<Like><FavoriteBorderOutlinedIcon onClick={()=>LikeVid()} style={{ justifySelf: "flex-end" }} />Like</Like>}
              {current.myList.includes(video?._id) ?<Button onClick={()=>MinusList()}><DoneIcon style={{color:"#43ff32"}} />Watch List</Button >:<Button onClick={()=>AddList()}><AddIcon  />Watch List</Button>}
            </Icon>
          </VideoInfo>
          {!open ?
            <><Description type={open}>
              <Desc >
                {a?.slice(0, 220)}<ShowMore onClick={() => setshowmore(true)} type={showmore}><br></br>Show More</ShowMore>
                {showmore && <MoreText>{a?.slice(200, a?.length)}<ShowLess onClick={() => setshowmore(false)}>Show Less</ShowLess></MoreText>}
              </Desc>
            </Description><ReviewsComp><Reviews /></ReviewsComp></> : <Reviews setopen={setopen} />}
          {!open && <ReviewsCont>Comments<UnfoldMoreIcon onClick={() => setopen(true)} /></ReviewsCont>}
        </Wrapper>
        <VideoCardCont type={open}>
          <VideoCard />
        </VideoCardCont>
      </Container>
      <Footer/>
    </>
  )
}

export default Video