import { Button, Col, Container, Row } from "reactstrap";

import React from "react";
import { useNavigate } from "react-router-dom";

const LandingContent = () => {
	const navigate = useNavigate();

	const handleNavigate = (isNewUser) => {
		navigate("/login", { state: { isNewUser } });
	};

	return (
		<Container>
			<Row className="justify-content-center">
				<Col md="8">
					<h1>Welcome to the 2025 Family Gift Exchange Web App!</h1>
					<p>
						A convenient way to manage your family's gift exchange
						this holiday season... as long as your family happens to
						be Joel Breit's family!
					</p>
					<p>
						Click one of the button below to get started. If you're
						new, you'll be asked to create an account. If you've
						used this app before, you can log in with your existing
						account.
					</p>
					<div>
						<Button
							color="success"
							onClick={() => handleNavigate(true)}
							outline
						>
							Sign Up
						</Button>{" "}
						<Button
							color="primary"
							onClick={() => handleNavigate(false)}
							className="primary-button"
						>
							Login
						</Button>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default LandingContent;
