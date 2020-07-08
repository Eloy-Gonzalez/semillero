// @Vendors
import React from 'react'

// @Material ui
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

function ActionsButtons({ actualVisible=0, totalForms=0, nextPrev, disabledButton=false }) {
    return (
        <div className="formStep--actions">
            { actualVisible !== 0 &&
                <Button type="button" className="btn--prev" variant="outlined" color="primary" onClick={() => nextPrev(actualVisible - 1)}>
                    Anterior
                </Button>
            }
            <Button type="submit" className="btn--next" variant="outlined" color="primary" disabled={disabledButton}>
                { disabledButton ? <CircularProgress/> :
                    actualVisible === totalForms ? 
                    'Enviar' : 'Continuar' }
            </Button>
        </div>
	)
}
export default React.memo(ActionsButtons)