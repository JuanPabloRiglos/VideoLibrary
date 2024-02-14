import { useState } from "react";
import {useForm, SubmitHandler } from 'react-hook-form'
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
  }
  

  
   export function RegisterForm() {
    
//     const {passwordValidate} = useFormControls()
    const [open, setOpen] = useState(false);
    const toggleOpen = (trueOrFalse:boolean) => setOpen(trueOrFalse);// maneja el open o close del modal

const {register, handleSubmit, formState:{errors}} = useForm<Inputs>()

console.log(errors)
const localHandleSubmit : SubmitHandler<Inputs> =(data) => console.log(data)

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
          <Box sx={{ ...style, width:{ xs:300, sm:500 , md:600, lg:800}, height:{xs:400,md:275} }}>
            <h2 className=" text-xl font-bold" >Create your account </h2> 
          
            <form className="flex flex-col gap-3 flex-wrap" onSubmit={handleSubmit(localHandleSubmit)}>

                <div className=" w-full flex flex-col md:flex-row justify-around">
                <article className="flex flex-col">  
            <TextField  type="text" label="Introduce your name" variant="standard" autoFocus {...register("userName", {required:{value: true, message: "The fiedl can't be empty"}, minLength:{value:3, message:'You most write 3 leters at least'} })} /> 
            {errors.userName && <span className=" font-thin text-red-600">{errors.userName.message}</span>}
             </article>
             <article>
             <TextField type="email" label="write your email" variant="standard" {...register("email",{ required: {value: true, message:'Debes escribir tu correo electronico'}})} />
             {errors.email && <span className="font-thin text-red-600">{errors.email.message}</span>}
             </article>
            </div>
            <div className=" w-full flex flex-col md:flex-row justify-around">
            <TextField type="password" label="Passwor" variant="standard" {...register("password", { required: true })}/>


            <TextField type="password"   label="Repeat password" variant='standard' {...register("repeatPassword", {  required: true})}/>
            </div>
            <div className=" flex justify-center gap-4">
            <Avatar style={{marginTop:'10px'}} src="/broken-image.jpg" />


            <TextField type="text" label="Charge your perfil image" variant="standard" {...register("img")} /> 
            {/* el tipe debe ser file */}
            </div>
            <Button className=" w-1/2 m-auto border-2 border-cyan-600 bg-violet-900
         hover:border-violet-900 hover:bg-cyan-600"> Registrate</Button>
            </form>
          </Box>
        </Modal>
      </>
    );
  }