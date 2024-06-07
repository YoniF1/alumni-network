import { useEffect, useContext, useState } from "react"
import { AuthContext } from "../../App.tsx"
import axios from 'axios';
import { AuthProviderProps } from "../../types/consts.ts"
import LoginRegister from "../LoginRegister.tsx"

const Auth = ({ children }: AuthProviderProps) => {
  const { token, setToken } = useContext(AuthContext)
  const [redirect, setRedirect] = useState<boolean>(false)

  const refreshToken = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + '/refresh', { withCredentials: true });
      if (response.status === 200) {
        const newToken = response.data.accessToken
        setToken(newToken);
        localStorage.setItem('token', newToken)
        return newToken;
      }
    } catch (error) {
      console.log("Failed to refresh token", error)
      return null;
    }
  };
  

  const verify = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + '/verify', {
        withCredentials: true
      });
      if (response.status === 200) {
        setRedirect(true);
      } else {
        setRedirect(false);
      }
    } catch (error) {
      setRedirect(false);
    }
    if (!redirect && token) {
      const newToken = await refreshToken()
      if (newToken) {
        await verify()
      }
    }
  };
  

  useEffect(() => {
    verify();
  }, [token]);

  return redirect ? children : <LoginRegister page={"Login"} />
};

export default Auth;
