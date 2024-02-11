import { Card, Metric, Text, Button, Divider } from "@tremor/react";
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
    return(
        <Card className='m-auto w-4/5 h-full flex flex-col justify-around gap-4 cursor-pointer hover:border-2' decoration="top" color="indigo">
				<Metric onClick={()=> navigate(`/detail/${item._id}`)}>{item.title}</Metric>
				<Divider/>
                <div className="w-full h-full rounded-md overflow-hidden">
                <ReactPlayer  style={{width:'100%',objectFit: 'cover'}} url={item.url}/>
                </div>
				<Text>{item.description}</Text>
				<div className="flex justify-between "> 
				<Button size="sm" variant="primary" color="red" 
                onClick={()=> SweetAlertForDelete(item._id)}
                > Delete
				</Button>
                </div>
			</Card>
    )
}