import { useParams } from 'react-router-dom';

const FilmPage = () => {

	const { id } = useParams();

	return (
		<div>Film Page {id}</div>
	)
}

export default FilmPage
