import { create } from "zustand";
import { persist } from "zustand/middleware";

interface userEmail {
  email: string;
  setEmailForVerification: (email: string) => void;
  resetEmailForVerification: () => void;
}

export const useEmailVerificationStore = create<userEmail>()(
  persist(
    (set) => ({
      email: "",
      setEmailForVerification: (email: string) => set({ email: email }),
      resetEmailForVerification: () =>
        set({
          email: "",
        }),
    }),
    {
      name: "email-verification-store",
    }
  )
);
