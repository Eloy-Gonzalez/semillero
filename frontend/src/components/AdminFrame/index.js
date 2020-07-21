// @Vendors
import React from 'react'
import styled from 'styled-components'
import { Helmet } from "react-helmet"
import {Link} from 'react-router-dom'

// @Components
import Menu from 'components/Menu'
import LeftMenu from './LeftMenu'
import Container from '@material-ui/core/Container'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'

// @Statics > Icon
import Logo from 'statics/images/logos/juventud.png'

const Frame = styled.div`
	display:grid;
	grid-template-columns: 1fr;
	grid-template-rows: auto 1fr auto;
	min-height: 100vh;

    & .menu {
        margin: 0;
    }

    & .MuiTypography-colorTextSecondary {
        background: #e9e9e9;
        padding: 5px 15px;
        box-sizing: border-box;
        border-radius: 5px;
        font-family: var(--font-text);
        font-size: 20px;

        & a {
            color: #333;
            text-decoration: none;
        }

        & p {
            margin: 0;
            color: #777;
        }
    }

	@media (min-width: 720px){
		grid-template-columns: 200px 1fr;
	}
	@media (min-width: 1024px){
		grid-template-columns: 250px 1fr;
	}
`

function index({ title, children, user = {}, onLogout} = {}) {
    return (
        <Frame>
            <Helmet> 
                <link rel="icon" href={Logo} type="image/gif" sizes="16x16" />
                <title>{title} - CRS</title> 
            </Helmet>
            <LeftMenu menu={<Menu user={user} logout={onLogout} admin={true} />}>
                <Container maxWidth="lg">
                    <Breadcrumbs aria-label="Breadcrumb" className='breadscrumb'>
                        <Link color="inherit" to="/admin">Inicio</Link>
                        <p>{title}</p>
                    </Breadcrumbs>
                	{children}
          		</Container>
            </LeftMenu>
        </Frame>
    )
}

export default React.memo(index)