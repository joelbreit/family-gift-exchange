import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";

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
				</Routes>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
                <Routes>
                    <Route path="/profile" element={<ProfilePage />} />
                </Routes>
			</BrowserRouter>
		</React.StrictMode>
	);
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);