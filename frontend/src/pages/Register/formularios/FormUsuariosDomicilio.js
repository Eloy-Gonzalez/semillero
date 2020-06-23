import React, {useEffect, useState, useCallback} from 'react'

// @Material UI
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
			const payload = estados.data
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
			const payload = municipios.data
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
			const payload = parroquias.data
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
			<p className="app--text-sencod">Datos domiciliarios</p>
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
					/>
					<CrsField  
					name="telefono_personal"
					value={values.telefono_personal}
					onChange={handleChange}
					onBlur={handleBlur}
					label="Nro. Teléfono (Personal) (*)"
					helperText={<ErrorMessage name="telefono_personal"/>}
					/>
					<CrsField  
					name="direccion_habitacional"
					value={values.direccion_habitacional}
					onChange={handleChange}
					onBlur={handleBlur}
					label="Dirección de Habitación (*)"
					helperText={<ErrorMessage name="direccion_habitacional"/>}
					/>

					<FormControl variant="filled">
					<InputLabel id="edo">Estado (*)</InputLabel>
					<Select
					id="edo"
					name="edo"
					value={values.edo}
					onChange={(e) => obtenerMunicipios(e,handleChange)}
					onBlur={handleBlur}
					>
					<MenuItem value="">
					<em>Seleccionar</em>
					</MenuItem>
					{ edos !== [] && edos.map( ({ id_estado, nombre}) => (
						<MenuItem key={id_estado} value={id_estado}>{nombre}</MenuItem> ))}
					</Select>
					<FormHelperText>
					<ErrorMessage name="edo"/>
					</FormHelperText>
					</FormControl>

					<FormControl variant="filled">
					<InputLabel id="mun">Municipio (*)</InputLabel>
					<Select
					id="mun"
					name="mun"
					value={values.mun}
					onChange={(e) => obtenerParroquias(e,handleChange)}
					onBlur={handleBlur}
					>
					<MenuItem value="">
					<em>Seleccionar</em>
					</MenuItem>
					{ muns !== [] && muns.map( ({ id_municipio, nombre}) => (
						<MenuItem key={id_municipio} value={id_municipio}>{nombre}</MenuItem> ))}
					</Select>
					<FormHelperText>
					<ErrorMessage name="mun"/>
					</FormHelperText>
					</FormControl>

					<FormControl variant="filled">
						<InputLabel id="id_parroquia">Parroquia (*)</InputLabel>
						<Select
							id="id_parroquia"
							name="id_parroquia"
							value={values.id_parroquia}
							onChange={handleChange}
							onBlur={handleBlur}
						>
						<MenuItem value="">
							<em>Seleccionar</em>
						</MenuItem>
						{ paqs !== [] && paqs.map( ({ id_parroquia, nombre}) => (
							<MenuItem key={id_parroquia} value={id_parroquia}>{nombre}</MenuItem> ))}
						</Select>
						<FormHelperText>
							<ErrorMessage name="id_parroquia"/>
						</FormHelperText>
					</FormControl>
					{ActionsButtons}
					</form>
					)
			}
			</Formik>
		</React.Fragment>
	)
}

export default FormUsuariosDomicilio