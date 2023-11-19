import {
	Collapse,
	Nav,
	NavItem,
	NavLink,
	Navbar,
	NavbarBrand,
	NavbarToggler,
} from "reactstrap";
import React, { useState } from "react";

import { NavLink as RouterNavLink } from "react-router-dom";

function Header(args) {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<div>
			<Navbar expand="sm" color="primary" dark {...args} className="primary-navbar">
				<NavbarBrand tag={RouterNavLink} to="/">
					Family Gift Exchange
				</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="me-auto" navbar>
						<NavItem>
							<NavLink tag={RouterNavLink} to="/login" exact>
								Login
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink tag={RouterNavLink} to="/profile">
								Profile
							</NavLink>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	);
}

export default Header;
