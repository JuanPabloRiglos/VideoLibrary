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
import { user } from "../../hooks/types.users.ts";
import { Avatar } from "@mui/material";

type PorpsCard = {
	item: Video
	// setChange: (arg:boolean)=> void;
};

export function CardToRender({ item }: PorpsCard) {//setChange
	const {userLogged, allUser}= UserStore()
	const [userOwner, setUserOwner] = useState <user | null>(null)
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
 const owner = allUser.filter(user => user._id == item.owners[0])
 setUserOwner(...owner)

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
console.log('dueno del video', userOwner)

	return (
		<div key={item._id} className="w-full m-auto md:w-10/12 min-w-96 " style={{ height:'600px'}}>
			<article className='m-auto w-full p-4 rounded-2xl md:w-4/5 hover:w-5/5 h-full flex flex-col justify-around gap-4 cursor-pointer bg-slate-900 hover:border-4 hover:border-teal-400 hover:bg-violet-900 border-rose-900 border-4 shadow-xl ' >
				<div className="w-full flex justify-between items-center">
				<Metric style={{color:'white'}} onClick={()=> navigate(`/detail/${item._id}`)}>{item.title}</Metric>
				<figure onClick={()=> navigate(`/user/${userOwner?._id}`)}>
					<Avatar src={userOwner?.img ? userOwner.img : '/broken-image.jpg'} sx={{height:86, width:86}}/>
				</figure>
				</div>
				<p className="text-slate-200 text-sm truncate">{item.description}</p>
				<div className="overflow-hidden rounded-md">

				<ReactPlayer style={{maxWidth:'100%', borderRadius:'50px'}} url={item.url}/>	
				</div>
				<div className="flex flex-col md:flex-row flex-wrap gap-1 justify-between overflow-scroll">
				{item.topyc ?  <Badge className="truncate text-clip">{`In ${item.topyc} playlist`}</Badge> :
				(<div className="h-fit mt-2">
					{userLogged.email != ''?
							<Select className={`w-full ${canDelete ? 'block': 'hidden'}`} value={playListSelect} onValueChange={setPlayListSelect}>
                
							{ userLogged.playlists.map((list, i)=>
							
								 <SelectItem className=' z-50 overflow-scroll' value={list.name} key={i }onClick={()=> addtPlayListHandler(list.name, item)}>
									{list.name}
								</SelectItem>
							)
						}
						</Select>:
            <span className="p-1 border-2 border-violet-900 bg-rose-700 text-white rounded-xl">Login for more Actions</span>}
				</div>)
						// <Badge className="">
						// 	<select className=" border-violet-900  bg-transparent font-normal py-1 px-1 ml-2 rounded-xl " value={playListSelect} onValueChange={setPlayListSelect}>
						// 	{ userLogged.playlists.map((list)=>(
						// 		// <option key={i} value={list.name} onClick={()=> addToPlayListHandler(list.name, item)}>
						// 		// 	{list.name}
						// 		// </option>
						// 		<option className="h-fit rounded-xl bg-transparent my-2 text-violet-900 font-medium" value={list.name} onClick={()=> addtPlayListHandler(list.name, item)}>
						// 		{list.name}
						// 	</option>
						// 		)
						// 	)
						// }
						
						// </select>
				
						// </Badge>
						}
						<div className={`mt-2 w-full flex justify-between ${isDetail ?? 'border-4'}`}>	
							{ item.topyc && <Button className={`${canDelete ? 'block': 'hidden'}`} size="xs" variant="primary" color='red' onClick={() => deletePlayListHandler(item.topyc !, item)}>
								Remove from Playlist
							</Button>}		
				<Button className={`${canDelete ? 'block': 'hidden'}`} size="md" variant="primary" color="red" onClick={()=> SweetAlertForDelete(item._id!)}>
					Delete
				</Button> </div>
				</div>
			</article>
		</div>
	);
}
