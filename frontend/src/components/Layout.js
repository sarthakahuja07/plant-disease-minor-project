import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'

const Layout = () => {

    return (
        <div>
            <NavBar />
            <div className="main-content">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Layout
