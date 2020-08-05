// @Vendors
import React from 'react'
import {Formik, ErrorMessage} from 'formik'
import * as Yup from 'yup'

// @Components
import CrsField from 'components/Form/CrsField'
import Grid from '@material-ui/core/Grid'

function FormPeriodos({ initialValues = { nombre: '' }, onSubmit, ActionsButtons="" }) {
	
	const SignupSchema = Yup.object().shape({
	  nombre: Yup.string().required("¡Campo obligatorio!"),
	})

	return (
		<React.Fragment>
	          <Formik
	            initialValues={initialValues}
	            onSubmit={onSubmit}
	            validationSchema={SignupSchema}
	          >
	            {({errors, touched, values, handleChange, handleBlur, handleSubmit}) => (
	              	<form onSubmit={handleSubmit}>
	              	 <Grid container spacing={2}>
						<Grid item xs={12}>
			                <CrsField
			                    name="nombre"
			                    onChange={handleChange}
			                    onBlur={handleBlur}
			                    value={values.nombre}
			                    label="Nombre de nueva Categoría (*)"
			                    autoFocus={true}
			                    helperText={<ErrorMessage name='nombre' />}
			                    error={errors.nombre && touched.nombre}
			            	/>
	              	 	</Grid>
						<Grid item xs={12} md={12}>
		            		{ActionsButtons}
	              	 	</Grid>
	              	 </Grid>
		         	</form>
		         )}
	          </Formik>
		</React.Fragment>
	)
}

export default React.memo(FormPeriodos)