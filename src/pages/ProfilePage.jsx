import { Container } from "reactstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProfileContent from "../components/ProfileContent";
import React from "react";

const ProfilePage = () => {
	return (
		<div>
			<Header />
			<main>
				<Container className="col-12 col-lg-8">
					<ProfileContent />
				</Container>
			</main>
			<Footer />
		</div>
	);
};

export default ProfilePage;
