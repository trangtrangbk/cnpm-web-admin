import React, { useReducer, useEffect } from 'react';
import BlockImage from "./accessDenied.png"

export default function ForbiddenPage() {

  return (
    <div style={{fontWeight:"600", fontSize:"40px",textAlign:"center", margin:"200px auto", color : "red"}}>
        <div>ACCESS DENIED!</div>
        <img src={BlockImage} />
    </div>
  )
}