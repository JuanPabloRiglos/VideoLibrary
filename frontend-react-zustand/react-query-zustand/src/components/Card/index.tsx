/* eslint-disable no-mixed-spaces-and-tabs */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Metric, Text, Button, Badge, Select, SelectItem} from "@tremor/react";

import { toast } from "react-toastify";
import ReactPlayer from "react-player";
import { Video } from "../../hooks/types.ts";

import { PlaylistStore } from "../../ZustandStore/playlistStore.ts";
import { useApiHook } from "../../hooks/useApi.ts";
import { useSweetAlert } from "../../hooks/useSweetAlert.ts";

type PorpsCard = {
	item: Video,
};

export function CardToRender({ item }: PorpsCard) {
	const [playListSelect, setPlayListSelect] = useState<string>('')
	const { editedVideo } = useApiHook()
	const {SweetAlertForDelete} = useSweetAlert()
	let isDetail = ''
	if(window.location.pathname.includes('detail')){
		const url = (window.location.pathname).split('/')
		 isDetail = url[1]
	}
	//useNavigate
	const navigate = useNavigate()
	
//trabajo de zustand
	const {addVideoToList} = PlaylistStore() 
	const {playlists} =PlaylistStore()


const addToPlayListHandler = (listName:string, item : Video) =>{
	 const videoForEdit : Video = { ...item, topyc:listName}
	editedVideo.mutate(videoForEdit)
    toast.success('Video edited whit succes!')
	addVideoToList(listName, item._id)
}

	return (
		<div key={item._id} className="w-4/5 m-auto md:w-full h-full min-w-80 ">
			<Card className='w-11/12 h-full m-auto flex flex-col justify-around gap-3 cursor-pointer hover:border-2' >
				<Metric onClick={()=> navigate(`/detail/${item._id}`)}>{item.title}</Metric>
				<Text>{item.description}</Text>
				<div className="overflow-hidden rounded-md">

				<ReactPlayer style={{maxWidth:'100%', borderRadius:'50px',width: `${isDetail && '300px'}`, height: `${isDetail && '200px'}`  }} url={item.url}/>	
				</div>
				<div className="flex flex-wrap gap-1 justify-between "> 
				{item.topyc ?  <Badge>{`In ${item.topyc} playlist`}</Badge> :
						<div className=" w-3/5 space-y-6">
							<Select className="w-full" value={playListSelect} onValueChange={setPlayListSelect}>
							{ playlists.map(list=>
								<SelectItem value={list.name} onClick={()=> addToPlayListHandler(list.name, item)}>
									{list.name}
								</SelectItem>
							)
						}
						</Select>
						</div>}
					{isDetail && <Button size="sm" variant="primary" onClick={() => navigate(`/update/${item._id}`)}>
								Edit Video
							</Button>}
							
				<Button size="sm" variant="primary" color="red" onClick={()=> SweetAlertForDelete(item._id)}>
					Delete
				</Button>
				</div>
			</Card>
		</div>
	);
}
