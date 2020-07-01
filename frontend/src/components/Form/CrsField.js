// @Vendors
import React from 'react'

// @Material UI
import FormGroup from '@material-ui/core/FormGroup'
import TextField from '@material-ui/core/TextField'

function CrsField({ id, type="text", name, value, onChange, onBlur, variant="outlined", label, ...rest }) {
	return (
		<FormGroup>
			<TextField
				id={id}
				type={type}
				name={name}
				onChange={onChange}
				onBlur={onBlur}
				value={value}
				label={label}
				{ ...rest }
			/>
		</FormGroup>
	)
}

export default React.memo(CrsField)