// @Vendors
import React, {useEffect, useState, useCallback} from 'react'
import {Formik, ErrorMessage} from 'formik'
import * as Yup from 'yup'

// @Utils > helpers
import {getEstados, getMunicipios, getParroquias} from 'utils/helpers'

// @Components
import CrsField from 'components/Form/CrsField'

// @Material UI
import SimpleSelect from 'components/Form/SimpleSelect'
import Grid from '@material-ui/core/Grid'

function FormUsuariosDomicilio({ onSubmit, autofocus=false, ActionsButtons="" }) {
	const [edos, setEdos] = useState([])
	const [muns, setMuns] = useState([])
	const [paqs, setPaqs] = useState([])

	const phoneRegex = RegExp(
  		/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/
	);

	const obtenerEstados = useCallback( async () => {
		try {
			const estados = await getEstados()
			const {data} = estados
			let payload = []
			for(let i=0; i < estados.data.length; i++) {
				payload.push({ label: data[i].nombre, value: data[i].id_estado })
			}
			setEdos(payload)
		} catch(err) {
			console.log(err)
		}
	},[])

	const obtenerMunicipios = useCallback( async (e, hdlchng) => {
		hdlchng(e)
		const {value} = e.target
		try {
			const municipios = await getMunicipios(value)
			const {data} = municipios
			let payload = []
			for(let i=0; i < data.length; i++) {
				payload.push({ label: data[i].nombre, value: data[i].id_municipio })
			}
			setMuns(payload)
		} catch(err) {
			console.log(err)
		}
	},[])

	const obtenerParroquias = useCallback( async (e, hdlchng) => {
		hdlchng(e)
		const {value} = e.target
		try {
			const parroquias = await getParroquias(value)
			const {data} = parroquias
			let payload = []
			for(let i=0; i < data.length; i++) {
				payload.push({ label: data[i].nombre, value: data[i].id_parroquia })
			}
			setPaqs(payload)
		} catch(err) {
			console.log(err)
		}
	},[])

	useEffect(() => {
		obtenerEstados()
	}, [obtenerEstados])

	const initialValues = {
		telefono_habitacional: '',
		telefono_personal: '',
		direccion_habitacional: '',
		edo: '',
		mun: '',
		id_parroquia: ''
	}

	const DomicilioSchema = Yup.object().shape({
		telefono_habitacional: Yup.string().matches(phoneRegex, "Teléfono inválido")
		.min(7, '¡Ingrese un valor entre 7 y 11 dígitos!')
		.max(11, '¡Ingrese un valor entre 7 y 11 dígitos!'),
		telefono_personal: Yup.string().matches(phoneRegex, "Teléfono inválido")
		.min(7, '¡Ingrese un valor entre 7 y 11 dígitos!')
		.max(11, '¡Ingrese un valor entre 7 y 11 dígitos!')
		.required("¡Campo requerido!"),
		edo: Yup.string().required("¡Campo requerido!"),
		mun: Yup.string().required("¡Campo requerido!"),
		id_parroquia: Yup.string().required("¡Campo requerido!"),
		direccion_habitacional: Yup.string().required("¡Campo requerido!"),
	})

	return (
		<React.Fragment>
			<p className="app--text-second" style={{color:"rgb(148, 169, 71)"}}>
				Datos Domiciliarios
			</p>
			<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={DomicilioSchema}
			>
			{
				({ values,errors,touched,handleChange,handleBlur,handleSubmit}) => (
				<form onSubmit={handleSubmit} className="anim_form-data">
					<Grid container maxwidth="md" spacing={3}>
						<Grid item sm={12} md={6}>
							<CrsField
								name="telefono_personal"
								value={values.telefono_personal}
								onChange={handleChange}
								onBlur={handleBlur}
								label="Teléfono Personal (*)"
								helperText={<ErrorMessage name="telefono_personal"/>}
								error={errors.telefono_personal && touched.telefono_personal}
							/>
						</Grid>

						<Grid item sm={12} md={6}>
							<CrsField  
								name="telefono_habitacional"
								value={values.telefono_habitacional}
								onChange={handleChange}
								onBlur={handleBlur}
								label="Teléfono Habitación"
								helperText={<ErrorMessage name="telefono_habitacional"/>}
								autoFocus={autofocus}
								error={errors.telefono_habitacional && touched.telefono_habitacional}
							/>
						</Grid>
						
						<Grid item sm={12} md={4}>
		                	<SimpleSelect 
		                		style={{minWidth: "160px"}}
		                		id="edo"
		                		name="edo"
		                		value={values.edo}
								onChange={(e) => obtenerMunicipios(e,handleChange)}
								onBlur={handleBlur}
		                		label="Estado (*)"
			                    items={edos}
		                		helpertext={<ErrorMessage name="edo"/>}
		                		error={errors.edo && touched.edo}
		                	/>
						</Grid>

						<Grid item sm={12} md={4}>
		                	<SimpleSelect 
		                		style={{minWidth: "160px"}}
		                		id="mun"
		                		name="mun"
		                		value={values.mun}
								onChange={(e) => obtenerParroquias(e,handleChange)}
								onBlur={handleBlur}
		                		label="Municipio (*)"
			                    items={muns}
		                		helpertext={<ErrorMessage name="mun"/>}
		                		error={errors.mun && touched.mun}
		                	/>
						</Grid>
						
						<Grid item sm={12} md={4}>
		                	<SimpleSelect 
		                		style={{minWidth: "160px"}}
		                		id="id_parroquia"
		                		name="id_parroquia"
		                		value={values.id_parroquia}
								onChange={handleChange}
								onBlur={handleBlur}
		                		label="Parroquia (*)"
			                    items={paqs}
		                		helpertext={<ErrorMessage name="id_parroquia"/>}
		                		error={errors.id_parroquia && touched.id_parroquia}
		                	/>
						</Grid>

						<Grid item sm={12} md={12}>
		                	<div style={{gridColumn:"1 / -1"}}>
								<CrsField  
									name="direccion_habitacional"
									value={values.direccion_habitacional}
									onChange={handleChange}
									onBlur={handleBlur}
									label="Dirección de Habitación (*)"
									rows={3}
									placeholder="Ingrese una dirección detallada"
									helperText={<ErrorMessage name="direccion_habitacional"/>}
									error={errors.direccion_habitacional && touched.direccion_habitacional}
								/>
							</div>
						</Grid>
						<Grid sm={12}>
							{ActionsButtons}
						</Grid>
					</Grid>
				</form>
				)
			}
			</Formik>
		</React.Fragment>
	)
}

export default FormUsuariosDomicilio