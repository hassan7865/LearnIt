import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import app from '../Firebase';
import { Req } from '../Url';
import { ProfileUpdate } from '../Redux/LoginRedux';
import { mobile } from '../Responsive';
const Container = styled.div`
     position: absolute;
    top: 2vh;
    right: 0.5vw;
    height: 300px;
    width: 250px;
    background-color:#333;
    ${mobile({
      width:"200px",
    })}
`
const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 50vh;
    width: 100%;
    margin-top: 20px;
`
const Profile = styled.img`
height: 100%;
width: 100%;
border-radius: 50%;
object-fit: cover;
border: 3px solid #222222;
`
const ImageContainer = styled.div`
height: 130px;
width: 130px;
position: relative;
margin-bottom: 20px;
${mobile({
      height:"100px",
      width:"100px"
    })}
`
const Email = styled.p`
margin-top: 5px;
font-size: 15px;
${mobile({
      fontSize:"12px"
    })}
`
const Username = styled.p`
font-weight: 600;
`
const Icon = styled.div`
height: 35px;
width: 35px;
position: absolute;
background-color: gray;
display: flex;
align-items: center;
justify-content: center;
right: 0;
bottom: 0;
border-radius: 50%;
`

const Label = styled.label`
cursor: pointer;
`
const ImageInput = styled.input`
`
const Lower = styled.div`
   display: flex;
  align-items:center;
  gap: 5px;
  margin-top: 8px;
`
const Badge = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #22b822;
`
const Loader = styled.span`
width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  background: linear-gradient(0deg, rgba(255, 61, 0, 0.2) 33%, #ff3d00 100%);
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  &:after {
  content: '';  
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #333;
  }
  @keyframes rotation {
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg)}
} 
`
const Cont = styled.div`
  height: 100%;
  width: 100%;
  background-color: #333;
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Setting = ({openS,setopenS}) => {
    const dispatch = useDispatch()
    const [img,setimg] = useState(null)
    const [success,setsuccess] = useState(true)
    const [profile,setprofile] = useState(null)
    const user = useSelector((state)=>state.login.current)
    const UploadFile = (file)=>{
        const fileName = new Date().getTime()+file?.name
        const storage = getStorage(app);
        const storageRef = ref(storage, `${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    progress === 100 && setsuccess(false)
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      default:
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    setprofile(downloadURL)
    });
  }
        )
    }
    useEffect(()=>{img && UploadFile(img)},[img])
    const UpdateProfile = async()=>{
      
        await Req.put("/user/updateprofile",{profile})
        .then((res)=>{
            if(res.status===200){
              setsuccess(true)
            }
        })
    }
    if (profile){
        
        dispatch(ProfileUpdate(profile))
        UpdateProfile()
        
    }
  return (
    <>
   {openS && <Container>
     {success ? <Wrapper>
        <ArrowBackRoundedIcon onClick={()=>setopenS(false)} style={{marginRight:"80%"}}/>
            <ImageContainer>
            <Profile src={user?.profile}></Profile>
            <ImageInput id='file' style={{display:"none"}} type="file" onChange={(e)=>setimg(e.target.files[0])}></ImageInput>
            <Label htmlFor='file'><Icon><CameraAltRoundedIcon/></Icon></Label>
            </ImageContainer>
            <Username>{user?.username}</Username>
            <Email>{user?.email}</Email>
            <Lower>
              <Badge></Badge>
              Online
            </Lower>
        </Wrapper>:<Cont><Loader/></Cont>}
    </Container>}
    </>
  )
}

export default Setting