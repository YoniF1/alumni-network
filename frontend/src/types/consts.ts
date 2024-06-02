import { ReactNode } from "react";

export interface AuthContextType {
    user: UserInterface | null,
    setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>
}

export type UserInterface = {
    id: number;
    email: string;
    name: string;
    token: string;
  };
  

export interface AuthProviderProps {
    children: ReactNode;
}



