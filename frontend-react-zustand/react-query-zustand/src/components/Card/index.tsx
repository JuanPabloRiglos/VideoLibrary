/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Metric, Button, Badge, Select, SelectItem} from "@tremor/react";

import { toast } from "react-toastify";
import ReactPlayer from "react-player";
import { Video } from "../../hooks/types.ts";

import { PlaylistStore } from "../../ZustandStore/playlistStore.ts";
import { UserStore } from "../../ZustandStore/userStore.ts";
import { useApiHook } from "../../hooks/useApi.ts";
import { useUserDataHandler } from "../../hooks/useUserDataHandler.ts";
import { useSweetAlert } from "../../hooks/useSweetAlert.ts";

type PorpsCard = {
	item: Video
	// setChange: (arg:boolean)=> void;
};

export function CardToRender({ item }: PorpsCard) {//setChange
	const {userLogged}= UserStore()
	const {canDeleteVideo, addVideoToUsrPl} = useUserDataHandler()
	const [canDelete, setCanDelete]= useState <boolean>(false)
	const [playListSelect, setPlayListSelect] = useState<string>("")
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
	 const {addVideoToList, removeVideoToList} = PlaylistStore() 
	const {playlists} =PlaylistStore()
	


useEffect(()=>{
	const userCan = canDeleteVideo(item)
	setCanDelete(userCan)
// eslint-disable-next-line react-hooks/exhaustive-deps
},[userLogged, item])

const addtPlayListHandler =  async (listName:string, item : Video) =>{
	
	const videoForEdit : Video = { ...item, topyc:listName}
	addVideoToUsrPl(listName, item._id!)// edita al usuario agregando y borrando de la lista. Tambien Modifica el video poniendole o sacandole el topyc
 	editedVideo.mutate(videoForEdit)//edita al video para que quede en sincronia con el user.video
	 toast.success('Video edited whit succes!')
	 addVideoToList(listName, item._id!)
 }


 const deletePlayListHandler =  async (listName:string, itemToRemove : Video) =>{
	
	 const videoForEdit : Video = { ...itemToRemove, topyc:listName}
	addVideoToUsrPl(listName, itemToRemove._id!)// edita al usuario agregando y borrando de la lista. Tambien Modifica el video poniendole o sacandole el topyc
 	 editedVideo.mutate({...videoForEdit, topyc:''})//edita al video para que quede en sincronia con el user.video
	toast.success('Video edited whit succes!')
	removeVideoToList(listName, itemToRemove._id!)
	// setChange(true)
 }


	return (
		<div key={item._id} className="w-4/5 m-auto md:w-10/12 min-w-80 border-2 border-red-500">
			<article className='m-auto p-4 rounded-2xl w-4/5 hover:w-5/5 h-full flex flex-col justify-around gap-4 cursor-pointer bg-slate-900 hover:border-4 hover:border-teal-400 hover:bg-violet-900 border-rose-900 border-4 shadow-xl ' >
				<Metric style={{color:'white'}} onClick={()=> navigate(`/detail/${item._id}`)}>{item.title}</Metric>
				<p className="text-slate-200 text-sm">{item.description}</p>
				<div className="overflow-hidden rounded-md">

				<ReactPlayer style={{maxWidth:'100%', borderRadius:'50px',width: `${isDetail && '300px'}`, height: `${isDetail && '200px'}`  }} url={item.url}/>	
				</div>
				<div className="flex flex-wrap gap-1 justify-between overflow-hidden">
				{item.topyc ?  <Badge className="truncate text-clip">{`In ${item.topyc} playlist`}</Badge> :
						<div className="">
							<Select value={playListSelect} onValueChange={setPlayListSelect}>
							{ userLogged.playlists.map((list)=>(
								// <option key={i} value={list.name} onClick={()=> addToPlayListHandler(list.name, item)}>
								// 	{list.name}
								// </option>
								<SelectItem value={list.name} onClick={()=> addtPlayListHandler(list.name, item)}>
								{list.name}
							</SelectItem>
								)
							)
						}
						
						</Select>
				
						</div>}
					
					{isDetail && <Button className={`${canDelete ? 'block': 'hidden'}`} size="sm" variant="primary" onClick={() => navigate(`/update/${item._id}`)}>
								Edit Video
							</Button>}
						<div className="flex justify-between">	
							{ item.topyc && <Button className={`${canDelete ? 'block': 'hidden'}`} size="xs" variant="primary" color='red' onClick={() => deletePlayListHandler(item.topyc !, item)}>
								Remove from Playlist
							</Button>}		

				<Button className={`${canDelete ? 'block': 'hidden'}`} size="xs" variant="primary" color="red" onClick={()=> SweetAlertForDelete(item._id!)}>
					Delete
				</Button> </div>
				</div>
			</article>
		</div>
	);
}
