import axios from 'axios'
const BASEURL = "/api"
const User = JSON.parse(localStorage.getItem("persist:root"))?.login
const currentuser = User && JSON.parse(User)?.current
const token = currentuser?.token
export const  Req = axios.create({
    baseURL:BASEURL,
    headers:{token:`Bearer ${token}`}
})