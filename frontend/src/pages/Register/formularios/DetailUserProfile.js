import React, {useEffect} from 'react'
import styled from 'styled-components'

import {useSelector} from 'react-redux'
import {selectProfiles, selectRepresentant} from 'state/users/users.selectors'

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
	const representant = useSelector(state => selectRepresentant(state))
	
	const [nombres, setNombres] = React.useState('')
	const [apellidos, setApellidos] = React.useState('')
	const [nacimiento, setNacimiento] = React.useState('')
	const [sexo, setSexo] = React.useState('')

	useEffect(() => {
		if(profiles.cedula === '') {
			setNombres(`${representant.primer_nombre_representante} ${representant.segundo_nombre_representante}`)
			setApellidos(`${representant.primer_apellido_representante} ${representant.segundo_apellido_representante}`)
			setNacimiento(representant.fecha_nacimiento_representante)
			setSexo(representant.genero_representante)
		} else {
			setNombres(`${profiles.primer_nombre} ${profiles.segundo_nombre}`)
			setApellidos(`${profiles.primer_apellido} ${profiles.segundo_apellido}`)
			setNacimiento(profiles.fecha_nacimiento)
			setSexo(profiles.genero)
		}
	}, [profiles, representant])


	return (
		<>
		<p className="app--text-second" style={{color: "rgb(148, 169, 71)"}}>Detalles</p>
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
						<Text>{nacimiento}</Text>
					</span>
				</div>
				<div>
					<label>
						<Title>Género</Title>
					</label>
					<span>
						<Text>{sexo === "M" ? "Masculino" : "Femenino"}</Text>
					</span>
				</div>
			</Table>
			<form onSubmit={(e) => onSubmit(e)}>
				{ActionsButtons}
			</form>
		</>
	)
}
export default React.memo(DetailUserProfile)