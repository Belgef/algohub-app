import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <>
        <p>Navbar</p>
        <Outlet />
        <p>Footer</p>
    </>
  )
}

export default AppLayout