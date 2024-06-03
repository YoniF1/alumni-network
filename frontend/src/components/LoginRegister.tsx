import { useContext, useState, ChangeEvent} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Box, TextField, Button } from '@mui/material'
import { AuthContext } from '../App'
import './LoginRegister.css'

interface LoginRegisterProps {
    page: string
}

const LoginRegister = ({page}: LoginRegisterProps) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [first_name, setFirstName] = useState<string>('')
    const [last_name, setLastName] = useState<string>('')

    const [message, setMessage] = useState<string>('')

    const { setUser } = useContext(AuthContext)

    const navigate = useNavigate()

    const loginregister = async () => {
        if(page === 'Register') {
            try {
                const response = await axios.post('http://localhost:3000/register', {
                    email, password, first_name, last_name
                }, {withCredentials: true})

                if(response.status === 200) {
                    setMessage("");
                    console.log(response.data)
                    navigate('/login')
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                  const errorMessage = error.response?.data?.msg || 'An error occurred';
                  setMessage(errorMessage);
                } else {
                  setMessage('An unexpected error occurred');
                  console.log(error);
                }
            }
        } else {
            // on login
            try {
                const response = await axios.post('http://localhost:3000/login', {
                    email, password
                }, {withCredentials: true})

                if(response.status === 200) {
                    setMessage("")
                    console.log(response.data)
                    setUser(response.data)
                    navigate('/home')
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                  const errorMessage = error.response?.data?.msg || 'An error occurred';
                  setMessage(errorMessage);
                  setUser(null);
                } else {
                  setMessage('An unexpected error occurred');
                  console.log(error);
                  setUser(null);
                }
            }
        }
    }

    return(
        <>  
            <div className='container'>
                <h1>{page}</h1>
                <Box component={'form'} sx={{m:1, display:"flex", flexDirection:'column'}} noValidate autoComplete='off'> 
                    <TextField sx={{m:1}} id="email" type="email" label="Enter your email" onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)} variant="outlined"/>
                    <TextField sx={{m:1}} id="password" type="password" label="Enter your password" onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)} variant="outlined"/>
                    { page === 'Register' ? (
                    <>
                        <TextField sx={{m:1}} id="first_name" type="text" label="Enter your first name" onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.currentTarget.value)} variant="outlined"/>
                        <TextField sx={{m:1}} id="last_name" type="text" label="Enter your last name" onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.currentTarget.value)} variant="outlined"/> 
                    </>
                    ): null}
                </Box>
                <Button variant='contained' onClick={loginregister}>
                    {page}
                </Button>

                <div>{message}</div>
            </div>
        </>
    )
}

export default LoginRegister