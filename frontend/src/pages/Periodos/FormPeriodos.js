// @Vendors
import React from 'react'
import {Formik, ErrorMessage} from 'formik';
import * as Yup from 'yup'
import moment from 'moment'
import 'moment/locale/es'

// @Components
import CrsField from 'components/Form/CrsField'
import SimpleSelect from 'components/Form/SimpleSelect'
import Grid from '@material-ui/core/Grid'

// @React ReCAPTCHA
// import ReCAPTCHA from "react-google-recaptcha"

function FormPeriodos({ title="Registar Período", onSubmit, autofocus=false, ActionsButtons="", initValues = [] }) {
	const initialValues = {
		nombre: '',
		fecha_desde: moment().format("YYYY-MM-DD"),
		fecha_hasta: moment().format("YYYY-MM-DD"),
		anio_periodo: moment().format("YYYY"),
		letra_periodo: '',
		observaciones: '',
		estado: false
	}

	const letras_periodo = [
		{label: "I", value: 1},
		{label: "II", value: 2}
	]
	
	const SignupSchema = Yup.object().shape({
	  nombre: Yup.string().required("¡Campo obligatorio!"),
	  fecha_desde: Yup.string().required("¡Campo obligatorio!"),
	  fecha_hasta: Yup.string().required("¡Campo obligatorio!"),
	  anio_periodo: Yup.string().required("¡Campo obligatorio!"),
	  letra_periodo: Yup.string().required("¡Campo obligatorio!"), 
	  estado: Yup.boolean().required("¡Campo obligatorio!") 
	})

	return (
		<React.Fragment>
	          <Formik
	            initialValues={initValues.length ? initValues[0] : initialValues}
	            onSubmit={onSubmit}
	            validationSchema={SignupSchema}
	          >
	            {({errors, touched, values, handleChange, handleBlur, handleSubmit}) => (
	              	<form onSubmit={handleSubmit}>
	              	 <Grid container spacing={3}>
	              	 	<Grid item xs={12} md={4}>
		                	<CrsField 
		                		name="nombre"
		                		value={values.nombre}
		                		onChange={handleChange}
		                		onBlur={handleBlur}
		                		label="Nombre del periodo (*)"
			                    helperText={<ErrorMessage name="nombre"/>}
		                		error={errors.nombre && touched.nombre}
		                		/>
				        </Grid>
						<Grid item xs={12} md={4}>
		                	<CrsField 
		                		name="fecha_desde"
		                		type="date"
		                		value={values.fecha_desde}
		                		onChange={handleChange}
		                		onBlur={handleBlur}
		                		label="Fecha inicio (*	)"
			                    helperText={<ErrorMessage name="fecha_desde"/>}
		                		error={errors.fecha_desde && touched.fecha_desde}
		                		/>
	              	 	</Grid>
						<Grid item xs={12} md={4}>
		                	<CrsField 
		                		name="fecha_hasta"
		                		type="date"
		                		value={values.fecha_hasta}
		                		onChange={handleChange}
		                		onBlur={handleBlur}
		                		label="Fecha fin (*)"
			                    helperText={<ErrorMessage name="fecha_hasta"/>}
		                		error={errors.fecha_hasta && touched.fecha_hasta}
		                		/>
	              	 	</Grid>
						<Grid item xs={12} md={4}>
			                <CrsField
			                    name="anio_periodo"
			                    type="number"
			                    onChange={handleChange}
			                    onBlur={handleBlur}
			                    value={values.anio_periodo}
			                    label="Año de creación (*)"
			                    autoFocus={autofocus}
			                    helperText={<ErrorMessage name='anio_periodo' />}
			                    error={errors.anio_periodo && touched.anio_periodo}
			            	/>
	              	 	</Grid>
						<Grid item xs={12} md={4}>
			                <SimpleSelect
			                    name="letra_periodo"
			                    style={{width: "100%"}}
			                    onChange={handleChange}
			                    onBlur={handleBlur}
			                    value={values.letra_periodo}
			                    label="Letra período (*)"
			                    items={letras_periodo}
			                    autoFocus={autofocus}
			                    helpertext={<ErrorMessage name='letra_periodo' />}
			                    error={errors.letra_periodo && touched.letra_periodo}
			            	/>
	              	 	</Grid>
						<Grid item xs={12} md={4}>
			                <SimpleSelect
			                style={{width: "100%"}}
			                    name="estado"
			                    onChange={handleChange}
			                    onBlur={handleBlur}
			                    value={values.estado}
			                    label="Estado"
			                    items={[ {label:"Activo", value: true}, {label:"Inactivo", value: false}]}
			                    autoFocus={autofocus}
			                    helpertext={<ErrorMessage name='estado' />}
			                    error={errors.estado && touched.estado}
			            	/>
	              	 	</Grid>
						<Grid item xs={12}>
			                <CrsField
			                    name="observaciones"
			                    onChange={handleChange}
			                    onBlur={handleBlur}
			                    value={values.observaciones}
			                    label="Observaiones"
			                    autoFocus={autofocus}
			                    helperText={<ErrorMessage name='observaciones' />}
			                    error={errors.observaciones && touched.observaciones}
			            	/>
	              	 	</Grid>
						<Grid item xs={12} md={12}>
		            		{ActionsButtons}
	              	 	</Grid>
	              	 </Grid>
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

export default React.memo(FormPeriodos)