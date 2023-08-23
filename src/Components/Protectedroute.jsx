import React from 'react'
import { Navigate } from 'react-router-dom';

export default function Protectedroute(props) {
if(localStorage.getItem("mosaweq-new-user") === null){
    return <Navigate to="/signin"  />
}else {
    return props.children
}
}
