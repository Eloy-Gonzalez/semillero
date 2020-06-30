// @Vendors
import React, {useState} from 'react'

// @Components
import ProyectsProfiles from './ProyectsProfiles'

const ini = [
	{id: 1, nombre:"test", descripcion: "some description a", url_video: "http://google.com"},
	{id: 2, nombre:"test", descripcion: "some description a", url_video: "http://google.com"},
	{id: 3, nombre:"test", descripcion: "some description a", url_video: "http://google.com"},
	{id: 4, nombre:"test", descripcion: "some description a", url_video: "http://google.com"},
	{id: 5, nombre:"test", descripcion: "some description a", url_video: "http://google.com"}
]
export default function Home() {
	const [posts] = useState(ini)
	const [currentPage, setCurrentPage] = useState(1)
	const [postsPerPage] = useState(5)
	
	// Get Index of Posts
	const indexOfLastPost = currentPage * postsPerPage
	const indexOfFirstPost = indexOfLastPost - postsPerPage
	const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost)

    return (
    	<React.Fragment>
			<div style={{gridColumn:"2 / 12", textAlign:"center"}}>
				<h1 className="app-title">Comienza a subir tus Videos</h1>
				<ProyectsProfiles 
					proyects={currentPost}
					changePage={setCurrentPage}
					postsPerPage={postsPerPage}
					totalPosts={posts.length}
				/>
			</div>
		</React.Fragment>
    )
}