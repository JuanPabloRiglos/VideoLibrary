import { create } from "zustand";
import {persist} from "zustand/middleware"
// import { Video } from "../hooks/types";
type FavoritesVideostate={
    favoritesVideosId : string[],
    addFavoriteRepo : (_id:string)=> void,
    removeFavoriteRepo : (_id:string)=> void
}

export const FavoritesVideosStore = create(persist<FavoritesVideostate>((set) =>({
    favoritesVideosId : [],
    addFavoriteRepo:(_id:string )=>{
    set((state) =>({
        favoritesVideosId : [...state.favoritesVideosId, _id]
    }))}
    ,
    removeFavoriteRepo:(_id:string )=>{ set((state) =>({favoritesVideosId : state.favoritesVideosId.filter(itemId => itemId != _id)}))}


}), {name : 'favorite-videos'}
))