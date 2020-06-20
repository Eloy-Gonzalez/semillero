import React from 'react'

function formStepActions( { actualVisible = 0, totalForms = 1, next, back }) {
    return (
        <div className="formStep--actions">
            { actualVisible !== 0 && 
                <button className="btn--form prev" onClick={() => back()}> 
                    {"<-"} Anterior
                </button>
            }
            <button className="btn--form next" onClick={() => next()}>
                { actualVisible === totalForms ? 'Guardar datos +' : 'Siguiente ->' }
            </button>
        </div>
    )
}

export default React.memo(formStepActions)
