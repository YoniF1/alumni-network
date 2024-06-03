
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../App.tsx"
import axios from 'axios'
import LoginRegister from "../LoginRegister.tsx"
import { AuthProviderProps } from "../../types/consts.ts";

const Auth = ({children}: AuthProviderProps) => {
    const { user } = useContext(AuthContext)

    const [redirect, setRedirect] = useState<boolean>(false)

    useEffect(() => {
        verify()
    }, [])

    const verify = async () => {
        try {
            if(user) {
                const response = await axios.get('http://localhost:3000/verify', {withCredentials: true})
                if (response.status === 200) setRedirect(true)
            } else {
                setRedirect(false)
            }
        } catch {
            setRedirect(false)
        }
    }

    return redirect ? children : <LoginRegister page={"Login"}/>
};

export default Auth