import  {useState, useCallback} from 'react'

export default function useStepForm( listsFormiks = [], onSubmit ) {
    const [actualVisible, setActualVisible] = useState(0) 
    const VisualizedForm = listsFormiks[actualVisible]

    const next = useCallback( function(){
        if(actualVisible === listsFormiks.length -1){
            /* ENVIAR FORMULARIO */
            onSubmit()
        } else {
            setActualVisible( p => p + 1)
        }
    }, [actualVisible, listsFormiks, onSubmit])

    const back = useCallback( function() {
        setActualVisible(prev => prev -1)
    }, [])

    return {
        actualVisible,
        VisualizedForm,
        next,
        back
    }
}