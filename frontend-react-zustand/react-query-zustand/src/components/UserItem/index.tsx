import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { user } from "../../hooks/types.users";


interface UserItemProps {
	user: user;
}

export function UserItem({user} :UserItemProps)  {
	const navigate = useNavigate()
	return (
		<article className="w-full h-fit m-auto max-w-96 pl-1 pr-1 py-1	 flex justify-around items-center border-2 border-violet-900 rounded-3xl shadow-lg my-2 overflow-hidden hover:cursor-pointer">
			<figure className=" flex">
				<Avatar className=" shadow-2xl" src={user.img? user.img : '/broken-image.jpg'} sx={{ width: 67, height: 67}}/>
			</figure>
			<div className=" w-fit px-1 truncate flex-col flex ml-2 items-start justify-around"> 
			<h3 className="truncate font-semibold text-normal">{user.email}</h3>
			<div className="m-auto w-3/4 pl-2 flex justify-around gap-1 text-sm">
				<span> Playlist : {user.playlists.length} -</span>
				<span> Videos : {user.videos?.length}</span>
			</div>
			</div>
			<span className=" min-w-fit px-2 hfit rounded-2xl bg-rose-700 border-2 border-rose-900 text-rose-400 mr-1 hover:cursor-pointer" onClick={()=>navigate(`/user/${user._id}`)} >  See more  </span>
		</article>
	)
}
