import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import NoInternet from "./pages/NoInternet.jsx";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/authContext.jsx";
import { ResumeProvider } from "./context/ResumeContext.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ToastContainer />
    <AuthProvider>
      <ResumeProvider>
        <NoInternet />
        <StrictMode>
          <App />
        </StrictMode>
      </ResumeProvider>
    </AuthProvider>
  </BrowserRouter>
);
