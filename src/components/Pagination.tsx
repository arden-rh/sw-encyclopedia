import Button from "react-bootstrap/Button"

interface IProps {
	page: number
	totalPages: number
	onChangePage: (next: boolean) => void
}

const Pagination: React.FC<IProps> = ({ onChangePage, page, totalPages }) => {
	return (
		<div className="pagination">
			<div className="prev">
				<Button
					disabled={page <= 1}
					onClick={() => onChangePage(false)}
				>Previous Page</Button>
			</div>
			<div className="page">
				{page} / {totalPages}
			</div>
			<div className="next">
				<Button
					disabled={page >= totalPages}
					onClick={() => onChangePage(true)}
				>Next Page</Button>
			</div>
		</div>
	)
}

export default Pagination
