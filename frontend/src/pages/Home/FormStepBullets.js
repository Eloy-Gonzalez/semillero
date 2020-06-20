import React from 'react'

function FormStepBullets( { bullets = [] }) {
    return (
        <div className="formStep--bullets">
            {
            bullets.map( index => (
                    <span className="formStep--bullet">bullet</span> 
                )) }
        </div>
    )
}

export default React.memo(FormStepBullets, () => (true) )
