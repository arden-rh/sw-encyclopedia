import logo from "../images/swapi_logo.svg"

const HomePage = () => {
	return (
		<div className='home-page'>
			<p>Welcome to</p>
			<h1><img src={logo} alt="The Star Wars Encyclopedia" /><span className="d-none">The Star Wars Encyclopedia</span></h1>
		</div>
	)
}

export default HomePage
