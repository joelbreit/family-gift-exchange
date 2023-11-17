# Setup Process

## Create the Project

1. Navigate to parent folder of project (do not create a new folder)
2. Create React app (this will create a new folder)
   1. `npx create-react-app family-gift-exchange`
3. Install dependencies
   1. `npm install react react-dom react-router-dom react-scripts reactstrap bootstrap-icons sass --save`
      1. react for compartmentalizing code
      2. react-dom and react-router-dom for routing between pages
      3. react-scripts for running the app
      4. reactstrap for bootstrap components
      5. bootstrap-icons for icons
      6. sass for color variable overrides)
      7. --save will save the dependencies to package.json
4. Run `npm install` and `npm update`

## Clean Up React's Default Files

1. Replace the files in ./public
2. Update the <title> in ./public/index.html
3. In ./src, create a components/ folder, a pages/ folder, and a styles/ folder
4. Move App.js to ./pages, rename to Home.js, and update imports
5. Move .css files to ./styles, rename to .scss, and update imports
6. Replace index.js with:
```JavaScript
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
```
6. Remove extra .js files
7. Format files (Option + Shift + F)

## Git Setup

1. Change default branch to main
* `git branch -m master main`
2. Add ignore/ to .gitignore
3. Add an ignore/ folder
4. Commit changes
5. Publish branch

## Run Locally

1. Run `npm start`