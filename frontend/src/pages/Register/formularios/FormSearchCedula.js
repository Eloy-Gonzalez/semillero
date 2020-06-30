// @Vendors
import React from 'react'
import {Formik, ErrorMessage} from 'formik';
import * as Yup from 'yup'

// @Components
import CrsField from 'components/Form/CrsField'
import SimpleSelect from 'components/Form/SimpleSelect'

// @ReCACPTCHA
// import ReCAPTCHA from "react-google-recaptcha";

function FormSearchCedula({ title="Consultar cedula", onSubmit, autofocus=false, ActionsButtons="", nextForm}) {
	
	const initialValues = {
		nacionalidad: '',
		cedula: ''
	}
	
	const SignupSchema = Yup.object().shape({
	  nacionalidad: Yup.string().required("¡Campo obligatorio!"),
	  cedula: Yup.number().integer().required("¡Campo obligatorio!")
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
	              	<form onSubmit={handleSubmit} className="anim_form-data" style={{display: "grid", gridTemplateColumns:"auto 1fr", gridColumnGap:"15px"}}>
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
		                <CrsField
		                    name="cedula"
		                    onChange={handleChange}
		                    onBlur={handleBlur}
		                    value={values.cedula}
		                    label="Ingresar Cédula (*)"
		                    color="primary"
		                    autoFocus={autofocus}
		                    helperText={<ErrorMessage name='cedula' />}
		                    error={errors.nacionalidad && touched.nacionalidad}
		            	/>
		            	{ActionsButtons}
		            	{/*<ReCAPTCHA
		            		size="invisible"
		            		sitekey="6LdL76kZAAAAAJncAhyQbdP_nMtyXB74FAVFaZRG"
						/>*/}
		         	</form>
		         )}
	          </Formik>
		</React.Fragment>
	)
}

export default React.memo(FormSearchCedula)