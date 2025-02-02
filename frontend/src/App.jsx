import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/Home/HomePage";
import SignupPage from "./pages/SignupPage";
import Footer from "./components/Footer";
import WatchPage from "./pages/WatchPage";
import SearchPage from "./pages/SearchPage";
import SearchHistoryPage from "./pages/SearchHistoryPage";
import NotFoundPage from "./pages/NotFoundPage";

import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser";
import { useEffect } from "react";
import { Loader } from "lucide-react";

const app = () => {
  const { user, isCheckingAuth, authCheck } = useAuthStore();

  useEffect(() => {
    authCheck();
  }, []);

  if(isCheckingAuth) { // ถ้า check อยู่ ให้แสดงหน้านี้แทน
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animate-spin text-red-600 size-10" />
        </div>
      </div>
    ) 
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={ !user ? <LoginPage /> : <Navigate to={"/"} /> } />
        <Route path="/signup" element={ !user ? <SignupPage /> : <Navigate to={"/"} /> } />
        <Route path="/watch/:id" element={ user ? <WatchPage /> : <Navigate to={"/login"} /> } />
        <Route path="/search" element={ user ? <SearchPage /> : <Navigate to={"/login"} /> } />
        <Route path="/history" element={ user ? <SearchHistoryPage /> : <Navigate to={"/login"} /> } />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
}

export default app;