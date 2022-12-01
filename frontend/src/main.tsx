import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "jotai";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<Provider>
		<App />
	</Provider>,
);
