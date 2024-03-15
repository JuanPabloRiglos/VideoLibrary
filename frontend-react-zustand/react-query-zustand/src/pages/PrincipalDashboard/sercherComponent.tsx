// import { SearchIcon } from "@heroicons/react/solid";
// import { Card, TextInput } from "@tremor/react";
import { ChangeEvent, useCallback, useState } from "react";
import debounce from 'just-debounce-it'
import { useNavigate } from "react-router-dom";
import { InputBase, styled } from "@mui/material";


const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
 padding: theme.spacing(1, 1, 1, 0),
 // vertical padding + font size from searchIcon
 paddingLeft: `calc(1em + ${theme.spacing(4)})`,
 transition: theme.transitions.create('width'),
	width: '100%',
	[theme.breakpoints.up('md')]: {
		width: '20ch',
	},
	},
  }));


export function SercherComponent () {
  const navigate= useNavigate()
  const [searchBy, setSearchBy] = useState<string>('')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearchVideos = useCallback(debounce((searchBy: string)=>{
    navigate(`/search/${searchBy}`)
    setSearchBy('')
  }, 800),
  [])
// Palet color-> fuchsia-100 teal-400 teal-500 teal-700 violet-900 
   return (
  <div className="w-10/12 h-fit mt-2  p-4 mx-auto border-2 bg-fuchsia-50 rounded-xl "  >
    <div className="flex justify-start py-2 rounded-lg">
    <StyledInputBase  placeholder="🔎 Search..." value={searchBy} className=" mx-1 bg-fuchsia-100 w-full  rounded-md border-4 border-rose-900 "  onChange={(e: ChangeEvent<HTMLInputElement>)=>setSearchBy(e.target.value)} onKeyDown={()=>debounceSearchVideos(searchBy)}/>
  </div>  
    </div>

)}