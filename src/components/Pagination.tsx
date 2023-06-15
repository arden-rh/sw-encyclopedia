import Button from "react-bootstrap/Button"

interface IProps {
	page: number
	totalPages: number
	onNextPage: () => void
	onPrevPage: () => void
}

const Pagination: React.FC<IProps> = ({ page, totalPages, onNextPage, onPrevPage }) => {
	return (
		<div className="d-flex justify-content-between align-items-center">
			<div className="prev">
				<Button
					disabled={page <= 0}
					onClick={onPrevPage}
					variant="primary"
				>Previous Page</Button>
			</div>
			<div className="page">
				{page} / {totalPages}
			</div>
			<div className="next">
				<Button
					disabled={page >= totalPages}
					onClick={onNextPage}
					variant="warning"
				>Next Page</Button>
			</div>
		</div>
	)
}

export default Pagination
