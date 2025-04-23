import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Company_User{
  id: string;
  company_id: string;
  user_id: string;
  createdAt: string;
  updatedAt: string
}

interface User {
  id: string;
  bio?: string;
  city?: string;
  country?: string;
  email: string;
  github?: string;
  isEmailVerified: boolean;
  job_id?: string;
  linkedin?: string;
  name: string;
  phone?: string;
  profile_img_url?: string;
  role: string;
  skills?: string[];
  surname: string;
  Company_User: Company_User[]
}

const initialState: User = {
  id: "",
  bio: "",
  city: "",
  country: "",  // Fixed typo from 'countr'
  email: "",
  github: "",
  isEmailVerified: false,
  job_id: "",
  linkedin: "",
  name: "",
  phone: "",
  profile_img_url: "",
  role: "",
  skills: [],
  surname: "",
  Company_User: []
};

interface UserStore {
  user: User;
  setUserData: (userData: Partial<User>) => void;
  resetUserData: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: initialState,
      setUserData: (userData) =>
        set((state) => ({
          user: { ...state.user, ...userData },
        })),
      resetUserData: () =>
        set({
          user: initialState,
        }),
    }),
    {
      name: "user-store",
    }
  )
);
