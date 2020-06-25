// @Vendors
import React, {useState} from 'react'

// @Components
const formAddProyect = ({ proyects }) => (
	<React.Fragment>
		<div className="">
			<p>Form ad´d proyect</p>
		</div>
		<div>
			table here!
		</div>
		<div className="proyects--pagination">
			{/*<Pagination posts={proyects}/>*/}
		</div>
	</React.Fragment>
)

const initialPosts = [
	{
		id_usuario: 1,
		id_periodo : 1,
		nombre: "Test",
		descripcion : "Test description...",	
		url_video : "https://url_video.com/test.mp4"
	},
	{
		id_usuario: 2,
		id_periodo : 1,
		nombre: "Test 2",
		descripcion : "Test description 2...",
		url_video : "https://url_video-2.com/test-2.mp4"
	},
	{
		id_usuario: 3,
		id_periodo : 1,
		nombre: "Test 2",
		descripcion : "Test description 2...",
		url_video : "https://url_video-2.com/test-2.mp4"
	},
	{
		id_usuario: 4,
		id_periodo : 1,
		nombre: "Test 2",
		descripcion : "Test description 2...",
		url_video : "https://url_video-2.com/test-2.mp4"
	},
	{
		id_usuario: 4,
		id_periodo : 1,
		nombre: "Test 2",
		descripcion : "Test description 2...",
		url_video : "https://url_video-2.com/test-2.mp4"
	},
	{
		id_usuario: 5,
		id_periodo : 1,
		nombre: "Test 2",
		descripcion : "Test description 2...",
		url_video : "https://url_video-2.com/test-2.mp4"
	}
]

export default function Home() {
	const [posts, setPost] = useState(initialPosts)
	const [currentPage, setCurrentPage] = useState(1)
	const [postsPerPage, setPostsPerPage] = useState(10)

	const indexOfLastPost = currentPage * postsPerPage
	const indexOfFirstPost = indexOfLastPost - postsPerPage
	const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost)


    return (
    	<React.Fragment>
			<div style={{gridColumn:"1 / 13", textAlign:"center"}}>
				<h1 className="app-title">Comienza a subir tus Proyectos</h1>
				<formAddProyect proyects={[]} />
			</div>
		</React.Fragment>
    )
}