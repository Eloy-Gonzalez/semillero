// @Vendors
import React, {Suspense, useCallback} from 'react'
import useStepForm from './useStepForm'

// @Components

// @Local Components
import FormStepActions from './FormStepActions'
import FormStepBullets from './FormStepBullets'

// @Local Lazy Components
const FormStep1 = React.lazy( () => import("./FormStep1"))
const FormStep2 = React.lazy( () => import("./FormStep2"))
const FormStep3 = React.lazy( () => import("./FormStep3"))

export default function Home() {
    const handleSubmit = useCallback( function() {
        alert("Datos enviados")
    }, [])

    const forms = [ FormStep1, FormStep2, FormStep3 ]
    const {
        actualVisible,
        VisualizedForm,
        next,
        back
    } = useStepForm(forms, handleSubmit)

    return (
        <div className="container">
            <h3 className="app--title">Completa tu registro</h3>
            <div className="target">
                <Suspense fallback={<div className="backdrop--loader">cargando....</div>}>
                    <VisualizedForm />
                </Suspense>
            </div>
            <div className="preViews">
                <FormStepActions 
                    actualVisible={actualVisible} 
                    totalForms={(forms.length -1)} 
                    next={next} 
                    back={back}
                />
                <FormStepBullets bullets={forms} />
            </div>
        </div>
    )
}