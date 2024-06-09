import { ReactNode } from "react";

export interface AuthContextType {
    user: UserInterface | null,
    setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>; 
}

export type UserInterface = {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    token: string;
    isadmin: boolean;
  };
  
export interface AuthProviderProps {
    children: ReactNode;
}

export interface HomeProps {
    children: ReactNode;
}

export interface UserDetails {
  cohort: string | null
  biography: string
  profilePictureUrl: string | null
  step: number
  isverified: boolean | null
  cohort_id: number | null
}

export interface CohortUserDetails {
    cohort_name: string | null,
    id: number | null,
    first_name: string | null,
    last_name: string | null,
    email: string | null,
}

export interface PostAndUserDetails {
    id: number | null;
    content: string | null
    title: string | null
    user_id: number
    cohort: number
    created_at: Date
    first_name: string
    last_name: string
  }
