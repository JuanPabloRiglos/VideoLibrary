import {  Metric,  Button, Divider } from "@tremor/react";
import ReactPlayer from "react-player";
import { Video } from "../../hooks/types";
import { useNavigate } from "react-router-dom";
import { useSweetAlert } from "../../hooks/useSweetAlert";

interface MiniCardProps{
    item: Video,
}

export function MiniCard ({item}:MiniCardProps){
	const {SweetAlertForDelete} = useSweetAlert()
    const navigate = useNavigate()
        {/* // Palet color-> fuchsia-100 teal-400 teal-500 teal-700 violet-900  */}
    return(
        <article className='m-auto p-4 rounded-2xl w-4/5 h-full flex flex-col justify-around gap-4 cursor-pointer bg-slate-900 hover:border-4 hover:border-teal-400 hover:bg-violet-900 transition-colors'  >
				<Metric style={{color:'white'}} onClick={()=> navigate(`/detail/${item._id}`)}>{item.title}</Metric>
				<Divider/>
                <div className="w-full h-full rounded-md overflow-hidden">
                <ReactPlayer  width="100%"
            height="100%"  url={item.url}/>
                </div>
				<p className="m-4 text-rose-50">{item.description}</p>
				<div className="flex justify-between "> 
				<Button size="sm" variant="primary" color="red" className="border-2 border-rose-900"
                onClick={()=> SweetAlertForDelete(item._id)}
                > Delete
				</Button>
                </div>
			</article>
    )
}