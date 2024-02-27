import React from 'react'
import { Outlet,Navigate } from "react-router-dom"

const SecureDashboardRoute = () => {
    let auth=window.localStorage.getItem("token") && window.localStorage.getItem("token")!==""? window.localStorage.getItem("token"):null
        return(
            <>
            {auth ? <Outlet/> : <Navigate to="/signup"/>}
            </>
        )
}

export const SecureAuthRoute=()=>{
    let token=window.localStorage.getItem("token") && window.localStorage.getItem("token")!=""
    return(
        <>
        {!token?<Outlet/>:<Navigate to="/dashboard"/>}
        </>
    )

}

export default SecureDashboardRoute
