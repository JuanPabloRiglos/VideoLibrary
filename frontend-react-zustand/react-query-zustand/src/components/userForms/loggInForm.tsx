import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {useForm, SubmitHandler } from 'react-hook-form';
import { Modal, CardContent, Typography, CardActions, Button, TextField} from '@mui/material/';
import Fingerprint from '@mui/icons-material/Fingerprint';

import { RegisterForm } from '../userForms/registerForm';
import { UserStore } from '../../ZustandStore/userStore';
// import { userLogginState } from '../../hooks/types.users';
// import { getOneUser } from '../../services';
import { useApiUsersHook } from '../../hooks/useApiUsers';
type LoginInputs = {
  email: string,
  password: string,
 
}

export function ModalToUserHandler() {
  const [apiError, setApiError ] = useState<string>('')
  const {userLogged, newUser} = UserStore()
  const navigate = useNavigate()
  // const {newUser} = UserStore()
  const {getUser} = useApiUsersHook()
  const {addUserLogged} = UserStore()
  const [open, setOpen] = useState(userLogged.email !=''? false :true);
useEffect(()=>{
  
  },[apiError])
const {register, handleSubmit, formState:{errors}} = useForm<LoginInputs>({defaultValues:{email:newUser.email}})

  const logginSubmit : SubmitHandler <LoginInputs> = async (loggData)=>{ 
   
    !errors
    await getUser(loggData).then(data=> {
      data?.email == undefined ||  data?.email == null ? setApiError('La direccion de Correo no se ha encontrado en la Base de Datos. Pruebe sin mayusculas'):
      ( data.password != loggData.password ? setApiError('La contaseña no coincide con la guardada en la base de datos'):
      addUserLogged(data))    
      setOpen(false) 
    } )
}

  return (
    <div className='border-2 rounded-lg'>
      <Modal
        open={open}
        onClose={()=>setOpen(!open)}
      >
        <div className=' w-4/5 h-4/5 m-auto mt-10 border-0 flex flex-col-reverse md:flex-row lg:flex-row xl:flex-row rounded-lg overflow-auto md:overflow-hidden'> 
          <div className='w-full min-h-fit md:w-1/2 h-full bg-tremor-background sm:bg-violet-900 rounded-sm animate-fade-right box-content'>
          <article className='w-full rounded-md sm:w-4/5 bg-violet-900 sm:bg-tremor-background min-h-fit sm:h-5/6 md:h-4/5 m-auto sm:mt-5 md:my-14 box-border flex flex-col justify-around'>
      <CardContent>
      <Typography sx={{ display:{xs:'block', sm:'block', md:'none', lg:'none', xl:'none'}, color:{xs:'white', sm:'black'}}} gutterBottom variant="h6" component="div">
         VidoAppList
        </Typography>
        <Typography sx={{display:{xs:'none', sm:'none', md:'block', lg:'block', xl:'block', }}} gutterBottom variant="h5" component="div">
          Your Fauvorite Video List App
        </Typography>
        <Typography variant="body1" color="text.secondary">
        With this application, you can save your favorite videos in different lists that you create, to have them at your fingertips. Imagine creating lists of your favorite singers, or saving your favorite recipes, why not Messi's goals. Anyway, the sky is the limit.
Know us!
        </Typography>
      <CardActions>
      {/* border-cyan-600 bg-violet-900 */}
        <div className='mx-auto border-2 rounded-md border-cyan-600 sm:border-violet-900 font-semibold text-cyan-600 sm:text-slate-100 p-1.5 w-3/5 sm:2/5 flex flex-nowrap justify-center bg-tremor-background hover:bg-cyan-600 hover:text-white sm:bg-cyan-600 sm:hover:bg-violet-900 sm:hover:border-cyan-600  hover:cursor-pointer' onClick={()=> navigate('/seAll')} >See all</div>
      </CardActions>
      </CardContent>
    </article>
          </div>
          <div className='w-full  md:w-1/2 h-full bg-tremor-background rounded-sm animate-fade-left'>
          <article className='w-4/5 h-4/5 m-auto my-2 border-2 rounded-xl  p-4 flex flex-col justify-start align-middle md:justify-center md:mt-14'>
            <form onSubmit={handleSubmit(logginSubmit)} className='flex flex-col gap-5'>
            <div className="flex flex-col">
            <TextField  type="text" label="Enter your email address"  {...register("email",{ required: {value: true, message:'Debes escribir tu correo electronico'}, pattern:{value: /\S+@\S+\.\S+/, message:'Te email most be valid'} })}
             color={  errors.email? 'error' :"secondary"} 
           
             focused autoFocus/>
               {errors.email && <span className=" flex text-center text-xs font-semibold text-red-700">{errors.email.message}</span>}
            </div>
            <div className="flex flex-col justify-around">
            <TextField  type='password' label="Your password"
             color={errors.password? 'error' :"secondary"} 
            {...register("password", { required: {value:true, message:'Debes completar el campo'}, minLength:{value:6, message: 'La contraseña debe contener al menos 6 caracteres'}})}
             focused />
              {errors.password && <span className="pl-0 flex text-xs font-semibold text-red-700">{errors.password.message}</span>}
              {apiError.length > 0 && <span className="pl-0 flex text-xs font-semibold text-red-700">{apiError}</span>}
              </div>
            <Button type='submit' style={{display:'flex', gap:'8px'}} aria-label="fingerprint" color="secondary">
          Loggin
        <Fingerprint />
      </Button>
            </form>
            <div className='my-8 flex flex-col gap-2 align-middle'>
            <h3 className='m-auto font-semibold'> You don't have an account?</h3>
            <RegisterForm /> 
            </div>
            </article>
          </div>
        </div>
      </Modal>
    </div>
  );
}