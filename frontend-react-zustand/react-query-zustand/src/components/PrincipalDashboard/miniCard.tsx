import { Card, Metric, Text, Button, Divider } from "@tremor/react";
import { Video } from "../../hooks/types";
import { useNavigate } from "react-router-dom";

interface MiniCardProps{
    item: Video,
    
}

export function MiniCard ({item}:MiniCardProps){
    const navigate = useNavigate()
    return(
        <Card className='m-auto w-4/5 h-full flex flex-col justify-around gap-4 cursor-pointer hover:border-2' decoration="top" color="indigo">
				<Metric onClick={()=> navigate(`/detail/${item._id}`)}>{item.title}</Metric>
				<Divider/>
				<Text>{item.description}</Text>
				<div className="flex justify-between "> 
				{/* <Button size="sm" variant="primary" onClick={()=> chekFavourites(item._id)}>
					{isInFavorites? 'Remove of Favorites' : 'Add to favorites'}
				</Button> */}
				<Button size="sm" variant="primary" color="red" 
                // onClick={()=> SweetAlertForDelete(item._id)}
                >
					Delete
				</Button>
                </div>
			</Card>
    )
}