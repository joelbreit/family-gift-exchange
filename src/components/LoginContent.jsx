import {
	Alert,
	Button,
	Col,
	Container,
	Form,
	FormFeedback,
	FormGroup,
	Input,
	Label,
	Row,
	Spinner,
} from "reactstrap";
import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { AuthContext } from "./AuthProvider";

const apiUrl = process.env.REACT_APP_API_URL;

const LoginContent = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const signUpClicked = location.state?.isNewUser ?? false;
	const [isNewUser, setIsNewUser] = useState(signUpClicked);
	const [selectedName, setSelectedName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const { authState, setAuthState } = useContext(AuthContext);

	const handleSubmit = (event) => {
		event.preventDefault();
		setError("");
		setIsLoading(true);

		const startTime = Date.now();
		// Implement API call functionality here
		if (isNewUser) {
			handleCreateAccount();
		} else {
			handleLogin();
		}

		const endTime = Date.now();
		console.log(`API call duration: ${endTime - startTime} ms`);

		// Show the loading spinner for at least 2 seconds
		setTimeout(() => {
			setIsLoading(false);
		}, 2000);
	};

	const handleLogin = async () => {
		const response = await fetch(`${apiUrl}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: selectedName,
				password: password,
			}),
		});

		// Handle the response
		const body = await response.json();
		const statusCode = response.status;
		let loginSuccess = false;
		switch (statusCode) {
			case 200:
				console.log("Login successful!");
				loginSuccess = true;
				break;
			case 400:
				console.error("400 Bad Request - Password not set");
				setError(
					"Password has not been set. Please create an account."
				);
				return;
			case 401:
				console.error("401 Unauthorized - Password incorrect");
				setError("Password invalid. Please try again.");
				return;
			case 404:
				console.error("404 Not Found - User not found");
				setError("User not found. Enter your first name.");
				return;
			case 500:
				console.error("500 Internal Server Error - Database error");
				setError("Database error. Please try again.");
				return;
			default:
				console.error("Unexpected error: ", statusCode);
				setError("An unexpected error occurred. Please try again.");
				return;
		}
		const receivedWishlistUrl = body.wishListUrl;
		const receivedGiftee = body.giftee;

		if (loginSuccess) {
			setAuthState({
				authenticated: true,
				user: selectedName,
				giftee: receivedGiftee,
				wishListUrl: receivedWishlistUrl,
			});
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
			const response = await fetch(`${apiUrl}/createAccount`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: selectedName,
					password: password,
				}),
			});
			// Handle the response
			const body = await response.json();
			const statusCode = response.status;
			let createAccountSuccess = false;
			switch (statusCode) {
				case 200:
					console.log("Account created successfully");
					createAccountSuccess = true;
					break;
				case 400:
					console.error("400 Bad Request - Password already set");
					setError("Password has already been set. Please log in.");
					return;
				case 404:
					console.error("404 Not Found - User not found");
					setError("User not found. Enter your first name.");
					return;
				case 500:
					console.error("500 Internal Server Error - Database error");
					setError("Database error. Please try again.");
					return;
				default:
					console.error("Unexpected error: ", statusCode);
					setError("An unexpected error occurred. Please try again.");
					return;
			}

			const receivedWishlistUrl = body.wishListUrl;
			const receivedGiftee = body.giftee;

			if (createAccountSuccess) {
				setAuthState({
					authenticated: true,
					user: selectedName,
					giftee: receivedGiftee,
					wishListUrl: receivedWishlistUrl,
				});
				navigate("/profile", {
					state: {
						name: selectedName,
						wishListUrl: receivedWishlistUrl,
						giftee: receivedGiftee,
					},
				});
			}
		} catch (error) {
			console.error("Error:", error);
			setError("An unexpected error occurred. Please try again.");
		}
	};

	return authState.authenticated ? (
		<>
			<h1 className="text-center">Welcome!</h1>
			<p>
				You're already logged in. Go to your{" "}
				<a href="/profile">profile</a>.
			</p>{" "}
		</>
	) : (
		<Container>
			<Row className="justify-content-center">
				<Col sm="12" md="8">
					{isNewUser ? <h1>Create Password</h1> : <h1>Log In</h1>}
					<Form onSubmit={handleSubmit}>
						{isNewUser ? (
							<p>
								If you are a valid user, your name has already
								been added to the system. Please enter your
								first name below and create a password.
							</p>
						) : (
							<p>
								If you have already created a password, please
								enter your first name and password to log in.
							</p>
						)}
						<FormGroup>
							<Label for="nameSelect">Name</Label>
							<Input
								type="text"
								name="name"
								id="name"
								placeholder="Enter your first name"
								onChange={(e) =>
									setSelectedName(e.target.value)
								}
							></Input>
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
										setError("");
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
						</Row>
						<Row className="mt-3 justify-content-center">
							{error && <Alert color="danger">{error}</Alert>}
							{isLoading ? <Spinner color="success" /> : null}
						</Row>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default LoginContent;
