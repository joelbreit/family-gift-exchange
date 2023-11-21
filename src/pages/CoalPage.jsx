import CoalContent from "../components/CoalContent";
import { Container } from "reactstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import React from "react";

const CoalPage = () => {
	return (
		<div>
			<Header />
			<main>
				<Container className="col-12 col-lg-8">
					<CoalContent />
				</Container>
			</main>
			<Footer />
		</div>
	);
};

export default CoalPage;
