import Button from "react-bootstrap/Button"

interface IProps {
	page: number
	totalPages: number
	onChangePage: (next: boolean) => void
}

const Pagination: React.FC<IProps> = ({ onChangePage, page, totalPages }) => {
	return (
		<div className="d-flex justify-content-between align-items-center mt-4">
			<div className="prev">
				<Button
					disabled={page <= 1}
					onClick={() => onChangePage(false)}
					variant="primary"
				>Previous Page</Button>
			</div>
			<div className="page">
				{page} / {totalPages}
			</div>
			<div className="next">
				<Button
					disabled={page >= totalPages}
					onClick={() => onChangePage(true)}
					variant="warning"
				>Next Page</Button>
			</div>
		</div>
	)
}

export default Pagination
