import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { IconProp } from '@fortawesome/fontawesome-svg-core'


interface IProps {
	children: React.ReactNode
	resource: string
	icon: IconProp
}

const CategoryCompFilm:  React.FC<IProps> = ({ children, resource, icon }) => {
	return (
		<div>
			<h2><Link to={`/${resource}`}>{resource} <FontAwesomeIcon icon={icon} /></Link></h2>
			<ul className='links'>
				{children}
			</ul>
		</div>
	)
}

export default CategoryCompFilm
