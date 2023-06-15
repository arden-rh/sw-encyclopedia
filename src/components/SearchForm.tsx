import { useState } from "react"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


interface IProps {
	onGetData: (query: string, page: number) => void
	onResetForm: () => void
	page: number
}

const SearchForm: React.FC<IProps> = ({ onGetData, onResetForm, page }) => {

	const [searchInput, setSearchInput] = useState("")
	const [formReset, setFormReset] = useState(false)

	const handleSubmit = (e: React.FormEvent) => {

		e.preventDefault()
		// setFormReset(false)

		if (!searchInput.trim().length) {
			return
		}

		onGetData(searchInput, page)
		setSearchInput("")
	}

	const handleReset = () => {

		setSearchInput("")
		// setFormReset(true)
		onResetForm()

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
						className="me-2"
						type="reset"
						variant="danger"
						onClick={handleReset}
					>Reset</Button>
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
