import React, { useState } from 'react'
import styled from 'styled-components'
import { mobile, tablet } from '../Responsive'
import { useDispatch } from 'react-redux'
import { LoginFailure, LoginStart, LoginSuccess } from '../Redux/LoginRedux'
import { Req } from '../Url'
import Loader from '../Components/Loader'
import { Link} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Container = styled.div`
height: 100vh;
overflow: hidden;
position: relative;
width: 100%;
display: flex;
align-items: center;
justify-content: center;
background-color: black;
`
const Image = styled.img`
object-fit: cover;
height: 100%;
opacity: 0.8;
width: 100%;
${mobile({
    display: "none"
})}
${tablet({
    display: "none"
})}
`
const Wrapper = styled.div`
color: white;
position: absolute;
width: 20%;
gap: 10px;
height: max-content;
display: flex;
background-color: rgba(0,0,0,0.6);
border-radius: 5px;
flex-direction: column;
padding: 30px;
${mobile({
    width: "80%"
})}
${tablet({
    width: "60%"
})}
`
const Head = styled.h1``
const Form = styled.form`
display: flex;
flex-direction: column;
gap: 20px;
`
const Input = styled.input`
height: 8vh;
background-color: #333;
border: none;
outline: none;
color: #fff;
font-size: 14px;
border-radius: 5px;
padding-left: 8px;
`
const Button = styled.button`
background-color: #e50914;
height: 8vh;
border: none;
border-radius: 5px;
color: white;
font-size: 14px;
`
const Text = styled.div`
 color: #838383;
 display: flex;
 font-size: 13px;
`
const TextM = styled.span`
color: white;
font-size: 14px;

`
const Signin = () => {
    const dispatch = useDispatch()
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [load, setload] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(LoginStart())
        setload(true)
        await Req.post("/auth/signin", { username, password })
            .then((res) => {
                if (res.status === 200) {
                    dispatch(LoginSuccess(res.data))
                    setload(false)
                    window.location.reload()
                }
            }).catch((err) => {
                setload(false)
                if (err.response.data === "user") {
                    toast.error('Username not Found', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                }
                if (err.response.data === "password") {
                    toast.error('Password is incorrect', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                }
                dispatch(LoginFailure())
            })

    }
    return (
        <Container>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            {/* Same as */}
            {load ? <Loader /> : <>
                <Image src='https://www.boriszaikin.com/assets/images/posts/featuring-news.png'></Image>
                <Wrapper>
                    <Head>Sign In</Head>
                    <Form onSubmit={handleSubmit}>
                        <Input type="text" onChange={(e) => setusername(e.target.value)} placeholder='Username' required></Input>
                        <Input type="password" onChange={(e) => setpassword(e.target.value)} placeholder='Password' required></Input>
                        <Button type='submit'>Sign In</Button>
                    </Form>
                    <Text>New to Learn It<Link to="/signup"><TextM>Create An Account</TextM></Link></Text>
                </Wrapper>
            </>}
        </Container>
    )
}

export default Signin