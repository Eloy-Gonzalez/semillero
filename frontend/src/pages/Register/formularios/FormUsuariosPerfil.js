// @Vendors
import React from 'react'

import {Formik, ErrorMessage} from 'formik';
import * as Yup from 'yup'

// @Material UI
import CrsField from 'components/Form/CrsField'
import SimpleSelect from 'components/Form/SimpleSelect'

import './index.scss'

function FormUsuariosPerfil ({ title = "Datos del participante", onSubmit, autofocus=false, ActionsButtons="", valuesInitials}) {
	
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
			<p className="app-text-second">{title}</p>
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
		                    margin="dense"
		                    label="Primer Nombre (*)"
		                    color="primary"
		                    helperText={<ErrorMessage name="primer_nombre"/>}
		                    autoFocus={autofocus}
		                 />
		              	<CrsField
		                    name="segundo_nombre"
		                    onChange={handleChange}
		                    onBlur={handleBlur}
		                    value={values.segundo_nombre}
		                    margin="dense"
		                    label="Segundo Nombre"
		                    color="primary"
		                    helperText={<ErrorMessage name="segundo_nombre"/>}
		                 />
		                 <CrsField
		                    name="primer_apellido"
		                    onChange={handleChange}
		                    onBlur={handleBlur}
		                    value={values.primer_apellido}
		                    margin="dense"
		                    label="Primer Apellido (*)"
		                    color="primary"
		                    helperText={<ErrorMessage name="primer_apellido"/>}
		                 />
		                 <CrsField
		                    name="segundo_apellido"
		                    onChange={handleChange}
		                    onBlur={handleBlur}
		                    value={values.segundo_apellido}
		                    margin="dense"
		                    label="Segundo Apellido"
		                    color="primary"
		                    helperText={<ErrorMessage name="segundo_apellido"/>}
		                 />
		                 <CrsField
		                    name="fecha_nacimiento"
		                    onChange={handleChange}
		                    onBlur={handleBlur}
		                    value={values.fecha_nacimiento}
		                    margin="dense"
		                    label="Fecha de nacimiento (*)"
		                    color="primary"
		                    helperText={<ErrorMessage name="fecha_nacimiento"/>}
		                 />
	                	<SimpleSelect 
	                		id="genero"
	                		name="genero"
	                		value={values.genero}
	                		onChange={handleChange}
	                		onBlur={handleBlur}
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