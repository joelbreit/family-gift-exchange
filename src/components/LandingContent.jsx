import {
	Button,
	Col,
	Container,
	Form,
	FormFeedback,
	FormGroup,
	Input,
	Label,
	Row,
} from "reactstrap";
import React, { useMemo, useState } from "react";

const LandingContent = () => {
	const [isNewUser, setIsNewUser] = useState(true);
	const [selectedName, setSelectedName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [names, setNames] = useState([]);

	// Once, when this loads, we want to get the list of names from the API
	useMemo(() => {
		// TODO: Implement API call functionality here
		setNames(["John", "Jane", "Joe"]);
	}, []); // Empty array means this will only run once

	const handleSubmit = (event) => {
		event.preventDefault();
		// Implement API call functionality here
	};

	const handleCreateAccount = async () => {
		const response = await fetch(
			"https://[api-id].execute-api.[region].amazonaws.com/dev/createAccount",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					firstName: "UserFirstName",
					password: "UserPassword",
				}),
			}
		);

		// Handle the response
	};

	return (
		<Container>
			<Row className="justify-content-center">
				<Col sm="12" md="8">
					<Form onSubmit={handleSubmit}>
						<FormGroup>
							<Label for="nameSelect">Name</Label>
							<Input
								type="select"
								name="name"
								id="nameSelect"
								value={selectedName}
								onChange={(e) =>
									setSelectedName(e.target.value)
								}
							>
								{names.map((name) => (
									<option key={name} value={name}>
										{name}
									</option>
								))}
							</Input>
						</FormGroup>

						{isNewUser && (
							<>
								<FormGroup>
									<Label for="password">
										Create Password
									</Label>
									<Input
										type="password"
										name="password"
										id="password"
										value={password}
										onChange={(e) =>
											setPassword(e.target.value)
										}
									/>
								</FormGroup>
								<FormGroup>
									<Label for="confirmPassword">
										Confirm Password
									</Label>
									<Input
										type="password"
										name="confirmPassword"
										id="confirmPassword"
										value={confirmPassword}
										onChange={(e) =>
											setConfirmPassword(e.target.value)
										}
										invalid={
											password !== confirmPassword &&
											confirmPassword.length > 0
										}
									/>
									<FormFeedback>
										Passwords do not match
									</FormFeedback>
								</FormGroup>
							</>
						)}
						<Row>
							<Col>
								<Button
									type="button"
									title={
										isNewUser ? "Log In" : "Create Account"
									}
									color="secondary"
									block
									onClick={() => setIsNewUser(!isNewUser)}
								>
									{isNewUser ? "Existing User?" : "New User?"}
								</Button>
							</Col>
							<Col>
								<Button type="submit" color="primary" block>
									{isNewUser ? "Create Account" : "Log In"}
								</Button>
							</Col>
						</Row>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default LandingContent;
