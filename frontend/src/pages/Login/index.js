// @Vendors
import React, {useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'

// Components
import AuthForm from './AuthForm'
import avatar from 'statics/images/logos/avatar_2x.png'

import RecoverPass from './RecoverPass'

// @Actions
import {openModal} from 'state/app/app.actions'
import {login} from 'state/auth/auth.actions'

// @Selectors
import {selectLoading} from 'state/app/app.selectors' 

// @Styles - component
import './index.scss'

// @material ui
import Modal from "@material-ui/core/Modal"
import { makeStyles } from '@material-ui/core/styles'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import Grid from '@material-ui/core/Grid'
import Button from "@material-ui/core/Button"

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    border: "none",
    borderBottom: "solid 2px #3e3e3e",
    overflow: "hidden",
    borderRadius: "5px"
  },
  img: { 
  	maxHeight: '90vh',
  	maxWidth: '90vw'
  }
}))

function Login() {
	const classes = useStyles()
	const [open, setOpen] = React.useState(true)
	const dispatch = useDispatch()
	const loading = useSelector(state => selectLoading(state))

	const handleSubmit = useCallback((data, actions) => {
	    const payload = {
	        username: data.username,
	        password: data.password
	    }
    	dispatch(login(payload))
    	actions.setSubmitting(false)
  	}, [dispatch])

	const recoverPass = useCallback(() => {
		dispatch(openModal(
			<RecoverPass loading={loading}/>
		))
	}, [dispatch,loading])

    return (
    	<React.Fragment>
	      <Modal
	        aria-labelledby="transition-modal-title"
	        aria-describedby="transition-modal-description"
	        className={classes.modal}
	        open={open}
	        onClose={() => setOpen(false)}
	        closeAfterTransition
	        BackdropComponent={Backdrop}
	        BackdropProps={{
	          timeout: 500,
	        }}
	      >
	        <Fade in={open}>
	          <div className={classes.paper}>
	            <img src="images/registro.png" className={classes.img} alt="Registro"/>
	          </div>
	        </Fade>
	      </Modal>

	      <Grid container justify="center">
	      	<Grid item sm={12} md={5}>
		        <div className="box--login card--box" style={{textAlign: "center"}}>
		        	<div className="avatar">
		        		<img src={avatar} alt="avatar"/>
		        	</div>    
		        	<p style={{fontSize: "30px",fontWeight: "bold",color: "#2C395E"}}>Iniciar Sesión</p>
		            <AuthForm onSubmit={handleSubmit} disabledButton={loading}/>
		            <br />
		            <Button onClick={() => recoverPass()}>
		            	<span style={{color: "var(--darkBlue)"}}>Recuperar contraseña</span>
		            </Button>

		        </div>
	      	</Grid>
	      </Grid>
    	</React.Fragment>
    )
}

export default Login