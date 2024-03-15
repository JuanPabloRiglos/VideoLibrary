import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { Avatar, Button , Menu, MenuItem, Fade} from "@mui/material";
import Fingerprint from "@mui/icons-material/Fingerprint";
import { UserStore } from "../../ZustandStore/userStore"
import { ModalToUserHandler } from "../userForms/loggInForm";
import loggoutIcon from "../../assets/SVGs/logoutforRigth.svg"

export function Nav(){
  const navigate = useNavigate()
  const [logginModal, setLogginModal] = useState<boolean>(false) 
  const {userLogged} = UserStore();
  const {removeUserLogged} = UserStore();
// debajo logica pra menu desplegable de MUI
const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
const open = Boolean(anchorEl);
const handleClick = (event: React.MouseEvent<HTMLElement>) => { setAnchorEl(event.currentTarget);};
const handleClose = () => {setAnchorEl(null);};
// Palet color-> fuchsia-100 teal-400 teal-500 teal-700 violet-900 
 const loggOutSet =()=>{
  removeUserLogged();
  setLogginModal(false)
 }
 useEffect(()=>{  },[userLogged])
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
        <MenuItem onClick={handleClose}>
        <button  className=" hover:text-teal-700 hover:font-semibold "  onClick={loggOutSet}> Loggout</button>
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
          //reenderiza si hay alguien logeado
            <div className="xs:4/5 md:2/5 xl:w-1/5 rounded-md flex justify-between gap-2 items-center ">
              
             <div className={`flex pl-1 h-14 border-2 rounded-2xl border-teal-400  bg-violet-900  ${logginModal == true ? 'hidden': 'block'} hover:cursor-pointer` } onClick={()=> navigate('/userPerfil')} >
            <span className="m-auto pl-2 font-semibold text-lg text-slate-100">{userLogged.firstName} {userLogged.lastName}</span>
           {userLogged.img ?<Avatar src={userLogged.img} alt={userLogged.firstName} className="mt-2 ml-2 h-full w-1/5 rounded-full"  sx={{marginTop:'-3%', marginRight:'-5%',  width: 62, height: 62}}/>  : 
           <Avatar sx={{marginTop:'-3%', marginRight:'-5%',  width: 62, height: 62}} src="/broken-image.jpg" />}
             </div>
            <div className="hidden sm:block">
              <img src={loggoutIcon}  className="h-8 w-8 hover:cursor-pointer hover:h-10 hover:w-10" onClick={loggOutSet}/>
            </div>
           </div>

            : 
            //boton de abajo se reenderiza si no hay nadie logeado
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