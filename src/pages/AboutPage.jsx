import AboutContent from "../components/AboutContent";
import { Container } from "reactstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import React from "react";

const AboutPage = () => {
	return (
		<div>
			<Header />
			<main>
				<Container className="col-12 col-lg-8">
					<AboutContent />
				</Container>
			</main>
			<Footer />
		</div>
	);
};

export default AboutPage;
