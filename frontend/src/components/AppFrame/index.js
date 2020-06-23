// @Vendors
import React from 'react'
import { Helmet } from "react-helmet"

// @Components
import Header from 'components/Header'
import Footer from 'components/Footer'

// @Statics > Icon
import Logo from 'statics/images/logos/juventud.png'
import './index.scss'

function index({ title = "Not title assigned", children, user = {}, onLogout} = {}) {
    return (
        <div className="app--frame">
            <Helmet> 
                <link rel="icon" href={Logo} type="image/gif" sizes="16x16" />
                <title>{title} - CRS</title> 
            </Helmet>
            <Header user={user} onLogout={onLogout}/>
            <main role="main" className="container--row">
                <div className="main--content row">
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default React.memo(index)