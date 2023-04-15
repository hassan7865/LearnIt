import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { mobile, monitor, tablet } from '../Responsive'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Loader from './Loader'
import PostReviews from './PostReviews';
import { useDispatch, useSelector } from 'react-redux';
import { Req } from '../Url';
import { AddReviews } from '../Redux/VideoRedux';
const Container = styled.div`
margin-top: 30px;
${mobile({
  height:"50vh",
  padding: "0 10px 10px 10px",
  overflow:"scroll",
  backgroundColor:"black"
})}
${tablet({
  height:"50vh",
  padding: "0 10px 10px 10px",
  overflow:"scroll",
  backgroundColor:"black"
})}
${monitor({
  height:"50vh",
  padding: "0 10px 10px 10px",
  backgroundColor:"black"
})}
`
const Profile = styled.img`
width: 50px;
height: 50px;
border-radius: 50%;
object-fit: cover;
${mobile({
  width:"40px",
  height:"40px"
})}
${tablet({
  width:"40px",
  height:"40px"
})}
${monitor({
  width:"40px",
  height:"40px"
})}
`
const Input = styled.input`
width: 100%;
height: 30px;
background-color:black;
color: white;
font-size: 15px;
border: none;
border-bottom: 1px solid gray;
outline: none;
${mobile({
  width:"100%",
  backgroundColor:"#333",
  border:"none",
  paddingLeft:"5px",
  fontSize:"12px"
})}
${tablet({
  width:"100%",
  backgroundColor:"#333",
  border:"none",
  paddingLeft:"5px",
  fontSize:"12px"
})}
${monitor({
    width:"80%",
  backgroundColor:"#333",
  border:"none",
  paddingLeft:"5px",
  fontSize:"12px"
})}
`
const Button = styled.button`
background-color: black;
color: white;
border: none;
width: 55px;
border-radius: 2px;
`
const Wrapper = styled.div`
display: flex;
align-items: center;
gap: 20px;
${mobile({
  borderBottom:"1px solid gray",
  paddingBottom:"10px"
})}
${tablet({
  borderBottom:"1px solid gray",
  paddingBottom:"10px"
})}
${monitor({
  borderBottom:"1px solid gray",
  paddingBottom:"10px"
})}
`
const Upper = styled.div`
display:none;
${mobile({
  display: "flex",
  padding: "0px 5px 20px 5px",
alignItems: "center",
justifyContent: "space-between"
})}
${tablet({
   display: "flex",
  padding: "0px 5px 20px 5px",
alignItems: "center",
justifyContent: "space-between"
})}
${monitor({
   display: "flex",
  padding: "0px 5px 20px 5px",
alignItems: "center",
justifyContent: "space-between"
})}

`
const Head = styled.p`
font-size: 18px;
font-weight: 500;
`
const Close = styled.div`

`
const Form = styled.form`
display: flex;
width: 100%;
`
const Reviews = ({setopen}) => {
  const dispatch = useDispatch()
  const State = useRef("")
  const current = useSelector((state)=>state?.login?.current)
  const video = useSelector((state) => state?.video?.video)
  const comment = video?.comments
  const [desc,setdesc] = useState("")
  const [load,setload] = useState(false)
  const AddReview =async(e)=>{
    e.preventDefault()
    setload(true)
    await Req.put(`video/addreview/${video._id}`,{
      username:current.username,
      profile:current.profile,
      desc:desc,
      date:new Date()
    }).then((res)=>{
      if(res.status === 200){
        dispatch(AddReviews({
          username:current.username,
          profile:current.profile,
          desc:desc,
          date:new Date()
        }))
        State.current.reset()
        setload(false)
      }
    })
  }
  return (
    <>
    <Container>
      <Upper><Head>Comments</Head><Close><CloseOutlinedIcon style={{fontWeight:"300"}} onClick={()=>setopen(false)}/></Close></Upper>
        <Wrapper>
            <Profile src={current?.profile}></Profile>
            <Form ref={State}  onSubmit={AddReview}>
            <Input required onChange={(e)=>setdesc(e.target.value)} placeholder='Add New Comment'></Input>
            <Button type="submit">{load ? <Loader type="send"/>:<SendOutlinedIcon/>}</Button>
            </Form>
        </Wrapper>
        {comment && comment.map((items,index)=>(
        <PostReviews items={items} index={index}/>
        ))}
    </Container>
   
    </>
  )
}

export default Reviews