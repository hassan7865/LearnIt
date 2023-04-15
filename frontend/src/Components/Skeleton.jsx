import React from 'react'
import styled from 'styled-components'
import { mobile, tablet } from '../Responsive'


const SkeletonS = styled.div`
width: max-content;
${mobile({
    width: "maxContent",
    overflow: "hidden"
})}

`
const Cont = styled.div`
    width: 24.9vw;
    margin-right:5px;
    height: 32vh;
    margin-top: 5px;
    background-color: #333;
    animation: skeleton 1s ease infinite alternate;
    ${mobile({
    height: "100px",
    width: "180px"
})}
    ${tablet({
    height: "100px",
    width: "180px"
})}
    @keyframes skeleton {
    to{
        opacity: 0.5;
    }
}
`
const ContHead = styled.div`
    width: 15%;
    display: ${props=>props.type === "Random" && "none"};
    height: 20px;
    background-color: #333;
    margin-bottom: 15px;
    margin-top: 10px;
    animation: skeleton 1s ease infinite alternate;
    ${mobile({
    width: "25%"
})}
@keyframes skeleton {
    to{
        opacity: 0.5;
    }
}
`
const SkelCont = styled.div`
    display: flex;
 
`
const Skeleton = ({type}) => {

    return (
        <SkeletonS>
            <ContHead type={type}></ContHead>
            <SkelCont>
                <Cont></Cont>
                <Cont></Cont>
                <Cont></Cont>
            </SkelCont>
        </SkeletonS>
    )
}

export default Skeleton