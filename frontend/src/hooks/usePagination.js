import {useState} from 'react'

export default function usePagination({ posts = [], postsPerPage = 5 }) {

	const [currentPage, setCurrentPage] = useState(1)
	
	const indexOfLastPost = currentPage * postsPerPage
	const indexOfFirstPost = indexOfLastPost - postsPerPage
	const currentPost = posts.length ? posts.slice(indexOfFirstPost, indexOfLastPost) : []

	return {
		currentPage,
		postsPerPage,
		setCurrentPage,
		currentPost
	}

}