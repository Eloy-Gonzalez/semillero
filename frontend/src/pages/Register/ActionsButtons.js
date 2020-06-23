import React from 'react'
import Button from '@material-ui/core/Button'

function ActionsButtons({ actualVisible, totalForms, nextPrev, disabledButton=false }) {
	return (
        <div className="formStep--actions">
            { actualVisible !== 0 &&
                <Button type="button" className="btn--prev" variant="outlined" color="primary" onClick={() => nextPrev(actualVisible - 1)}>
                    Anterior
                </Button>
            }
            <Button type="submit" className="btn--next" variant="outlined" color="primary" disabled={disabledButton}>
                { actualVisible === totalForms ? 'Enviar' : 'Continuar' }
            </Button>
        </div>
	)
}
export default React.memo(ActionsButtons)