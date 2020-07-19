import React, { useContext, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import AuthContext from "../../context/auth/authContext";
import ContactContext from "../../context/contact/contactContext";
import { Navbar, NavbarBrand, NavItem, NavLink, Nav } from "reactstrap";

const NavigationBar = ({ title, icon }) => {
	const authContext = useContext(AuthContext);
	const contactContext = useContext(ContactContext);

	const { isAuthenticated, logoutUser, loadUser } = authContext;
	const { clearContacts } = contactContext;

	useEffect(() => {
		loadUser();
		// eslint-disable-next-line
	}, []);

	const onLogout = () => {
		logoutUser();
		clearContacts();
	};

	const authLinks = (
		<Fragment>
			<NavItem>
				<NavLink onClick={onLogout} href="#!">
					<i className="fas fa-power-off text-nav"></i>{" "}
					<span className="hide-sm text-nav">Logout</span>
				</NavLink>
			</NavItem>
		</Fragment>
	);

	const guestLinks = (
		<Fragment>
			<NavItem>
				<NavLink href="/register" className="text-nav">
					Register
				</NavLink>
			</NavItem>
			<NavItem>
				<NavLink href="/login" className="text-nav">
					Login
				</NavLink>
			</NavItem>
		</Fragment>
	);

	return (
		<div>
			<Navbar className="fonts bg-color" expand="md">
				<NavbarBrand href="/" className={icon}>
					{" "}
					{title}
				</NavbarBrand>
				<Nav className="ml-auto" navbar>
					{isAuthenticated ? authLinks : guestLinks}
				</Nav>
			</Navbar>
		</div>
	);
};

NavigationBar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string,
};

NavigationBar.defaultProps = {
	title: "Bank of Contacts",
	icon: "far fa-address-book text-nav",
};

export default NavigationBar;
