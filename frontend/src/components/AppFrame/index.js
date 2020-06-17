// @Vendors
import React from 'react'
import { Helmet } from "react-helmet"

// @Components
import Header from 'components/Header'
import Footer from 'components/Footer'

// @Statics > Icon
import Logo from 'statics/images/logos/juventud.png'

function index({ title = "Inicio", children } = {}) {
    return (
        <div className="app--frame">
            <Helmet> 
                <link rel="icon" href={Logo} type="image/gif" sizes="16x16" />
                <title>{title} | CRS</title> 
            </Helmet>
            <Header />
            <main role="main">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default React.memo(index)