import axios from "axios";
import { create } from "zustand";
import { toast } from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true, // is true first cuz when refresh a page need to checking auth
  isLoggingOut: false,
  isLoggingIn: false,
  signup: async (credentails) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post("/api/v1/auth/signup", credentails);
      set({ user: response.data.user, isSigningUp: false }); // reponse => { success: true, user: ... } look at auth.co   ntroller.js
      toast.success("Account created successfully");
    } catch (error) { // error is if the response not 200 or 201 (400 || 500) 
      toast.error(error.response.data.message || "Logout Failed");
      set({ user: null, isSigningUp: false });
    }
  },
  login: async (credentails) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post("/api/v1/auth/login", credentails);
      set({ user: response.data.user, isLoggingIn: false });
      toast.success("LoggedIn successfully");
    } catch (error) {
      toast.error(error.response.data.message || "Login Failed");
      set({ user: null, isLoggingIn: false });
    }
  },
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post("/api/v1/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully");
    } catch (error) {
      set({ isLoggingOut: false });
      toast.error(error.response.data.message || "Logout failed");
    }
  },
  authCheck: async () => {
		set({ isCheckingAuth: true });
		try {
			const response = await axios.get("/api/v1/auth/authCheck");

			set({ user: response.data.user, isCheckingAuth: false });
		} catch (error) {
			set({ isCheckingAuth: false, user: null });
			// toast.error(error.response.data.message || "An error occurred");
		}
	},
})); // () mean return (object inside)
