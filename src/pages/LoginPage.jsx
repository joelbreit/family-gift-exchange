import { Container } from "reactstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoginContent from "../components/LoginContent";
import React from "react";

const LoginPage = () => {
	return (
		<div>
			<Header />
			<main>
				<Container className="col-12 col-lg-8">
					<LoginContent />
				</Container>
			</main>
			<Footer />
		</div>
	);
};

export default LoginPage;
