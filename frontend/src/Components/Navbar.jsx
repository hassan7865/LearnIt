import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Logo from '../Utils/Logo.png'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import { mobile, tablet } from '../Responsive';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '../Redux/LoginRedux';
import { Req } from '../Url';
import Setting from './Setting';
import { Link, useNavigate } from 'react-router-dom';
import Developed from './Developed';
import { VideoEmpty } from '../Redux/VideoRedux';
const Container = styled.div`
  background-color: ${props=>props.scroll || props.type === "Video" ? "black" : "transparent"};
  transition: all ease 0.3s;
  position: relative;
  height: 8vh;
  z-index: 99;
  display: flex;
  justify-content: space-between;
  position: ${props=>props.type === "Video" ? "sticky":"fixed"};
  top: ${props=>props.type === "Video" && "0"};
  width: 100%;
  padding:10px 0px 10px 0px;
  color: white;
  align-items: center;
   ${mobile({
    padding: "0"
})}
`
const LogoS = styled.img`
height: 8vh;
${mobile({
    height: "4vh"
})}
`
const Profile = styled.img`
height:40px ;
width: 40px;
border-radius: 50%;
object-fit: cover;
${mobile({
    height: "30px",
    width: "30px"
})}
`
const Left = styled.div`
display: flex;
align-items: center;
margin-left: 2vw;
gap: 2vw;
`
const Right = styled.div`
display: flex;
align-items: center;
gap:20px;
margin-right: 2vw;
`
const Nav = styled.div`
display: flex;
gap: 1vw;
${mobile({
    display: "none"
})}
${tablet({
    display: "none"
})}
`
const Route = styled.div`
cursor: pointer;
`

const Cont = styled.div`
 position: absolute;
  right: 0px;
  width: 80px;
  margin-left: 25px;
  display: none;
  height: 100px;
  gap: 10px;
  top: 4vh;
  background-color: black;
  color: white;
  border-radius: 8px;
  ${mobile({
    top: "5vh",
    width: "80px",
    right: "0",
    height: "19vh",
    fontSize: "13px"
})}
   ${tablet({
    top: "7vh",
    width: "90px",
    right: "0",
    height: "20vh",
    fontSize: "13px"
})}
`
const Icon = styled.div`
height: 100%;
width: 100%;
display: flex;
align-items: center;
justify-content: center;
position: relative;
&:hover ${Cont}{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

}
`
const List = styled.div`
cursor: pointer;
`
const Icons = styled.div`

`
const Center = styled.div``
const Search = styled.div`
border: 1px solid white;
width:40vw;
height: 30px;
border-radius: 2px;
display: flex;
align-items: center;
justify-content: center;
${mobile({
    display: "none"
})}
${tablet({
    display:"none"
})}
`
const Input = styled.input`

width: 95%;
outline: none;
border: none;
padding-left: 5px;
background-color: transparent;
color: white;
height: 80%;
`
const IconM = styled.div`
display: flex;
align-items: center;
justify-content: center;
`
const SearchCont = styled.div`
    height: max-content;
    width: 40vw;
    z-index: 999;
    overflow:hidden;
    background-color: #222;
    position: absolute;
    top: 10vh;
    border-radius: 10px;
    box-shadow: -3px 5px 5px 0px rgba(0,0,0,0.72);
-webkit-box-shadow: -3px 5px 5px 0px rgba(0,0,0,0.72);
-moz-box-shadow: -3px 5px 5px 0px rgba(0,0,0,0.72);
${mobile({
    display:"none"
})}
${tablet({
    display:"none"
})}
`
const Result = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
padding: 10px;
cursor: pointer;
`
const LeftR = styled.div``
const RightR = styled.div`

`
const Image = styled.img`
height: 70px;
width: 130px;
object-fit: cover;
`
const ListM = styled.div`
cursor: pointer;
display:none;
    ${mobile({
    display: "flex"
})}
    ${tablet({
    display: "flex"
})}
`
const IconS = styled.div`
display: none;
${mobile({
    display: "flex",
    alignItem: "center",
    justifyContent: "center"
})}
${tablet({
    display: "flex",
    alignItem: "center",
    justifyContent: "center"
})}
`
const ResultM = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
padding: 10px;
`
const SearchContMob = styled.div`
    position: absolute;
    height: 100vh;
    width: 100vw;
    background-color: #222;
    top: 0;
    right: 0;
    z-index: 999;
    display: none;
    padding-top: 5px;
    ${mobile({
    display: "flex",
    alignItem: "center",
    flexDirection:"column"
})}
${tablet({
 display: "flex",
    alignItem: "center",
    flexDirection:"column"
})}
`
const SearchMobile = styled.input`
height: 30px;
border: none;
padding-left: 10px;
color: white;
display: flex;
align-items: center;
background-color: #333;
border-radius: 30px;
outline: none;
justify-content: center;
width:80%;
`
const Upper = styled.div`
display: flex;
justify-content: space-around;
width: 100%;
align-items: center;
margin:10px 0 10px 0;
height: 5vh;
`
const Navbar = ({type}) => {
    const user = useSelector((state)=>state.login.current)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [scroll,setscroll] = useState(false)
    window.onscroll = () => {
        setscroll(window.pageYOffset === 0 ? false : true)
        return () => (window.onscroll = null)
    }
    const [result, setresult] = useState([])
    const [video,setvideo] = useState([])
    const [open,setopen] = useState(false)
    const [openS,setopenS] = useState(false)
    const [openA,setopenA] = useState(false)
    const handleChange = (e)=>{
        const search = e.target.value
        const filtersearch = video.filter((item)=>{
            return search && (item.title).toLowerCase().startsWith(search.toLowerCase())
        })
        setresult(filtersearch)
    }
    useEffect(()=>{
        const getallvideos = async()=>{
            await Req.get("/video/allvideos")
            .then((res)=>{
                setvideo(res.data)
            })
        }
        getallvideos()
    },[])
    const handleClick=()=>{
        setopen(false)
        setresult([])
    }
    const handleLogout = ()=>{
    dispatch(Logout())
    dispatch(VideoEmpty())
    }
    return (
        <Container type={type} scroll={scroll}>
            <Left>
               <Link to="/"><LogoS src={Logo}></LogoS></Link>
                <Nav>
                    <Route onClick={()=>navigate("/myList")}>My List</Route>
                </Nav>
            </Left>
            <Center>
                <Search>
                    <Input onChange={handleChange} placeholder='Search'></Input><IconM><SearchIcon /></IconM>
                </Search>
                {result.length !==0 &&<SearchCont>
                    {result.slice(0,4).map((item) => (
                         <Link key={item._id} style={{color:"inherit",textDecoration:"none"}} to={`/video/${item._id}`}>
                        <Result>
                            <LeftR><Image src={item.imgUrl}></Image></LeftR>
                            <RightR>{item.title}</RightR>
                        </Result>
                        </Link>
                    ))}
                </SearchCont>}
                {open &&
                    <SearchContMob>
                        <Upper><ArrowBackIcon onClick={()=>handleClick()}/><SearchMobile onChange={handleChange}  placeholder='Search' ></SearchMobile></Upper>
                        {
                        result.length!==0 && 
                        result.slice(0,4).map((items)=>(
                            <Link key={items._id} style={{color:"inherit",textDecoration:"none"}} to={`/video/${items._id}`}>
                            <ResultM onClick={()=>handleClick()}>
                                <LeftR><Image src={items.imgUrl}></Image></LeftR>
                                <RightR>{items.title}</RightR>
                            </ResultM>
                            </Link>
                        ))}
                    </SearchContMob>
                }
            </Center>
            <Right>
                <IconS onClick={(e) => setopen(true)}><SearchIcon /></IconS>
                <Profile src={user?.profile}></Profile>
                <Icon>
                    <Icons><ExpandMoreIcon style={{zIndex:"99"}} /></Icons>
                    <Cont>
                        <List onClick={()=>setopenS(true)}>Account</List>
                        <ListM onClick={()=>navigate("/myList")}>Watch List</ListM>
                       <Link style={{color:"inherit",textDecoration:"none"}} to="/signin"><List onClick={()=>handleLogout()}>Logout</List></Link> 
                        <List onClick={()=>setopenA(true)}>About</List>
                    </Cont>
                </Icon>
            </Right>
            <Setting openS={openS} setopenS={setopenS}/>
            <Developed openA={openA} setopenA={setopenA}/>
        </Container>
    )
}

export default Navbar