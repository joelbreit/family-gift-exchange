import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import AboutPage from "./pages/AboutPage";
import CoalPage from "./pages/CoalPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import React from "react";
import ReactDOM from "react-dom/client";

const Root = () => {
	return (
		<React.StrictMode>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/coal" element={<CoalPage />} />
                </Routes>
			</BrowserRouter>
		</React.StrictMode>
	);
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);