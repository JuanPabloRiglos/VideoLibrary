import { Video } from "./types";
export interface userLogginState{
    email: string,
    password: string
}

export interface user{
    firstName:string,
    email:string,
    password:string,
    lastName?:string,
    img?:string,
    createdAt?:string,
    updatedAt?:string,
    _id:string,
    playlists?: {
        name: string;
        content: PlaylistContent[];
      }[],
    videos?:Video[],
    followers?:string[],
    followed?:string[],

}

interface PlaylistContent {
    id: string;
  }

export interface erroLogginState  {email:string, password:string, api:string}