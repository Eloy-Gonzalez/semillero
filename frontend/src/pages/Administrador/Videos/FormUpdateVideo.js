// @Vendors
import React from 'react'
import PropTypes from 'prop-types';

import {Formik, ErrorMessage} from 'formik';
import * as Yup from 'yup'

// @Material UI
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Button from '@material-ui/core/Button'


export default function FormUpdateVideo({ loading=false, actualValue="1", initialValues, onSubmit, data={} }) {
	const SignupSchema = Yup.object().shape({
	  id_estatus: Yup.string().required("¡Campo obligatorio!") 
	})

	return (
		<Formik
		initialValues={initialValues}
		onSubmit={onSubmit}
		validationSchema={SignupSchema}
		>
			{
				({errors, touched, values, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
					<form onSubmit={handleSubmit}>
					    <FormControl component="fieldset">
					      <FormLabel component="legend">Cambiar Estado</FormLabel>
					      <RadioGroup 
					      	aria-label="id_estatus"
					      	name="id_estatus"
					      	value={values.id_estatus}
					      	onChange={handleChange}
					      	row
					      >
					        <FormControlLabel value="1" control={<Radio color="primary" />} label="En revisión" />
					        <FormControlLabel value="2" control={<Radio color="primary" />} label="Verificado" />
					        <FormControlLabel value="3" control={<Radio color="primary" />} label="Rechazado" />
					      </RadioGroup>
					      <FormHelperText>
					      	<ErrorMessage name="id_estatus"/>
					      </FormHelperText>
					      <Button type="submit" variant="outlined" disabled={values.id_estatus === actualValue || isSubmitting ? true : false}>
					      	{isSubmitting ? "Cargando..." : "Aceptar"}
					      </Button>
					    </FormControl>
					</form>
				)
			}
		</Formik> 
	)
}

FormUpdateVideo.propTypes = {
	initialValues: PropTypes.object.isRequired
}