import { Container } from "reactstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LandingContent from "../components/LandingContent";
import React from "react";

const LandingPage = () => {
	return (
		<div>
			<Header />
			<main>
				<Container className="col-12 col-lg-8">
					<LandingContent />
				</Container>
			</main>
			<Footer />
		</div>
	);
};

export default LandingPage;
