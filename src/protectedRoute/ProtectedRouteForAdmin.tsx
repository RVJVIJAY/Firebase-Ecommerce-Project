import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRouteForAdmin({children}){
    
    const userdata=(localStorage.getItem('users'))
    const user =userdata ? JSON.parse(userdata) : null;
    if(user?.role==='admin'){
        return children
    }
    else{
        return <Navigate to={'/login'}/>
    }
  
}
