// @Vendors
import React from 'react'
import { Helmet } from "react-helmet"
import {Link, withRouter} from 'react-router-dom'

// @Components
import Header from 'components/Header'
import Footer from 'components/Footer'
import Cintillo from 'components/Cintillo'
import Container from '@material-ui/core/Container'
import CrsBreadcumbs from 'components/CrsBreadcumbs'

// @Statics > Icon
import Logo from 'statics/images/logos/juventud.png'
import HomeIcon from '@material-ui/icons/Home'
import './index.scss'

function index({ title = "Not title assigned", children, user = {}, onLogout, history} = {}) {
    return (
        <div className="app--frame">
            { !user.isAuthenticated && <Cintillo /> }
            <Helmet> 
                <link rel="icon" href={Logo} type="image/gif" sizes="16x16" />
                <title>{title} - CRS</title> 
            </Helmet>
            <Header user={user} onLogout={onLogout}/>
            <Container maxWidth="md">
                {user.isAuthenticated && 
                <React.Fragment>
                    <br/>
                    <br/>
                    <CrsBreadcumbs>
                        <Link color="primary" to="/"><HomeIcon/> Inicio</Link>
                        {title !== "Inicio" && <p>{title}</p>}
                    </CrsBreadcumbs>
                    <br/>
                </React.Fragment>
                }
                {children}
            </Container>
            <Footer />
        </div>
    )
}

export default withRouter(index)