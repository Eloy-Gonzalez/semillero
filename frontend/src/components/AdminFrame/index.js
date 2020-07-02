// @Vendors
import React from 'react'
import styled from 'styled-components'
import { Helmet } from "react-helmet"

// @Components
import Menu from 'components/Menu'
import Header from './Header'
import LeftMenu from './LeftMenu'
import Container from '@material-ui/core/Container';

// @Statics > Icon
import Logo from 'statics/images/logos/juventud.png'

const Frame = styled.div`
	display:grid;
	grid-template-columns: 1fr;
	grid-template-rows: auto 1fr auto;
	min-height: 100vh;

	@media (min-width: 720px){
		grid-template-columns: 200px 1fr;
	}
	@media (min-width: 1024px){
		grid-template-columns: 250px 1fr;
	}
`

function index({ title = "Not title assigned", children, user = {}, onLogout} = {}) {
    return (
        <Frame>
            <Helmet> 
                <link rel="icon" href={Logo} type="image/gif" sizes="16x16" />
                <title>{title} - CRS</title> 
            </Helmet>
            <Header 
            	menu={<Menu user={user}
            	logout={onLogout}
            	style={{margin: "0"}}/>}
            />
            <LeftMenu />
            <Container maxWidth="lg">
            	{children}
      		</Container>
        </Frame>
    )
}

export default React.memo(index)