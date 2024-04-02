import { useParams } from "react-router-dom"
import { UserStore } from "../../ZustandStore/userStore"
import { PlaylistStore } from "../../ZustandStore/playlistStore"
import { useEffect, useState } from "react"
import { useUserDataHandler } from "../../hooks/useUserDataHandler"
import { user } from "../../hooks/types.users"
import { Avatar } from "@mui/material"
import { Video } from "../../hooks/types"

import { MiniCard } from "../../components/miniCard"

export default function RestUserProfile(){
    const [selectUser, setSelectUser]= useState <user| null> (null)
    const [userSelectVideos, setUserSelectVideos]= useState <Video[] | null> (null)
    const [isFollow, setIsFollow] = useState <boolean | null> (null)
    const params = useParams()
    const {allUser, userLogged} = UserStore()
    const {allVideosDb} = PlaylistStore()
    const {flollowHandler} = useUserDataHandler() // usar

    useEffect(()=>{
        const select = allUser.filter(user => user._id == params.id);
     console.log('usuario encontrado', select)
     setSelectUser(...select);
     const userVideos = allVideosDb.filter(video => video.owners?.includes(params.id))
     setUserSelectVideos(userVideos)

     const IFollow = userLogged.followed?.find(item => item == params.id)
     console.log( 'i follow?', IFollow)
      IFollow ? setIsFollow(true) : setIsFollow(false)
     
 console.log('isFollow', isFollow)
  
    }, [params, userLogged, isFollow])

 
    const BtnFollowHandler =()=>{
        console.log('foolowHanlder accionada')
        console.log('usuario a seguir', selectUser)
        console.log('usuario seguidor, ', userLogged)
        flollowHandler(selectUser)
    }

    return(
        <main className="bg-rose-50">
            <div className="mt-2 w-full h-4/6 flex flex-col justify-strech gap-2 items-center">
				<div className=" mx-auto w-full flex flex-col items-center gap-2 md:flex-row md:justify-center lg:justify-start lg:ml-4 md:gap-4 "> 
				<div className="flex -ml-16 md:-ml-0 items-center justify-center"> 
					<figure className="w-fit h-fit border-2 border-violet-900 rounded-full shadow-xl">
						<Avatar src={selectUser?.img? selectUser.img : '/broken-image.jpg'} sx={{height:136, width:136}}/>
						
					</figure>
					{/* articulo solo visto hasta md */}
					<article className=" w-8/12 flex flex-col md:hidden ml-6 -mt-6 "> 
					<span className="font-semibold text-sm text-teal-700"> Followers : <strong className="text-violet-900"> {selectUser?.followers?.length}</strong>  </span>
					<span className="font-semibold text-sm text-teal-700">Follows : <strong className="text-violet-900">{selectUser?.followed?.length}</strong></span> 
                    <span className={`${userLogged.email !=''? 'block' : 'hidden'} m-auto self-start px-4 p-y1 mt-1 border rounded-full bg-rose-900 text-rose-500 border-rose-500 text-xs`}> Seguir </span>
					</article></div>
					<div className=" w-11/12 md:w-fit flex flex-col justify-around "> 
					<span className="w-11/12 font-semibold text-base border-2 p-2 m-auto  rounded-xl text-teal-700"> User : <strong className="text-violet-900 ">{selectUser?.email}  </strong> - Videos :   <strong className="text-violet-900"> {selectUser?.videos?.length} </strong></span>
					<article className="ml-7 w-9/12 hidden md:flex justify-around gap-2 h-fit items-center"> 
					<span className="font-semibold text-sm text-teal-700"> Followers : <strong className="text-violet-900"> {selectUser?.followers?.length}</strong>  </span>
					<span className="font-semibold text-sm text-teal-700">Follows : <strong className="text-violet-900">{selectUser?.followed?.length}</strong></span>
                    <span className={`${userLogged.email !=''? 'block' : 'hidden'}  m-auto self-start px-4 py-1 mt-1 border rounded-full bg-rose-900 text-rose-500 border-rose-500 text-xs shadow-lg hover:cursor-pointer hover:bg-rose-500 hover:text-rose-900 hover:border-rose-900 `} onClick={BtnFollowHandler}> Seguir </span>
					</article>
			
				</div>
					</div>
                    </div>

                    <section className=" flex flex-col gap-4 w-full md:w-10/12 m-auto overflow-scroll items-center">
                        {
                            ! isFollow ? <h4 className="ml-6 w-fit pr-1  font-bold text-2xl text-teal-700 mt-4    border-b-2 border-violet-900 shadow-lg self-start"> {`Debes seguir a ${userLogged.firstName} para ver su contenido `}</h4>
                            
                        : 
                    <><h4 className="ml-6 w-fit pr-1  font-bold text-2xl text-teal-700 mt-4    border-b-2 border-violet-900 shadow-lg self-start">
                            {userSelectVideos?.length > 0 ?
                                <span className="text-violet-900"> {` ${selectUser?.firstName}'s Videos`}</span> :
                                <span>{` ${selectUser?.firstName} hasn't saved any videos yet. `}</span>}</h4><div className="w-full flex flex-col md:flex-row flex-wrap gap-4 border-2 roundex-2xl justify-center p-2">
                                {userSelectVideos &&
                                    userSelectVideos.map(video => {
                                        return (
                                            <div className="w-full md:w-5/12" key={video._id}>
                                                <MiniCard item={video} />
                                            </div>)
                                    })}
                            </div></>
}
                    </section>
        </main>
    )
}