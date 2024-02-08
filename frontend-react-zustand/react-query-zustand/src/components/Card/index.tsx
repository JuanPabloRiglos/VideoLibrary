/* eslint-disable no-mixed-spaces-and-tabs */
import { Card, Metric, Text, Button } from "@tremor/react";
import Swal from "sweetalert2";
import { FavoritesVideosStore } from "../../ZustandStore/favoritesVideos.ts";
import { Video } from "../../hooks/types.ts";
import { deleteVideo } from "../../services.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";

type PorpsCard = {
	item: Video,
	isInFavorites : boolean
};

export function CardToRender({ item, isInFavorites }: PorpsCard) {

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
	const {addFavoriteRepo, removeFavoriteRepo} = FavoritesVideosStore() 
	const chekFavourites = (id:string)=>{
	isInFavorites? removeFavoriteRepo(id)
	: addFavoriteRepo(id)
 }

	return (
		<div key={item._id} className="w-full h-full min-w-80 m-auto">
			<Card className='w-4/5 h-full flex flex-col justify-around gap-4 cursor-pointer hover:border-2' >
				<Metric onClick={()=> navigate(`/update/${item._id}`)}>{item.title}</Metric>
				<Text>{item.description}</Text>
				<div className="">

				<ReactPlayer style={{maxWidth:'100%', borderRadius:'50px' }} url={item.url}/>	
				</div>
				<div className="flex justify-between "> 
				<Button size="sm" variant="primary" onClick={()=> chekFavourites(item._id)}>
					{isInFavorites? 'Remove of Favorites' : 'Add to favorites'}
				</Button>
				<Button size="sm" variant="primary" color="red" onClick={()=> SweetAlertForDelete(item._id)}>
					Delete
				</Button></div>
			</Card>
		</div>
	);
}
