// @Vendors
import React, {Fragment, useState, useEffect} from 'react'
import {Formik, ErrorMessage} from 'formik';
import * as Yup from 'yup'

// @Services
import {getCategoriesService} from 'state/proyects/proyects.services'

// @Components
import CrsField from 'components/Form/CrsField'

// @Material UI
import {Checkbox, FormControlLabel, FormHelperText, FormControl, FormLabel} from '@material-ui/core'


function FormAddProyect ({onSubmit, ActionsButtons=""}) {
	const [categorias, setCategorias] = useState([''])
	
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
	}, [getCategories])

	const initialValues = {
		nombre: '',
		descripcion: '',
		url_video: '',
		categorias: []
	};

	const Schema = Yup.object().shape({
	  nombre: Yup.string().min(7).max(255).required("¡Campo obligatorio!"),
	  descripcion: Yup.string().required("¡Campo obligatorio!"),
	  url_video: Yup.string().url("¡Url no válida!").required("¡Campo obligatorio!"),
	  categorias : Yup.array().of(Yup.number().min(1)).required('¡Por favor selecciona al menos 1 categoria!')
	})

	return (
		<Fragment>
		<p className="app--text-second" style={{color:"rgb(148, 169, 71)"}}>
			Registar nuevo video
		</p>
		<Formik 
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={Schema}
		>
			{({isSubmitting, errors, touched, handleChange, handleBlur, values, handleSubmit}) => (
				<form onSubmit={handleSubmit}>
					<CrsField
						name="nombre"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.nombre}
						label="Nombre del proyecto (*)"
						color="primary"
						autoFocus={true}
						helperText={<ErrorMessage name='nombre' />}
						error={errors.nombre && touched.nombre}
					/>
					<CrsField
						name="descripcion"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.descripcion}
						label="Descripción (*)"
						color="primary"
						helperText={<ErrorMessage name='descripcion' />}
						error={errors.descripcion && touched.descripcion}
					/>
					<CrsField
						name="url_video"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.url_video}
						label="Hipervínculo del proyecto (*)"
						color="primary"
						helperText={<ErrorMessage name='url_video' />}
						error={errors.url_video && touched.url_video}
					/>
					<div className="list--categories">
						 <FormControl required error={errors.categorias && touched.categorias && true} component="fieldset">
						        <FormLabel className="app--text-second" component="legend">
						        	Categorias
						        </FormLabel>
						        {
						        	categorias.map( ({ label, value }) => (
						        		<FormControlLabel
						        			key={label+value}
								            control={
								        		<Checkbox
								        			onChange={handleChange}
								        			name="categorias"
								        			value={value}
								        		/>
								            }
								            label={label}
								          />
						        		)
					      			)
						        }
						    <FormHelperText><ErrorMessage name='categorias' /></FormHelperText>
						</FormControl>
	            	</div>
	            	{ActionsButtons}
				</form>
			)}
		</Formik>
		</Fragment>
	)
}

export default React.memo(FormAddProyect)