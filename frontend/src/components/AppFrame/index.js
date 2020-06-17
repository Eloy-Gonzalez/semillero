// @Vendors
import React from 'react'
import { Helmet } from "react-helmet"

// @Components
import Header from 'components/Header'
import Footer from 'components/Footer'

function index({ title = "Inicio", children } = {}) {
    return (
        <div className="app--frame">
            <Helmet> <title>{title} | Semillero</title> </Helmet>
            <Header />
            <main role="main">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default React.memo(index)