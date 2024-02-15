import { useState } from "react";
import {useForm, SubmitHandler, useWatch } from 'react-hook-form'
import { UserStore } from "../../ZustandStore/userStore";
import { Avatar, Box, Modal, TextField } from "@mui/material";
import {Button} from '@tremor/react';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };// no boorrar, son estilos

  type Inputs = {
    userName: string,
    email: string,
    password: string,
    repeatPassword:string,
    img:string
  }// tipado para react-hook-form
  
   export function RegisterForm() {
    const {setNewUser} = UserStore()
    const [open, setOpen] = useState(false);
    const toggleOpen = (trueOrFalse:boolean) => setOpen(trueOrFalse);// maneja el open o close del modal

const {register, handleSubmit, formState:{errors}, control} = useForm<Inputs>()

const principalPassword = useWatch({
  control, 
  name: 'password'
})  

const localHandleSubmit : SubmitHandler<Inputs> =(newUser) =>{ 
  console.log(newUser)
//logica para que pegue a la api
  setNewUser(newUser.email, newUser.password)
 toggleOpen(false)}
    return (
      <>
        <Button className="border-2 border-cyan-600 bg-violet-900
         hover:border-violet-900 hover:bg-cyan-600" onClick={()=>toggleOpen(true)}>Go to Register Form</Button>  
         {/* se renderiza en loggInForm */}
        <Modal
          open={open}
          onClose={()=>toggleOpen(false)}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width:{ xs:300, sm:500 , md:600, lg:800}, height:{xs:450,lg:325} }}>
            <h2 className="text-xl font-bold">Create your account</h2> 
          
            <form className="flex flex-col gap-5 lg:gap-3 flex-wrap" onSubmit={handleSubmit(localHandleSubmit)}>

                <div className=" w-full flex flex-col gap-3 md:flex-row justify-around">
                <article className="flex flex-col">  
            <TextField  type="text" label="Introduce your name" variant="standard" autoFocus {...register("userName", {required:{value: true, message: "The fiedl can't be empty"}, minLength:{value:3, message:'You most write 3 leters at least'} })} /> 
            {errors.userName && <span className="flex text-center text-xs font-semibold text-red-700">{errors.userName.message}</span>}
             </article>
             <article className="flex flex-col">
             <TextField type="email" label="write your email" variant="standard" {...register("email",{ required: {value: true, message:'Debes escribir tu correo electronico'}, pattern:{value: /\S+@\S+\.\S+/, message:'Te email most be valid'} })} />
             {errors.email && <span className=" flex text-center text-xs font-semibold text-red-700">{errors.email.message}</span>}
             
             </article>
            </div>
            <div className=" w-full flex flex-col md:flex-row justify-around">
            <article className="flex flex-col">
            <TextField type="password" label="Passwor" variant="standard" {...register("password", { required: {value:true, message:'Debes completar el campo'}, minLength:{value:6, message: 'La contraseña debe contener al menos 6 caracteres'} })}/>
            {errors.password && <span className="pl-0 flex text-xs font-semibold text-red-700">{errors.password.message}</span>}
      </article>
      <article className="flex flex-col">
            <TextField type="password"   label="Repeat password" variant='standard' {...register("repeatPassword", { required: {value: true, message: 'Debes Completar el campo'}, validate: (value) => value == principalPassword })}/>
            {errors.repeatPassword && <span className=" flex text-center text-xs font-semibold text-red-700">{errors.repeatPassword.message}</span>}
            {errors.repeatPassword?.type == "validate" && <span className=" flex text-center text-xs font-semibold text-red-700">Las contraseñas deben ser identicas</span>}
            </article> 
            </div>
            <div className=" flex justify-center gap-4">
            <Avatar style={{marginTop:'10px'}} src="/broken-image.jpg" />


            <TextField type="text" label="Charge your perfil image" variant="standard" {...register("img")} /> 
            {/* el tipe debe ser file */}
            </div>
            <Button type="submit" className=" w-1/2 m-auto border-2 border-cyan-600 bg-violet-900
         hover:border-violet-900 hover:bg-cyan-600"> Registrate</Button>
            </form>
          </Box>
        </Modal>
      </>
    );
  }