// @Vendors
import React from 'react'

// @Components
import Pagination from 'components/Pagination'

const FormAddProyect = ({ proyects }) => (
	<React.Fragment>
		<div className="">
			<p>Form ad´d proyect</p>
		</div>
		<div>
			table here!
		</div>
		<div className="proyects--pagination">
			<Pagination postsPerPage={postsPerPage} totalPost={posts.length} changePage={setCurrentPage}/>
		</div>
	</React.Fragment>
)

export default React.memo(FormAddProyect)