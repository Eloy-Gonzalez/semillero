import React, {useEffect, useState, useCallback} from 'react'

// @Material UI
import SimpleSelect from 'components/Form/SimpleSelect'

import {Formik, ErrorMessage} from 'formik'
import * as Yup from 'yup'

import CrsField from 'components/Form/CrsField'
import {getEstados, getMunicipios, getParroquias} from 'utils/helpers'

import './index.scss'


function FormUsuariosDomicilio({ onSubmit, autofocus=false, ActionsButtons="" }) {
	const [edos, setEdos] = useState([])
	const [muns, setMuns] = useState([])
	const [paqs, setPaqs] = useState([])

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
			console.log(data)
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
		telefono_habitacional: Yup.string()
		.min(7, '¡Ingrese un valor entre 7 y 11 dígitos!')
		.max(11, '¡Ingrese un valor entre 7 y 11 dígitos!')
		.required("¡Campo requerido!"),
		telefono_personal: Yup.string()
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
					<form onSubmit={handleSubmit} className="grid--form-data anim_form-data">
					<CrsField  
						name="telefono_habitacional"
						value={values.telefono_habitacional}
						onChange={handleChange}
						onBlur={handleBlur}
						label="Nro. Teléfono (Local)"
						helperText={<ErrorMessage name="telefono_habitacional"/>}
						autoFocus={autofocus}
						error={errors.telefono_habitacional && touched.telefono_habitacional}
					/>
					<CrsField  
						name="telefono_personal"
						value={values.telefono_personal}
						onChange={handleChange}
						onBlur={handleBlur}
						label="Nro. Teléfono (Personal) (*)"
						helperText={<ErrorMessage name="telefono_personal"/>}
						error={errors.telefono_personal && touched.telefono_personal}
					/>
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
					{ActionsButtons}
					</form>
				)
			}
			</Formik>
		</React.Fragment>
	)
}

export default FormUsuariosDomicilio