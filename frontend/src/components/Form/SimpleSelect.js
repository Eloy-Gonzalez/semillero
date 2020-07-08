// @Vendros
import React from 'react'

// @Material UI
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'


function SimpleSelect({variant="outlined", ...props}) {
	const useStyles = makeStyles((theme) => ({
	  formControl: {
	    margin: 0,
	    minWidth: 120,
	    width: "100%"
	  },
	  selectEmpty: {
	    marginTop: theme.spacing(2),
	  },
	}))

	const classes = useStyles()

	return (
		<FormControl className={classes.formControl}>
	        <InputLabel id={props.id}>{props.label}</InputLabel>
	        <Select
	        	{...props}
	        >
	          <MenuItem value="">
	            <em>Seleccionar</em>
	          </MenuItem>
	          {
	          	props.items.length && props.items.map( ({ value, label}) => (
	          		<MenuItem key={value} value={value}>{label}</MenuItem>
	          	))
	          }
	        </Select>
	        {props.helpertext && <FormHelperText> {props.helpertext} </FormHelperText>}
		</FormControl>
	)
}

export default React.memo(SimpleSelect)