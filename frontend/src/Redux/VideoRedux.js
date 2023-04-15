import {createSlice} from '@reduxjs/toolkit'

const VideoSlice = createSlice({
    name:"video",
    initialState:{
        video:null,
        err :false
    },
    reducers:{
        VideoSuccess:(state,action)=>{
            state.video = action.payload
            state.err = false
        },
        VideoFailure:(state)=>{
            state.video = null
            state.err = true
        },
        AddReviews:(state,action)=>{
            state.video.comments.push(action.payload)
        },
        DeleteReviews:(state,action)=>{
            state.video.comments.splice(action.payload,1)
        },
        AddLike:(state,action)=>{
            if(!state.video.like.includes(action.payload)){
                state.video.like.push(action.payload)
            }
        },
        DisLike:(state,action)=>{
            if(state.video.like.includes(action.payload)){
                state.video.like.splice(
                    state.video.like.findIndex(
                        (userId)=>userId === action.payload
                    ),1
                )
            }
        },
        VideoEmpty:(state)=>{
            state.video = null
            state.err = false
        }
    }
})
export const {VideoSuccess,VideoFailure,AddReviews,DeleteReviews,AddLike,DisLike,VideoEmpty} = VideoSlice.actions
export default VideoSlice.reducer