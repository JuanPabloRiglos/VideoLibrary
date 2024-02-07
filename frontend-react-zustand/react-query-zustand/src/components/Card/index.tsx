import { Card, Metric, Text, Button } from "@tremor/react";
import { FavoritesVideosStore } from "../../ZustandStore/favoritesVideos.ts";
import { Video } from "../../hooks/types.ts";
import { deleteVideo } from "../../services.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type PorpsCard = {
	item: Video,
	isInFavorites : boolean
};

export function CardToRender({ item, isInFavorites }: PorpsCard) {

	//Logica para borrado con ReactQuery
	const queryClient = useQueryClient()

	const  deleteVideoMutation = useMutation({mutationFn:deleteVideo, onSuccess : ()=>{
			queryClient.invalidateQueries({queryKey:['videos']})
		}})

	const {addFavoriteRepo, removeFavoriteRepo} = FavoritesVideosStore() 
	const chekFavourites = (id:string)=>{
	isInFavorites? removeFavoriteRepo(id)
	: addFavoriteRepo(id)
 }

	return (
		<div key={item._id}>
			<Card className='flex flex-col gap-4'>
				<Metric>{item.title}</Metric>
				<Text>{item.description}</Text>
				<div> 
				<Button size="sm" variant="primary" onClick={()=> chekFavourites(item._id)}>
					{isInFavorites? 'Remove of Favorites' : 'Add to favorites'}
				</Button>
				<Button size="sm" variant="primary" color="red" onClick={()=> deleteVideoMutation.mutate(item._id)}>
					Delete
				</Button></div>
			</Card>
		</div>
	);
}
