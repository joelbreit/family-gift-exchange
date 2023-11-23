import { Container } from "reactstrap";
import DirectoryContent from "../components/DirectoryContent";
import Footer from "../components/Footer";
import Header from "../components/Header";
import React from "react";

const DirectoryPage = () => {
	return (
		<div>
			<Header />
			<main>
				<Container className="col-12 col-lg-8">
					<DirectoryContent />
				</Container>
			</main>
			<Footer />
		</div>
	);
};

export default DirectoryPage;
