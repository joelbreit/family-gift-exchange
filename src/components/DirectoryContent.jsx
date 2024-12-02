import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	Alert,
	Button,
	Container,
	ListGroup,
	ListGroupItem,
	Spinner,
} from "reactstrap";
import { AuthContext } from "./AuthProvider";

const DirectoryContent = () => {
	const navigate = useNavigate();
	const [directoryData, setDirectoryData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const { authState } = useContext(AuthContext);

	useEffect(() => {
		let timeoutId;
		const controller = new AbortController();

		const fetchWishLists = async () => {
			if (!authState.authenticated) return;

			setIsLoading(true);
			setError(null);

			try {
				const response = await fetch(
					`${process.env.REACT_APP_API_URL}/wishLists`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
						signal: controller.signal,
					}
				);

				if (!response.ok) {
					throw new Error(
						`Failed to fetch wishlists: ${response.statusText}`
					);
				}

				const data = await response.json();
				setDirectoryData(data);
			} catch (error) {
				if (error.name === "AbortError") return;
				setError(error.message);
				console.error("Error fetching wishlists:", error);
			} finally {
				// Ensure minimum loading time of 1 second for UX
				timeoutId = setTimeout(() => {
					setIsLoading(false);
				}, 1000);
			}
		};

		fetchWishLists();

		return () => {
			controller.abort();
			clearTimeout(timeoutId);
		};
	}, [authState.authenticated]);

	const handleCoal = async (listOwner) => {
		navigate("/coal", { state: { list_owner: listOwner } });
	};

	const WishlistButton = ({ item }) => {
		const isCurrentUser = item.name === authState.name;
		const commonProps = {
			className: `primary-button ${isCurrentUser ? "opacity-50" : ""}`,
			disabled: isCurrentUser,
			"aria-disabled": isCurrentUser,
		};

		if (item.wishListUrl) {
			return (
				<a
					{...commonProps}
					className={`btn btn-primary ${commonProps.className}`}
					href={item.wishListUrl}
					role="button"
					target="_blank"
					rel="noopener noreferrer"
					aria-label={`Open ${item.name}'s wishlist in new tab`}
				>
					Visit Wishlist{" "}
					<i
						className="bi bi-box-arrow-up-right"
						aria-hidden="true"
					></i>
				</a>
			);
		}

		return (
			<Button {...commonProps} onClick={() => handleCoal(item.name)}>
				Visit Wishlist{" "}
				<i className="bi bi-box-arrow-up-right" aria-hidden="true"></i>
			</Button>
		);
	};

	if (!authState.authenticated) {
		return (
			<Container className="py-4 text-center">
				<h1>Welcome to the Wishlist Directory</h1>
				<p className="lead">
					Please{" "}
					<Link to="/login" className="text-decoration-none">
						login
					</Link>{" "}
					to view the directory of wishlists.
				</p>
			</Container>
		);
	}

	return (
		<Container className="py-4">
			<h1 className="text-center mb-4">Wishlist Directory</h1>

			{error && (
				<Alert color="danger" className="mb-4">
					{error}
				</Alert>
			)}

			{isLoading ? (
				<div className="text-center py-5">
					<Spinner color="primary" className="primary-spinner mb-2">
						<span className="visually-hidden">
							Loading wishlists...
						</span>
					</Spinner>
					<p className="text-muted">Loading wishlists...</p>
				</div>
			) : directoryData.length === 0 && !error ? (
				<Alert color="info">
					No wishlists found. Check back later!
				</Alert>
			) : (
				<>
					<Button
						href="https://www.giftster.com/group/x0P1z/"
						className="primary-button btn-lg w-100 mb-4"
						role="button"
						target="_blank"
						rel="noopener noreferrer"
					>
						Giftster Group{" "}
						<i className="bi bi-box-arrow-up-right"></i>
					</Button>
					<ListGroup className="shadow-sm">
						{directoryData.map((item, index) => (
							<ListGroupItem
								key={item.name || index}
								className="d-flex justify-content-between align-items-center p-3"
							>
								<strong className="me-3">{item.name}</strong>
								<WishlistButton item={item} />
							</ListGroupItem>
						))}
					</ListGroup>
				</>
			)}
		</Container>
	);
};

export default DirectoryContent;
