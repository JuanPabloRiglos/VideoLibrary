import { SearchIcon } from "@heroicons/react/solid";
import { Card, TextInput } from "@tremor/react";
import { ChangeEvent, useCallback, useState } from "react";
import debounce from 'just-debounce-it'
import { useNavigate } from "react-router-dom";

export function SercherComponent () {
  const navigate= useNavigate()
  const [searchBy, setSearchBy] = useState<string>('')

  console.log(searchBy)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearchVideos = useCallback(debounce((searchBy: string)=>{
    navigate(`/search/${searchBy}`)
    setSearchBy('')
  }, 800),
  [])

   return (
  <Card className="w-10/12 h-4/5 p-auto  row-start-1 row-end-2 mx-auto " decoration="top" decorationColor="indigo">
    <TextInput  placeholder="Search..." icon={SearchIcon} value={searchBy} onChange={(e: ChangeEvent<HTMLInputElement>)=>setSearchBy(e.target.value)} onKeyDown={()=>debounceSearchVideos(searchBy)}/>
  </Card>

)}