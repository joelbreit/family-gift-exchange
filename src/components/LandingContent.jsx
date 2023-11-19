import { Button, Col, Container, Row } from "reactstrap";

import React from "react";
import { useNavigate } from "react-router-dom";

const LandingContent = () => {
    const navigate = useNavigate();

    const handleNavigate = (isNewUser) => {
        navigate('/login', { state: { isNewUser } });
    };

	return (
		<Container>
			<Row className="justify-content-center">
				<Col md="8">
					<h1>Welcome to Family Gift Exchange!</h1>
					<p>
						A convenient way to manage your family's gift exchange
						this holiday season.
					</p>
					<ul>
						<li>Easy gift recipient assignment</li>
						<li>Create and share wishlists</li>
						<li>Secure and easy to use</li>
					</ul>
					<div>
						<Button color="success" onClick={() => handleNavigate(true)} outline>
							Sign Up
						</Button>{" "}
						<Button color="primary" onClick={() => handleNavigate(false)} className="primary-button">
							Login
						</Button>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default LandingContent;
