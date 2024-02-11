export interface Video {
    _id:string
    title: string,
    description:string, 
    url:string,
    topyc:string
}

export interface VideoToSave {
    _id?:string
    title: string,
    description:string, 
    url:string,
    topyc?:string
}

export interface Playlist{ 
    name: string;
    content: {
        id: string;
    }[];
}