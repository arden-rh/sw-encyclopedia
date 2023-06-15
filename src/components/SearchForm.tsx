import { useState } from "react"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


interface IProps {
	onFormSubmit: (query: string, page: number) => void
	page: number
}

const SearchForm: React.FC<IProps> = ({ onFormSubmit, page }) => {

	const [searchInput, setSearchInput] = useState("")

	const handleSubmit = (e: React.FormEvent) => {

		e.preventDefault()

		if (!searchInput.trim().length) {
			return
		}

		onFormSubmit(searchInput, page)
		setSearchInput("")
	}

	return (
		<>
			<Form className="mb-4" onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="searchQuery">
					<Form.Label>Search</Form.Label>
					<Form.Control
						autoFocus
						onChange={e => setSearchInput(e.target.value)}
						placeholder="Enter your search here..."
						required
						type="text"
						value={searchInput}
					/>
				</Form.Group>
				<div className="d-flex justify-content-end">
					<Button
						disabled={!searchInput.trim().length}
						type="submit"
						variant="success"
					>Search</Button>
				</div>
			</Form>
		</>
	)
}

export default SearchForm
