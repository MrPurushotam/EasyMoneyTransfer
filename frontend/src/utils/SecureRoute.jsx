import React from 'react'
import { Outlet,Navigate } from "react-router-dom"

const SecureRoute = () => {
    let auth=window.localStorage.getItem("token") && window.localStorage.getItem("token")!==""? window.localStorage.getItem("token"):null
        return(
            <>
            {auth ? <Outlet/> : <Navigate to="/signup"/>}
            </>
        )
}

export default SecureRoute
