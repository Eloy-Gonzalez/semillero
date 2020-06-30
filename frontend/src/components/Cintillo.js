// @Vendors
import React from 'react'
import styled from 'styled-components'

// @Statics - Assets 
import LogoGobierno from 'statics/images/logos/GobiernoBolivariano.png'
import LogoVenezuela from 'statics/images/logos/todosPorVenezuela.jpg'

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: minmax(280px, 1200px);
	justify-content:center;
    min-height: 80px;
    align-items: center;
    padding: 15px 0;
    box-sizing: border-box;
    box-shadow: 0px 0px 10px 1px #b1b1b1;
`
const Icons = styled.div`
	display:flex;
	justify-content:space-between;

`
const LeftIcon = styled.div`
	width: 300px;
	height: 50px;
`
const RightIcon = styled.div`
	width: 150px;
	height: 50px;
`
export default function Cintillo() {
	return (
		<Wrapper>
			<Icons>
				<LeftIcon>
					<img style={{width:"100%", height:"100%"}} src={LogoGobierno} alt="Gobierno_Bolivariano"/>
				</LeftIcon>
				<RightIcon>
					<img style={{width:"100%", height:"100%"}} src={LogoVenezuela} alt="Juntos_Por_Venezuela" />
				</RightIcon>
			</Icons>
		</Wrapper>
	)
}