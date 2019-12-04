import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () =>
	<nav className="navbar navbar-expand-lg navbar-light bg-light">
		<div className="collapse navbar-collapse">
			<ul className="navbar-nav">
				<li className="nav-item">
					<NavLink className="nav-link" exact to="/">Home</NavLink>
				</li>
				<li className="nav-item">
					<NavLink className="nav-link" exact to="/rapor-ar">Rapor AR</NavLink>
				</li>
			</ul>
		</div>
	</nav>
export default Nav