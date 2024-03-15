import { UserStore } from "../../ZustandStore/userStore";
import { useForm, SubmitHandler} from "react-hook-form";
import { Avatar, TextField } from "@mui/material";
import { useEffect } from "react";
import { useUserDataHandler } from "../../hooks/useUserDataHandler";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { user } from "../../hooks/types.users";
import { AccordionPlayList } from "../../components/acordeonPlaylist";
type EditInputs = {
	firstName: string,
	lastName: string,
	img: string
  }

export default function UserPerfilEdit() {
	
	const { userLogged, addUserLogged } = UserStore();
	const {editUserStoreYDb} = useUserDataHandler()
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		formState: { isDirty },
	} = useForm <EditInputs> ({
		defaultValues: {
			firstName: userLogged.firstName,
			lastName: userLogged.lastName,
			img:userLogged.img
		},
	});
	useEffect(()=>{},[userLogged])

	const onSubmitEdit : SubmitHandler <EditInputs >  = async (newData ) => {
		const fintalData : user  = {...userLogged, ...newData}
		editUserStoreYDb(fintalData)// poner neuva fn del hook
		toast.success("Usuario editado");
	};

	return (
		<main className=' h-screen w-full border flex gap-2 bg-rose-50'>
			<section className='h-full w-full flex flex-col '>
				
				<div className="mt-2 w-full h-4/6 flex flex-col justify-strech gap-2 items-center">
				<div className=" mx-auto w-full flex flex-row justify-around gap-4 "> 
					<figure className="w-fit h-fit border-2 border-violet-900 rounded-full shadow-xl">
						<Avatar src={userLogged.img? userLogged.img : '/broken-image.jpg'} sx={{height:136, width:136}}/>
					</figure>
					<div className="  w-6/12 flex flex-col justify-around "> 
					<span className="w-11/12 font-semibold text-base border-2 p-2 m-auto  rounded-xl text-teal-700"> User : <strong className="text-violet-900 ">{userLogged.email}  </strong> - Videos :   <strong className="text-violet-900"> {userLogged.videos?.length} </strong></span>
					<article className="ml-7 w-8/12 flex justify-around"> 
					<span className="font-semibold text-sm text-teal-700"> Followers : <strong className="text-violet-900"> {userLogged.followers?.length}</strong>  </span>
					<span className="font-semibold text-sm text-teal-700">Follows : <strong className="text-violet-900">{userLogged.followed?.length}</strong></span>
					</article>
					<h4 className="ml-6 w-fit pr-1  font-bold text-xl text-teal-700 mt-8 border-b-2 border-violet-900 shadow-lg">{userLogged.firstName}'s Playlists <span className="text-violet-900">:</span></h4>
				</div>
					</div>
				<section className="w-11/12  justify-center">
					<AccordionPlayList/>
				</section>
					</div>
			</section>
			<section className='h-full  w-10/12 flex flex-col'>
				<form className="w-4/6 mx-auto mt-10 flex flex-col gap-4" onSubmit={handleSubmit(onSubmitEdit)}>
				<div className="flex flex-col justify-around">
            <TextField  type='text' label="Your Name"  
             color= "secondary"   {...register("firstName", {
				required: {
					value: true,
					message: "Debes completar el campo",
				},
			})}
			focused
		/>
		{errors.firstName && (
			<span
				className='pl-2 pt-2 flex text-xs font-bold text-rose-900'
				
			>
				{errors.firstName.message}
			</span>
		)}  
            
              </div>
			<div className="flex flex-col justify-around">
            <TextField  type='text' label="Your Last Name"
             color= "secondary" 
             {...register("lastName", {
				required: {
					value: true,
					message: "Debes completar el campo",
				},
			})}
			focused
		/>
		{errors.lastName && (
			<span
				className='pl-2 pt-2 flex text-xs font-bold text-rose-900'
				
			>
				{errors.lastName.message}
			</span>
		)}  
              </div>

			<div className="flex flex-col justify-around">
            <TextField  type='text' label="Save your user image"
			placeholder={userLogged.img == '' ? "Most be Url": ''}
             color= "secondary" 
             {...register("img", {
				required: {
					value: true,
					message: "Debes completar el campo",
				},
			})}
			focused
		/>
		{errors.img && (
			<span
				className='pl-2 pt-2 flex text-xs font-bold text-rose-900'
				
			>
				{errors.img.message}
			</span>
		)}  
              </div>

			<div className="flex flex-col justify-around">
            <TextField  type='password' label="Your password"
             color= "secondary" 
        //        {...register("password", {
		// 		required: {
		// 			value: true,
		// 			message: "Debes completar el campo",
		// 		},
		// 	})}
		// 	focused
		// />
		// {errors.password && (
		// 	<span
		// 		className='pl-2 pt-2 flex text-xs font-bold text-red-700'
		// 		style={{ color: "red" }}
		// 	>
		// 		{errors.password.message}
		// 	</span> )}
		value={userLogged.password}
		focused
		/>
            </div>
			<div className=" w-4/5 gap-2 flex">
			<button type="submit"  className={` block px-3 py-2 rounded-md bg-teal-400 text-white  border-violet-900  hover:bg-violet-900   border-2 font-semibold transition-all items-center mt-1 ${ isDirty ? "bg-teal-400" : "bg-teal-700"
							}`}  
			disabled={!isDirty}> 
			{isDirty ? "Guardar" : "Editar"}
      </button> 
	<button type="reset"  className={` block px-3 py-2 rounded-md bg-rose-400 text-white  border-violet-900  hover:bg-violet-900  hover:border-teal-400 border-2 font-semibold transition-all items-center mt-1  ${ isDirty ? "bg-rose-400" : "bg-rose-700"
							}`}	disabled={!isDirty}
							onClick={() => reset()}> Cancelar
      </button> 
	</div>
				</form>
			</section>
		</main>
	);
}
