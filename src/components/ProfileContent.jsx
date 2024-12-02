import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Button, Container, Alert } from "reactstrap";
import { useLocation, Link } from "react-router-dom";

const ProfileContent = () => {
	const location = useLocation();
	const { name } = location.state || {};
	const { authState } = useContext(AuthContext);

	const ExternalLinkButton = ({ href, className, children }) => (
		<Button
			className={className}
			href={href}
			role="button"
			target="_blank"
			rel="noopener noreferrer"
		>
			{children} <i className="bi bi-box-arrow-up-right"></i>
		</Button>
	);

	if (authState.loading) {
		return (
			<Container className="text-center py-4">
				<div className="spinner-border text-primary" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
			</Container>
		);
	}

	if (authState.error) {
		return (
			<Container className="py-4">
				<Alert color="danger">
					Error loading profile. Please try again later.
				</Alert>
			</Container>
		);
	}

	if (!authState.authenticated) {
		return (
			<Container className="py-4 text-center">
				<h1>Welcome!</h1>
				<p className="lead">
					Please{" "}
					<Link to="/login" className="text-decoration-none">
						login
					</Link>{" "}
					to view your profile.
				</p>
			</Container>
		);
	}

	return (
		<Container className="py-4">
			<div className="text-center mb-4">
				<h1 className="display-4">
					Welcome, {name || authState.name || "Guest"}!
				</h1>
				{authState.giftee && (
					<p className="lead">
						<strong>Your Giftee:</strong>{" "}
						<span>{authState.giftee}</span>
					</p>
				)}
			</div>

			<div className="d-grid gap-3 col-md-6 mx-auto">
				<ExternalLinkButton
					href="https://www.giftster.com/group/x0P1z/"
					className="primary-button btn-lg w-100"
				>
					Giftster Group
				</ExternalLinkButton>

				{authState.wishListUrl && (
					<ExternalLinkButton
						href={authState.wishListUrl}
						className="secondary-button btn-lg w-100"
					>
						Amazon Wishlist
					</ExternalLinkButton>
				)}
			</div>
		</Container>
	);
};

export default ProfileContent;
