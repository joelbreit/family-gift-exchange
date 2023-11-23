import {
	Button,
	Container,
	ListGroup,
	ListGroupItem,
	Row,
	Spinner,
} from "reactstrap";
import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

const DirectoryContent = () => {
	const navigate = useNavigate();
	const [directoryData, setDirectoryData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const { authState } = useContext(AuthContext);

	useEffect(() => {
		setIsLoading(true);

		const fetchWishLists = async () => {
			if (authState.authenticated) {
				try {
					const response = await fetch(
						`${process.env.REACT_APP_API_URL}/wishLists`,
						{
							method: "GET",
							headers: {
								"Content-Type": "application/json",
							},
						}
					);

					if (response.ok) {
						const data = await response.json();
						setDirectoryData(data);
					} else {
						// Handle errors
						console.error("Failed to fetch wishlists");
					}
				} catch (error) {
					console.error("Error fetching wishlists:", error);
				}
			}
		};

		fetchWishLists();

		// Show the loading spinner for at least 2 seconds
		setTimeout(() => {
			setIsLoading(false);
		}, 2000);
	}, [authState.authenticated]); // Dependency array to re-run effect when authenticated state changes

	const handleCoal = async (listOwner) => {
		navigate("/coal", {
			state: {
				list_owner: listOwner,
			},
		});
	};

	return authState.authenticated ? (
		<Container>
			<h1 className="text-center">Wishlist Directory</h1>
			<ListGroup>
				{directoryData.map((item, index) => (
					<ListGroupItem key={index}>
						<strong>{item.name}</strong>:{" "}
						{item.wishListUrl ? (
							<a
								className="btn btn-primary primary-button"
								href={item.wishListUrl}
								role="button"
								target="_blank"
								rel="noopener noreferrer"
								// disable if item.name is the same as the logged in user
								disabled={item.name === authState.name}
							>
								Visit Wishlist{" "}
								<i className="bi bi-box-arrow-up-right"></i>
							</a>
						) : (
							<Button
								onClick={() => handleCoal(item.name)}
								className="primary-button"
							>
								Visit Wishlist{" "}
								<i className="bi bi-box-arrow-up-right"></i>
							</Button>
						)}
					</ListGroupItem>
				))}
			</ListGroup>
			<Row className="mt-3 justify-content-center">
				{isLoading ? <Spinner color="success" /> : null}
			</Row>
		</Container>
	) : (
		<Container>
			<h1 className="text-center">Welcome!</h1>
			<p>
				Please <a href="/login">login</a> to view your directory of
				wishlists.
			</p>
		</Container>
	);
};

export default DirectoryContent;
