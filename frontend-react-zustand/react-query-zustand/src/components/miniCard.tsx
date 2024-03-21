import {  Metric,  Button, Divider } from "@tremor/react";
import ReactPlayer from "react-player";
import { Video } from "../hooks/types";
import { useNavigate } from "react-router-dom";
import { useSweetAlert } from "../hooks/useSweetAlert";
import { UserStore } from "../ZustandStore/userStore";

interface MiniCardProps{
    item: Video,
}

export function MiniCard ({item}:MiniCardProps){
    const {userLogged} = UserStore()
	const {SweetAlertForDelete} = useSweetAlert()
    const navigate = useNavigate()
        {/* // Palet color-> fuchsia-100 teal-400 teal-500 teal-700 violet-900  */}
    return(
        <article className='m-auto rounded-2xl w-11/12 p-2 h-fit md:w-4/5 md:p-4 md:h-full flex flex-col justify-around gap-4 cursor-pointer bg-teal-700 border-4  hover:border-4 hover:border-teal-400 hover:bg-violet-900 transition-colors shadow-2xl'  >
				<Metric style={{color:'white'}} className="ml-3 -mb-8" onClick={()=> navigate(`/detail/${item._id}`)}>{item.title}</Metric>
				<Divider/>
                <div className="w-full h-full rounded-md overflow-hidden">
                <ReactPlayer  width="100%"
            height="100%"  url={item.url}/>
                </div>
				<p className="m-4 text-rose-50">{item.description}</p>
				<div className="flex justify-between "> 
				<Button size="sm" variant="primary" color="red" className={`border-2 border-rose-900 ${userLogged.email != '' ? 'block': 'hidden'}`}
                onClick={()=> SweetAlertForDelete(item._id!)}
                > Delete
				</Button>
                </div>
			</article>
    )
}