import { useState } from "react";
import { Link } from "react-router-dom"
import { Avatar, Button , Menu, MenuItem, Fade} from "@mui/material";
import Fingerprint from "@mui/icons-material/Fingerprint";
import { UserStore } from "../../ZustandStore/userStore"
import { ModalToUserHandler } from "../userForms/loggInForm";


export function Nav(){
  const [logginModal, setLogginModal] = useState<boolean>(false) 
  const {userLogged} = UserStore();
  const {removeUserLogged} = UserStore();
// debajo logica pra menu desplegable de MUI
const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
const open = Boolean(anchorEl);
const handleClick = (event: React.MouseEvent<HTMLElement>) => { setAnchorEl(event.currentTarget);};
const handleClose = () => {setAnchorEl(null);};
// Palet color-> fuchsia-100 teal-400 teal-500 teal-700 violet-900 

    return(
      <> 
        <nav className=" w-full sm:h-20 mx-auto p-1 pr-3 flex justify-between text-sm font-medium bg-tremor-background  border-b-2 border-pink-700">
          <div className=" sm:hidden my-2 ml-2 h-12 w-11 flex justify-center border-2 border-slate-950 rounded-md bg-indigo-400 ">
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
       { ! open? 
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" className="w-7 h-7">
       <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
     </svg> 
     : 
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25" />
</svg>
     }
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
        <MenuItem onClick={handleClose}>
        <Link to='/' className=" hover:text-teal-700 hover:font-semibold "> Home</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
        <Link to='/form' className=" hover:text-teal-700 hover:font-semibold " >Add New Video
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
        <Link to='/seAll' className=" hover:text-teal-700 hover:font-semibold " > Se all</Link>
        </MenuItem>
      </Menu>
    </div>
    {/* // Palet color-> fuchsia-100 teal-400 teal-500 teal-700 violet-900  */}
        <ul className="hidden sm:flex  justify-around space-x-3 h-12 my-auto">
         <li  className=' block px-3 py-2 rounded-md bg-teal-400 text-white  border-violet-900  hover:bg-violet-900  hover:border-teal-400 border-2 font-semibold transition-all items-center mt-1'> <Link to='/'> Home</Link>
      </li>
         <li  className=' block px-3 py-2 rounded-md bg-teal-400 text-white border-violet-900 hover:bg-violet-900  hover:border-teal-400 border-2 font-semibold transition-all items-center mt-1'>
          <Link to='/form'>Add New Video
          </Link>
          </li>
         <li  className='block px-3 py-2 rounded-md bg-teal-400 text-white  border-violet-900  hover:bg-violet-900  hover:border-teal-400 border-2 font-semibold transition-all items-center mt-1'>
          <Link to='/seAll'> Se all</Link>
        </li>
        </ul>
        {/* // Palet color->  fuchsia-100 teal-400 teal-500 teal-700 violet-900 */}
          {userLogged.email != '' ?
            <div className="max-w-3/5 flex gap-1 p-1 mr-1 flex-col h-3/5 border-1 border-tremor-background rounded-md " onClick={()=> setLogginModal(!logginModal)}>
              
             <div className="flex gap-1 h-10 border-2 rounded-2xl border-slate-950 overflow-hidden bg-indigo-400">
            <span className="m-auto pl-2 font-semibold text-lg text-slate-100">{userLogged.name}</span>
           {userLogged.img ?<img src={userLogged.img} alt={userLogged.name} className="mt-2 ml-2 h-full w-1/5 rounded-full"/>  : 
           <Avatar sx={{marginTop:'-1.5%', marginRight:'-1.5%'}} src="/broken-image.jpg" />}
             </div>
           
            {( logginModal && userLogged.name ) ? 
             <Button style={{display:'flex', backgroundColor:'white', height:'40%', margin:'2%', marginTop:'3.5%', border:'1px solid violet'}} aria-label="fingerprint" color="secondary" onClick={removeUserLogged}>
              LoggOut
             </Button>:
             <span className=" font-semibold text-xs text-slate-950 ">{userLogged.email}</span>
            }
           </div>
           
            : 
          <Button style={{display:'flex', gap:'8px', backgroundColor:'white', height:'50%', margin:'2%', marginTop:'3.5%'}} aria-label="fingerprint" color="secondary" onClick={()=>setLogginModal(true)}>
          LoggIn
          <Fingerprint />
          </Button>
          }
      </nav>   
      {logginModal && <ModalToUserHandler/>}
      </>
      )
}