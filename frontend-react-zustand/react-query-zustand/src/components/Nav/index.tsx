import { useState } from "react";
import { Link } from "react-router-dom"
import { Avatar, Button , Menu, MenuItem, Fade} from "@mui/material";
import Fingerprint from "@mui/icons-material/Fingerprint";
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { UserStore } from "../../ZustandStore/userStore"

export function Nav(){
  const {userLogged} = UserStore();
  console.log(userLogged)
// debajo logica pra menu desplegable de MUI
const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
const open = Boolean(anchorEl);
const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  setAnchorEl(event.currentTarget);
};
const handleClose = () => {
  setAnchorEl(null);
};

    return(
        <nav className="w-screen flex justify-between text-sm font-medium bg-violet-900">
          <div className=" w-1/6 h-1/2 bg-neutral-300 border border-1 border-cyan-600 rounded-lg ">
      <Button
        size="medium"
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
       { ! open? 
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-10 h-10">
       <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
     </svg> 
     : <MenuOpenIcon/>}
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
           {/* vista a partir de medium view */}
        <ul className=" hidden sm:flex justify-around space-x-3">
         <li  className='block px-3 py-2 rounded-md bg-sky-400 text-white hover:bg-sky-800'> <Link to='/'> Home</Link>
      </li>
         <li  className='block px-3 py-2 rounded-md bg-sky-400 text-white hover:bg-sky-800'>
          <Link to='/form'>Add New Video
          </Link>
          </li>
         <li  className='block px-3 py-2 rounded-md bg-sky-400 text-white hover:bg-sky-800'>
          <Link to='/seAll'> Se all</Link>
        </li>
        </ul>
        <div className="flex justify-end mt-2">
          {userLogged ? <span>{userLogged.name}</span>: <Button type='submit' style={{display:'flex', gap:'8px'}} aria-label="fingerprint" color="secondary">
          Loggin
          <Fingerprint />
          </Button>}
          <Avatar src="/broken-image.jpg" />
        </div>
      </nav>
    )
}