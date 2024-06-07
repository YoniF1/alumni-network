import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { Button, Stack, Toolbar, Typography, IconButton, AppBar, Box } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { AuthContext } from '../App'
import { AuthContextType } from '../types/consts'

const Nav = () => {
    const authContext = useContext(AuthContext) as AuthContextType;
    const user = authContext?.user

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Alumni Network
          </Typography>
          <Stack direction='row' spacing={2}>
            {user?.token && user.isadmin ? <Button component={Link} to='/admin' color="inherit">Admin</Button> : null }
            {user?.token ? <Button component={Link} to='/home' color="inherit">Home</Button> : null }
            <Button component={Link} to='/login' color="inherit">Login</Button>
            <Button component={Link} to='/register' color="inherit">Register</Button>
            {user?.token ? <Button component={Link} to='/logout' color="inherit">Logout</Button> : null}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Nav