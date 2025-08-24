import React from 'react'
import { Outlet } from 'react-router'

const PrivateRoute = ({allowedRoles}) => {
  return (
    allowedRoles.includes("admin") &
    <Outlet/>
  )
}

export default PrivateRoute