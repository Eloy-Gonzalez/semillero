import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'

function DialogConfirm({
	open,
	onClose,
	onConfirm,
	dialogTitle = "Not title assigned",
	dialogText}
	){
	
	const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
	
  const handleConfirm = React.useCallback(() => {
    onClose()
    setTimeout(() => {
      onConfirm()
    }, 300)
  }, [onClose, onConfirm])

	return (
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
        	{dialogTitle}
        </DialogTitle>
        
        <DialogContent>
          <DialogContentText>
            {dialogText}
          </DialogContentText>
        </DialogContent>
        
        <DialogActions>
          <Button autoFocus onClick={onClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      
      </Dialog>
	)
}

export default DialogConfirm