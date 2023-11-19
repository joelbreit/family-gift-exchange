import "bootstrap-icons/font/bootstrap-icons.css";

import { Container } from "reactstrap";
import React from "react";
import { useLocation } from "react-router-dom";

const ProfileContent = () => {
	const location = useLocation();
	const { name, wishListUrl, giftee } = location.state || {};

	return (
		name ?
		<Container>
			<h1 className="text-center">Welcome, {name}!</h1>

			<p>
				<strong>Giftee:</strong> {giftee}
			</p>
			<p>
				<a
					className="btn btn-primary primary-button"
					href={wishListUrl}
					role="button"
					target="_blank"
					rel="noopener noreferrer"
				>
					Visit Wishlist <i className="bi bi-box-arrow-up-right"></i>
				</a>
			</p>
		</Container>
		:
		<Container>
			<h1 className="text-center">Welcome!</h1>
			<p>
				Please <a href="/login">login</a> to view your profile.
			</p>
		</Container>
	);
};

export default ProfileContent;
