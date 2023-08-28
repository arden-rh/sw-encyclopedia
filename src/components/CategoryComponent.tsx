import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { ID_Name } from '../types'
import { IconProp } from '@fortawesome/fontawesome-svg-core'


interface IProps {
	data: ID_Name[]
	resource: string
	icon: IconProp
}

const CategoryComponent: React.FC<IProps> = ({ data, resource, icon }) => {

	return (
		<div>
			<h2><Link to={`/${resource}`}>{resource} <FontAwesomeIcon icon={icon} /></Link></h2>
			<ul className='links'>
				{data.map(person =>
					<li>
						<Link to={`/${resource}/${person.id}`}><span>{person.name}</span>
							<span className="material-symbols-outlined">arrow_forward_ios</span>
						</Link>
					</li>)}
			</ul>
		</div>
	)
}

export default CategoryComponent
