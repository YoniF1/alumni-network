import { ReactNode } from "react";

export interface AuthContextType {
    user: UserInterface | null,
    setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>
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

