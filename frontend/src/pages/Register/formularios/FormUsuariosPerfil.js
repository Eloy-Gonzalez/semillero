// @Vendors
import React from 'react'

import {Formik, ErrorMessage} from 'formik';
import * as Yup from 'yup'

// @Material UI
import CrsField from 'components/Form/CrsField'
import SimpleSelect from 'components/Form/SimpleSelect'

import './index.scss'

function FormUsuariosPerfil ({ title = "Datos Personales", onSubmit, autofocus=false, ActionsButtons="", valuesInitials}) {
	
	const initialValues = {
		primer_nombre: '',
		segundo_nombre: '',
		primer_apellido: '',
		segundo_apellido: '',
		fecha_nacimiento: '',
		genero: ''
	}
	
	const PerfilSchema = Yup.object().shape({
	  primer_nombre: Yup.string().required("¡Campo obligatorio!"),
	  primer_apellido: Yup.string().required("¡Campo obligatorio!"),
	  fecha_nacimiento: Yup.date().required("¡Campo obligatorio!"),
	  genero: Yup.string().min(1, '¡Valores incorrectos!').max(1, '¡Valores incorrectos!').required("¡Campo obligatorio!")
	})

	return (
		<React.Fragment>
			<p className="app--text-second" style={{color:"rgb(148, 169, 71)"}}>{title}</p>
	          <Formik
	            initialValues={initialValues}
	            onSubmit={ (values, actions) => onSubmit(values, actions)}
	            validationSchema={PerfilSchema}
	          >
	            {
	              ({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
	              	<form onSubmit={handleSubmit} className="grid--form-data anim_form-data">
		              	<CrsField
		                    name="primer_nombre"
		                    onChange={handleChange}
		                    onBlur={handleBlur}
		                    value={values.primer_nombre}
		                    label="Primer Nombre (*)"
		                    color="primary"
		                    helperText={<ErrorMessage name="primer_nombre"/>}
		                    autoFocus={autofocus}
		                    error={errors.primer_nombre && touched.primer_nombre}
		                 />
		              	<CrsField
		                    name="segundo_nombre"
		                    onChange={handleChange}
		                    onBlur={handleBlur}
		                    value={values.segundo_nombre && touched.segundo_nombre}
		                    label="Segundo Nombre"
		                    color="primary"
		                    helperText={<ErrorMessage name="segundo_nombre"/>}
		                    error={errors.segundo_nombre && touched.segundo_nombre}
		                 />
		                 <CrsField
		                    name="primer_apellido"
		                    onChange={handleChange}
		                    onBlur={handleBlur}
		                    value={values.primer_apellido}
		                    label="Primer Apellido (*)"
		                    color="primary"
		                    helperText={<ErrorMessage name="primer_apellido"/>}
		                    error={errors.primer_apellido && touched.primer_apellido}
		                 />
		                 <CrsField
		                    name="segundo_apellido"
		                    onChange={handleChange}
		                    onBlur={handleBlur}
		                    value={values.segundo_apellido}
		                    label="Segundo Apellido"
		                    color="primary"
		                    error={errors.segundo_apellido && touched.segundo_apellido}
		                    helperText={<ErrorMessage name="segundo_apellido"/>}
		                 />
		                 <CrsField
		                    name="fecha_nacimiento"
		                    onChange={handleChange}
		                    onBlur={handleBlur}
		                    value={values.fecha_nacimiento}
		                    label="Fecha de nacimiento (*)"
		                    color="primary"
		                    helperText={<ErrorMessage name="fecha_nacimiento"/>}
		                    error={errors.fecha_nacimiento && touched.fecha_nacimiento}
		                 />
	                	<SimpleSelect 
	                		id="genero"
	                		name="genero"
	                		value={values.genero}
	                		onChange={handleChange}
	                		onBlur={handleBlur}
	                		error={errors.genero && touched.genero}
	                		label="Género (*)"
		                    items={[{label:'Masculino', value:'M'}, {label:'Femenino', value:'F'}]}
	                		helpertext={<ErrorMessage name="genero"/>}
	                		/>
	                		{ActionsButtons}
		            </form>
		        	)
	            }
	        </Formik>
		</React.Fragment>
	)
}
export default React.memo(FormUsuariosPerfil)