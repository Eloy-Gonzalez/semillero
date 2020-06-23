import React from 'react'
import styled from 'styled-components'

import {useSelector} from 'react-redux'
import {selectProfiles} from 'state/users/users.selectors'

const Table = styled.div`
	display:grid;
	gap:10px;
	justify-items:center;
	grid-template-columns: repeat(4, 1fr);
	margin: 0 0 30px;
`
const Title = styled.p`
	font-size: 1.3em;
	color:#444;
	font-family: sans-serif;
`
const Text = styled.p`
	font-size: 1.2em;
	color:#777;
	font-family: sans-serif;
`
function DetailUserProfile({ ActionsButtons, onSubmit }){
	const profiles = useSelector(state => selectProfiles(state))
	const nombres = `${profiles.primer_nombre} ${profiles.segundo_nombre}`
	const apellidos = `${profiles.primer_apellido} ${profiles.segundo_apellido}`
	return (
		<React.Fragment>
			<Table  className="anim_form-data">
				<div>
					<label>
						<Title>Nombres</Title>
					</label>
					<span>
						<Text>{nombres}</Text>
					</span>
				</div>
				<div>
					<label>
						<Title>Apellidos</Title>
					</label>
					<span>
						<Text>{apellidos}</Text>
					</span>
				</div>
				<div>
					<label>
						<Title>Fecha de nacimiento</Title>
					</label>
					<span>
						<Text>{profiles.fecha_nacimiento}</Text>
					</span>
				</div>
				<div>
					<label>
						<Title>Género</Title>
					</label>
					<span>
						<Text>{profiles.genero === "M" ? "Masculino" : "Femenino"}</Text>
					</span>
				</div>
			</Table>
			<form onSubmit={onSubmit}>
				{ActionsButtons}
			</form>
		</React.Fragment>
	)
}
export default DetailUserProfile