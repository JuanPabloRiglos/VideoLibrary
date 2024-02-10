/* eslint-disable no-mixed-spaces-and-tabs */
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Card, Metric, Text, Button, Badge, Select, SelectItem} from "@tremor/react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import ReactPlayer from "react-player";
import { Video } from "../../hooks/types.ts";
import { deleteVideo } from "../../services.ts";
import { PlaylistStore } from "../../ZustandStore/playlistStore.ts";
import { useApiHook } from "../../hooks/useApi.ts";

type PorpsCard = {
	item: Video,
};

export function CardToRender({ item }: PorpsCard) {
	let isDetail = ''
	if(window.location.pathname.includes('detail')){
		const url = (window.location.pathname).split('/')
		 isDetail = url[1]
	}
	const [playListSelect, setPlayListSelect] = useState<string>('')
	const { editedVideo } = useApiHook()
	
	//useNavigate
	const navigate = useNavigate()
	//Logica para borrado con ReactQuery
	const queryClient = useQueryClient()

//Delete logic reactQuery y despues alert for confirm
	const  deleteVideoMutation = useMutation({mutationFn:deleteVideo, onSuccess : ()=>{
			queryClient.invalidateQueries({queryKey:['videos']})
		}})

	const  SweetAlertForDelete =  (id : string)=>{
		   Swal.fire({
			   title: "Are you sure?",
			   text: "You won't be able to revert this!",
			   icon: "warning",
			   showCancelButton: true,
			   confirmButtonColor: "#3085d6",
			   cancelButtonColor: "#d33",
			   confirmButtonText: "Yes, delete it!"
		   }).then((result) => {
			   if (result.isConfirmed) {
		   Swal.fire({
				   title: "Deleted!",
				   text: "Your file has been deleted.",
				   icon: "success"
			   });
			   deleteVideoMutation.mutate(id)
			   }
		   });
		}
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
		<div key={item._id} className="w-full h-full min-w-80 ">
			<Card className='w-11/12 h-full m-auto flex flex-col justify-around gap-3 cursor-pointer hover:border-2' >
				<Metric onClick={()=> navigate(`/detail/${item._id}`)}>{item.title}</Metric>
				<Text>{item.description}</Text>
				<div className="">

				<ReactPlayer style={{maxWidth:'100%', borderRadius:'50px' }} url={item.url}/>	
				</div>
				<div className="flex justify-between "> 
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
