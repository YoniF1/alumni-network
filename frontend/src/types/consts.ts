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

export interface CohortUserDetails {
    cohort_name: string | null,
    id: number | null,
    first_name: string | null,
    last_name: string | null,
    email: string | null,
}


