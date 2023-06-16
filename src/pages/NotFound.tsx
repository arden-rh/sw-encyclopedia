import notFound from "../assets/images/swapi_404.svg"
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom'

const NotFound = () => {

	const navigate = useNavigate()

	return (
		<div className='home-page'>
			<h1><img src={notFound} alt="404: Not Found" /><span className="d-none">404: Not Found</span></h1>
			<Link
				className='go-back'
				to={`/`}
				onClick={(e) => {
					e.preventDefault();
					navigate(`/`);
				}}>
				<Button>Back</Button>
			</Link>
		</div>
	)
}

export default NotFound
