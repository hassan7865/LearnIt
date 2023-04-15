import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import OutlinedFlagSharpIcon from '@mui/icons-material/OutlinedFlagSharp';
import moment from 'moment';
import { mobile } from '../Responsive';
import { useDispatch, useSelector } from 'react-redux';
import { Req } from '../Url';
import {  DeleteReviews } from '../Redux/VideoRedux';
const Container = styled.div`
margin-top: 30px;
`
const Wrapper = styled.div`
display: flex;
justify-content: space-between;
`
const Profile = styled.img`
width: 50px;
height: 50px;
border-radius: 50%;
object-fit: cover;
`
const Left = styled.div``
const Right = styled.div`
`
const User = styled.div`
display: flex;
align-items: center;
gap: 10px;
`
const Name = styled.p`
font-size: 13px;
${mobile({
    fontSize: "12px"
})}
`
const Date = styled.p`
color: #a7a7a7;
font-size: 13px;
${mobile({
    fontSize: "12px"
})}
`
const Desc = styled.p`
font-size: 15px;
margin-top: 5px;
${mobile({
    fontSize: "12px"
})}
`

const Cont = styled.div`
    position: absolute;
    background-color: black;
    align-items: center;
    justify-content: center;
    width: 100px;
    display: none;
    justify-content: center;
    border-radius: 5px;
    height: 50px;
    border: 1px solid #3d3d3d;
    ${mobile({
    right: "1px",
    height: "30px",
    fontSize: "12px",
    width: "80px"
})}
`
const Icon = styled.div`
position: relative;
&:hover ${Cont}{
    display: flex;
}
`
const Wrap = styled.div`
display: flex;
gap: 20px;
align-items: center;
`
const Text = styled.div`
display: flex;
cursor: pointer;
align-items: center;
gap: 5px;
justify-content: center;
`
const PostReviews = ({items,index}) => {
    const dispatch = useDispatch()
    const [current,setcurrent] = useState([])
    const video = useSelector((state) => state?.video?.video)
    const user = useSelector((state)=>state?.login?.current)
    const handleDelete = async(index)=>{
        dispatch(DeleteReviews(index))
        await Req.put(`/video/deletereview/${video._id}/${index}`)
    }
    useEffect(()=>{
        const getuser = async()=>{
            await Req.get(`/user/finduser/${items.username}`)
            .then((res)=>{
                if(res.status === 200){
                setcurrent(res.data)
                }
            })
        }
        getuser()
    })
    return (
        <>
                <Container>
                    <Wrapper>
                        <Wrap>
                            <Left>
                                <Profile src={current.profile}></Profile>
                            </Left>
                            <Right>
                                <User>
                                    <Name>{current.username}</Name>
                                    <Date>{moment(items.date).fromNow()}</Date>
                                </User>
                                <Desc>{items.desc}</Desc>
                            </Right>
                        </Wrap>
                        <Icon><MoreVertIcon />
                            <Cont>
                              {items.username === user.username ? <Text onClick={()=>handleDelete(index)}><DeleteOutlinedIcon style={{color:"white"}}/>Delete</Text>:<Text><OutlinedFlagSharpIcon style={{color:'white'}}/>Report</Text>}
                            </Cont>
                        </Icon>
                    </Wrapper>
                </Container>
        </>
    )
}
export default PostReviews