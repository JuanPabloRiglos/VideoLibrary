
export function Nav(){
    return(
        <nav className="py-4 px-6 text-sm font-medium">
        <ul className="flex space-x-3">
         <li  className='block px-3 py-2 rounded-md bg-sky-400 text-white hover:bg-sky-800'> 
        Home</li>
         <li  className='block px-3 py-2 rounded-md bg-sky-400 text-white hover:bg-sky-800'>Add New Video</li>
         <li  className='block px-3 py-2 rounded-md bg-sky-400 text-white hover:bg-sky-800'>Se all</li>
        </ul>
      </nav>
    )
}