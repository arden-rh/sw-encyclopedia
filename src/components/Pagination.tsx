import Button from "react-bootstrap/Button"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'


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
				><FontAwesomeIcon icon={faArrowLeft} /></Button>
			</div>
			<div className="page">
				{page} / {totalPages}
			</div>
			<div className="next">
				<Button
					disabled={page >= totalPages}
					onClick={() => onChangePage(true)}
				><FontAwesomeIcon icon={faArrowRight} /></Button>
			</div>
		</div>
	)
}

export default Pagination
