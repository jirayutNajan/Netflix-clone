// movie and tv

import { create } from "zustand";

export const userContentStore = create((set) => ({
  contentType: "movie",
  setContentType: (type) => set({contentType: type})
}))