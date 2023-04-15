import {createSlice} from '@reduxjs/toolkit'

const LoginSlice = createSlice({
    name:"login",
    initialState:{
        current:null,
        err :false
    },
    reducers:{
        LoginStart:(state)=>{
            state.current = null
            state.err = false
        },
        LoginSuccess:(state,action)=>{
            state.current = action.payload
            state.err = false
        },
        LoginFailure:(state)=>{
            state.current = null
            state.err = true
        },
        Logout:(state)=>{
            state.current = null
            state.err = false
        },
        ProfileUpdate:(state,action)=>{
            state.current.profile = action.payload
        },
        AddWatchList:(state,action)=>{
            if(!state.current.myList.includes(action.payload)){
                state.current.myList.push(action.payload)
            }
        },
        NotAddWatchList:(state,action)=>{
            if(state.current.myList.includes(action.payload)){
                state.current.myList.splice(
                    state.current.myList.findIndex(
                        (videoId)=>videoId === action.payload
                    ),1
                )
            }
        }
    }
})
export const {LoginStart,LoginSuccess,LoginFailure,Logout,AddWatchList,NotAddWatchList,ProfileUpdate} = LoginSlice.actions
export default LoginSlice.reducer