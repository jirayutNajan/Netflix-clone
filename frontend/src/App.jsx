import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/Home/HomePage";
import SignupPage from "./pages/SignupPage";
import Footer from "./components/footer";
import { Toaster } from "react-hot-toast";

const app = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
}

export default app;