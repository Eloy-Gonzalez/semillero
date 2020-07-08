// @Vendors
import React from 'react'
import {Formik, ErrorMessage} from 'formik';
import * as Yup from 'yup'

// @Components
import CrsField from 'components/Form/CrsField'
import SimpleSelect from 'components/Form/SimpleSelect'
import Grid from '@material-ui/core/Grid'

function FormSearchCedula({ title="Consultar cedula", onSubmit, autofocus=false, ActionsButtons="", nextForm}) {
	
	const initialValues = {
		nacionalidad: 'V',
		cedula: ''
	}

	const cedulaRegex = RegExp("^[0-9]+$")
	
	const SignupSchema = Yup.object().shape({
	  nacionalidad: Yup.string().required("¡Campo obligatorio!"),
	  cedula: Yup.string().required("¡Campo obligatorio!").matches(cedulaRegex, "Cédula inválida")
	})

	return (
		<React.Fragment>
			<p className="app--text-second" style={{color:"rgb(148, 169, 71)"}}>
				{title}
			</p>
	          <Formik
	            initialValues={initialValues}
	            onSubmit={onSubmit}
	            validationSchema={SignupSchema}
	          >
	            {({errors, touched, values, handleChange, handleBlur, handleSubmit}) => (
	              	<form onSubmit={handleSubmit} className="anim_form-data">
	                	<Grid container maxwidth="md" spacing={3}>
		                	<Grid item sm={12} md={3}>
			                	<SimpleSelect 
			                		style={{minWidth: "160px"}}
			                		id="nacionalidad"
			                		name="nacionalidad"
			                		value={values.nacionalidad}
			                		onChange={handleChange}
			                		onBlur={handleBlur}
			                		label="Nacionalidad (*)"
				                    items={[{label:"V", value:"V"}, {label:"E", value:"E"}]}
			                		helpertext={<ErrorMessage name="nacionalidad"/>}
			                		error={errors.nacionalidad && touched.nacionalidad}
			                		/>
		                		
		                	</Grid>

		                	<Grid item sm={12} md={9}>
				                <CrsField
				                    name="cedula"
				                    onChange={handleChange}
				                    onBlur={handleBlur}
				                    value={values.cedula}
				                    label="Ingresar Cédula (*)"
				                    autoFocus={autofocus}
				                    helperText={<ErrorMessage name='cedula' />}
				                    error={errors.cedula && touched.cedula}
				            	/>
		                	</Grid>

		                	<Grid item sm={12}>
		            			{ActionsButtons}
		                	</Grid>
	                	</Grid>
		         	</form>
		         )}
	          </Formik>
		</React.Fragment>
	)
}

export default React.memo(FormSearchCedula)