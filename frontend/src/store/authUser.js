import axios from "axios";
import { create } from "zustand";
import { toast } from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  signup: async (credentails) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post("/api/v1/auth/signup", credentails);
      set({ user: response.data.user, isSigningUp: false }); // reponse => { success: true, user: ... } look at auth.co   ntroller.js
      toast.success("Account created successfully");
    } catch (error) { // error is if the response not 200 or 201 (400 || 500) 
      toast.error(error.response.data.message || "An error occurred");
      set({ user: null, isSigningUp: false });
    }
  },
  login: async () => {},
  logout: async () => {},
  authCheck: async () => {},
})); // () mean return (object inside)
