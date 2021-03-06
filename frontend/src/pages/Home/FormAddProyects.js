// @Vendors
import React, {Fragment, useState, useEffect} from 'react'
import {Formik, ErrorMessage} from 'formik';
import * as Yup from 'yup'

// @Services
import {getCategoriasService} from 'state/categorias/categorias.services'

// @Components
import CrsField from 'components/Form/CrsField'

// @Material UI
import {Checkbox, FormControlLabel, FormHelperText, FormControl} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'

function FormAddProyect ({onSubmit, ActionsButtons=""}) {
	const [categorias, setCategorias] = useState([])
	const [loadingCategorias, setloadingCategorias] = useState(true)
	
	const getCategories = React.useCallback(async () => {
		const allCategories = await getCategoriasService()
		const {data} = allCategories
		
		const rows = []
		data.rows && data.rows.forEach((index) => {
			rows.push({ label: index.nombre, value: index.id})
		})
		setCategorias(rows)
		setloadingCategorias(false)
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
		<h2 className="app--text-second" style={{color:"rgb(148, 169, 71)"}}>
			Registar nuevo video
		</h2>
		<Formik 
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={Schema}
		>
			{({isSubmitting, errors, touched, handleChange, handleBlur, values, handleSubmit}) => (
				<form onSubmit={handleSubmit}>
				<Grid container spacing={3} maxwidth="md">
					<Grid item sm={12} md={4}>
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
					</Grid>
					<Grid item sm={12} md={8}>
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
					</Grid>
					<Grid item sm={12}>
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
					</Grid>
					
					<Grid item sm={12} md={12}>
						 <FormControl required error={errors.categorias && touched.categorias && true} component="fieldset">
						        <p style={{margin: "0"}} className="app--text-second">
						        	{ loadingCategorias ?  "Cargando categorías..." : "Categorias (*)" }
						        </p>
						        <Grid container spacing={2} justify="center">
						        {
						        	categorias.map( ({ label, value }) => (
						        		<Grid item sm={12} md={6} key={label+value}>
						        		<FormControlLabel
								            control={
								        		<Checkbox
								        			onChange={handleChange}
								        			name="categorias"
								        			value={value}
								        		/>
								            }
								            label={label}
								          />
								          </Grid>
						        		)
					      			)				      			
						        }
					      		</Grid>
						    <FormHelperText><ErrorMessage name='categorias' /></FormHelperText>
						</FormControl>
	            	</Grid>

	            	<Grid item sm={12}>
	            		{ActionsButtons}
	            	</Grid>
	            	
	            </Grid>
				</form>
			)}
		</Formik>
		</Fragment>
	)
}

export default React.memo(FormAddProyect)
