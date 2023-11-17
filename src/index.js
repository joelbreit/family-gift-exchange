import "./styles/index.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./pages/App";
import React from "react";
import ReactDOM from "react-dom/client";

const Root = () => {
	return (
		<React.StrictMode>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<App />} />
				</Routes>
			</BrowserRouter>
		</React.StrictMode>
	);
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);