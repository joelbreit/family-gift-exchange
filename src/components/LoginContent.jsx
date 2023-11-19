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
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;

const LoginContent = () => {
	const navigate = useNavigate();
    const location = useLocation();
    const signUpClicked = location.state?.isNewUser ?? false;  // Fallback to false if undefined
	console.log("signUpClicked: ", signUpClicked);
	const [isNewUser, setIsNewUser] = useState(signUpClicked);
	const [selectedName, setSelectedName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [names, setNames] = useState([]);

	// Once, when this loads, we want to get the list of names from the API
	useEffect(() => {
		// TODO: Implement API call functionality here
		setNames([
			"",
			"Becky",
			"Glenn",
			"Hannah",
			"Joel",
			"John",
			"Kristina",
			"Lauren",
			"Luke",
			"Rosemary",
			"Zac",
		]);
	}, []); // Empty array means this will only run once

	const handleSubmit = (event) => {
		event.preventDefault();
		// Implement API call functionality here
		if (isNewUser) {
			handleCreateAccount();
		} else {
			handleLogin();
		}
	};

	const handleLogin = async () => {
		const response = await fetch(
			`${apiUrl}/login`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: selectedName,
					password: password,
				}),
			}
		);
		// Handle the response
		const body = await response.json();
		console.log("Response from API: ", body);
		let loginSuccess = false;
		if (response.status !== 200) {
			console.log("Error: ", body);
			return;
		} else {
			console.log("Login successful!");
			loginSuccess = true;
		}
		const receivedWishlistUrl = body.wishListUrl;
		const receivedGiftee = body.giftee;

		if (loginSuccess) {
			// history.push({
			//     pathname: '/profile',
			//     state: { wishListUrl: receivedWishlistUrl, giftee: receivedGiftee }
			// });

			navigate("/profile", {
				state: {
					name: selectedName,
					wishListUrl: receivedWishlistUrl,
					giftee: receivedGiftee,
				},
			});
		}
	};

	const handleCreateAccount = async () => {
		console.log("Creating account for ", selectedName);
		try {
			const response = await fetch(
				`${apiUrl}/createAccount`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name: selectedName,
						password: password,
					}),
				}
			);
			// Handle the response
			const body = await response.json();
			console.log("Response from API: ", body);
		} catch (error) {
			console.error("Error:", error);
		}
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
								placeholder="Select a name"
							>
								{names.map((name) => (
									<option key={name} value={name}>
										{name}
									</option>
								))}
							</Input>
						</FormGroup>

						{isNewUser ? (
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
						) : (
							<FormGroup>
								<Label for="password">Password</Label>
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
									onClick={() => {
										setIsNewUser(!isNewUser);
									}}
								>
									{isNewUser ? "Existing User?" : "New User?"}
								</Button>
							</Col>
							<Col>
								<Button
									type="submit"
									block
									onClick={handleSubmit}
									className="primary-button"
									disabled={
										!selectedName ||
										!password ||
										(isNewUser &&
											(password !== confirmPassword ||
												confirmPassword.length === 0))
									}
								>
									{isNewUser ? "Create Account" : "Log In"}
								</Button>
							</Col>
							{isNewUser}
						</Row>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default LoginContent;
