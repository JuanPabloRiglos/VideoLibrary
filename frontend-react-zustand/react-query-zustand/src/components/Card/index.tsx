import { Card, Metric, Text, Button } from "@tremor/react";
import { FavoritesVideosStore } from "../../ZustandStore/favoritesVideos.ts";
import { Video } from "../../hooks/types.ts";
type PorpsCard = {
	item: Video,
	isInFavorites : boolean
};

export function CardToRender({ item, isInFavorites }: PorpsCard) {
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
				<Button size="sm" variant="primary" onClick={()=> chekFavourites(item._id)}>
					{isInFavorites? 'Remove of Favorites' : 'Add to favorites'}
				</Button>
			</Card>
		</div>
	);
}
