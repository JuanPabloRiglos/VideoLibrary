import { Link } from "react-router-dom"
export function Nav(){
    return(
        <nav className=" w-full py-4 px-6 text-sm font-medium bg-violet-300">
        <ul className="flex justify-around space-x-3">
         <li  className='block px-3 py-2 rounded-md bg-sky-400 text-white hover:bg-sky-800'> <Link to='/'> Home</Link>
      </li>
         <li  className='block px-3 py-2 rounded-md bg-sky-400 text-white hover:bg-sky-800'>
          <Link to='/form'>Add New Video
          </Link>
          </li>
         <li  className='block px-3 py-2 rounded-md bg-sky-400 text-white hover:bg-sky-800'>
          <Link to='/'>  Se all</Link>
        </li>
        </ul>
      </nav>
    )
}