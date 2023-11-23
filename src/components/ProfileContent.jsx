import "bootstrap-icons/font/bootstrap-icons.css";

import React, { useContext } from "react";

import { AuthContext } from "./AuthProvider";
import { Container } from "reactstrap";
import { useLocation } from "react-router-dom";

const ProfileContent = () => {
	const location = useLocation();
	const { name } = location.state || {};

	const { authState } = useContext(AuthContext);

	return authState.authenticated ? (
		<Container>
			<h1 className="text-center">Welcome, {name}!</h1>

			<p>
				<strong>Giftee:</strong> {authState.giftee}
			</p>
			<p>
				<a
					className="btn btn-primary primary-button"
					href={authState.wishListUrl}
					role="button"
					target="_blank"
					rel="noopener noreferrer"
				>
					Visit Wishlist <i className="bi bi-box-arrow-up-right"></i>
				</a>
			</p>
		</Container>
	) : (
		<Container>
			<h1 className="text-center">Welcome!</h1>
			<p>
				Please <a href="/login">login</a> to view your profile.
			</p>
		</Container>
	);
};

export default ProfileContent;
