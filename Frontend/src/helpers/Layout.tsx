import React from 'react'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='h-full w-full m-0 p-0 flex flex-col'>
        <Header />
        <div className='flex flex-row'>
            <Sidebar />
            <Outlet />

        </div>

    </div>
  )
}

export default Layout