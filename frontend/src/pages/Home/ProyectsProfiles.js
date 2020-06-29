// @Vendors
import React, {useCallback, useMemo} from 'react'
import {useSelector} from 'react-redux'

// @Components
import Pagination from 'components/Pagination'
import SimpleTable from 'components/SimpleTable'
import FormAddProyects from './FormAddProyects'
import ActionsButtons from 'components/ActionsButtons'

// Selectors
import {selectLoading} from 'state/app/app.selectors'

function ProyectsProfiles({totalPosts, proyects, changePage, postsPerPage}) {
	const [showForm, setshowForm] = React.useState(false)
	const loading = useSelector(state => selectLoading(state))

	const columns = useMemo(() => [
		{id:0, label: "Nombre"},
		{id:1, label: "Descripción"},
		{id:2, label:"Hipervínculo"}
	], [])

	const onSubmit = useCallback((values, actions) => {
		alert(JSON.stringify(values))
		actions.setSubmitting(false)
	}, [])

	return (
		<div>
			
			<p style={{textAlign:"right"}}>
				<button onClick={() => setshowForm(prev => !prev)}>{!showForm ? "Agregar" : "Ocultar"} nuevo proyecto +</button>
			</p>
			<div className="table--data">
				<SimpleTable 
					columns={columns}
					rows={proyects}
					showForm={showForm}
					FormAddProyects={
						<FormAddProyects 
							onSubmit={onSubmit}
				            ActionsButtons={
				              <ActionsButtons 
				                actualVisible={0}
				                totalForms={0}
				                disabledButton={loading}
				              />}
						/>
					}
				/>
				<Pagination 
					totalPosts={totalPosts}
					postsPerPage={postsPerPage}
					changePage={changePage}
				/>
			</div>
		</div>
	)

}

export default React.memo(ProyectsProfiles)