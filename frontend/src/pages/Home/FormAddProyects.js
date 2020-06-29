// @Vendors
import React, {useState, useEffect} from 'react'
import {Formik, ErrorMessage} from 'formik';
import * as Yup from 'yup'

// @Services
import {getCategoriesService} from 'state/proyects/proyects.services'

// @Components
import CrsField from 'components/Form/CrsField'
import SimpleSelect from 'components/Form/SimpleSelect'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

function FormAddProyect ({ onSubmit, ActionsButtons=""}) {
	const [categorias, setCategorias] = useState([])
	
	const getCategories = React.useCallback(async () => {
		const allCategories = await getCategoriesService()
		const {data} = allCategories
		let nexCategories = []
		data.forEach((index, value) => {
			nexCategories.push({
				"label": index.nombre,
				"value": index.id
			})
		})
		setCategorias(nexCategories)
	}, [])

	useEffect(() => {
		getCategories()
		console.log("Consultando...")
	}, [getCategories])

	const initialValues = {
		nombre: '',
		descripcion: '',
		url_video: '',
		categoria: ''
	}

	const Schema = Yup.object().shape({
	  nombre: Yup.string().min(7).max(255).required("¡Campo obligatorio!"),
	  descripcion: Yup.string().required("¡Campo obligatorio!"),
	  url_video: Yup.string().url("¡Url no válida!").required("¡Campo obligatorio!"),
	  categoria: Yup.string().min(1, '¡Rango de caracteres inválido!').max(1, '¡Rango de caracteres inválido!').required("¡Campo obligatorio!")
	})

	return (
		<Formik 
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={Schema}
		>
			{({handleChange, handleBlur, values, handleSubmit}) => (
				<TableRow className="anim_form-data">
						<TableCell component="th" scope="row">
							<CrsField
								name="nombre"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.nombre}
								label="Nombre del proyecto (*)"
								color="primary"
								autoFocus={true}
								helperText={<ErrorMessage name='nombre' />}
							/>
						</TableCell>
						<TableCell component="th" scope="row">
							<CrsField
								name="url_video"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.url_video}
								label="Hipervínculo del proyecto (*)"
								color="primary"
								helperText={<ErrorMessage name='url_video' />}
							/>
						</TableCell>
						<TableCell component="th" scope="row">
		                	<SimpleSelect 
		                	style={{width: "100%"}}
								name="categoria"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.categoria}
								label="Categoria (*)"
								items={categorias}
								helpertext={<ErrorMessage name='categoria' />}
		                		/>
						</TableCell>
						<TableCell>
							{ActionsButtons}
						</TableCell>
				</TableRow>
			)}
		</Formik>
	)
}

export default React.memo(FormAddProyect)