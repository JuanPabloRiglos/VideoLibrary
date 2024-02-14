import { Modal, CardContent, Typography, CardActions, Button, TextField} from '@mui/material/';
import { useNavigate } from 'react-router-dom';
import Fingerprint from '@mui/icons-material/Fingerprint';
import { Card } from '@tremor/react';
import { RegisterForm } from '../userForms/registerForm';
import { ChangeEvent,MouseEvent, useState } from 'react';
import { userLogginState } from '../../hooks/types.users';



export function ModalToUserHandler() {
    const navigate = useNavigate()
  const [open, setOpen] = useState(true);
  const [userLoggIn, setUserLoggIn] = useState<userLogginState>({userNameOrEmail:'', userPassword:''})
  const [errorInFo, setErrorInfo] = useState<boolean>(false)

  const handlerUserLogin = (e:ChangeEvent<HTMLInputElement>) =>{
    setUserLoggIn({...userLoggIn, [e.target.name]: e.target.value})
  }
//   console.log('user loggin :')
//   console.log(userLoggIn)

  const handlerLoggInInfo = (e : MouseEvent<HTMLButtonElement> ) =>{
    e.preventDefault
    !userLoggIn.userNameOrEmail  && setErrorInfo(true)
    !userLoggIn.userPassword  && setErrorInfo(true)
   
}
  return (
    <div className='border-2 rounded-lg'>
      <Modal
        open={open}
        onClose={()=>setOpen(!open)}
      >
        <div className=' w-4/5 h-4/5  m-auto mt-10 border-0 flex flex-col-reverse md:flex-row lg:flex-row xl:flex-row rounded-lg overflow-auto md:overflow-hidden'> 
          <div className='w-full min-h-fit md:w-1/2 h-full bg-tremor-background sm:bg-violet-900 rounded-sm animate-fade-right box-content'>
          <article className='w-full rounded-md sm:w-4/5 bg-violet-900 sm:bg-tremor-background min-h-fit sm:h-5/6 md:h-4/5 m-auto sm:mt-5 md:my-14 box-border flex flex-col justify-around'>
      <CardContent>
      <Typography sx={{ display:{xs:'block', sm:'block', md:'none', lg:'none', xl:'none'}, color:{xs:'white', sm:'black'}}} gutterBottom variant="h6" component="div">
         AppList
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
        <div className='border-2 rounded-md border-cyan-600 sm:border-violet-900 font-semibold   text-cyan-600 sm:text-slate-100 p-1 w-3/5 sm:2/5 flex flex-nowrap justify-center bg-tremor-background sm:bg-cyan-600' onClick={()=> navigate('/seAll')} >See all</div>
      </CardActions>
      </CardContent>
    </article>
          </div>
          <div className='w-full min-h-fit md:w-1/2 h-full bg-tremor-background rounded-sm animate-fade-left'>
          <Card className='w-4/5 min-h-fit sm:h-4/5 md:h-4/5 m-auto my-2 md:mt-14 '>
            <form className='flex flex-col gap-5'>

            <TextField onChange={handlerUserLogin} type="text" label="Enter your email address" name='userNameOrEmail' color={errorInFo && userLoggIn.userNameOrEmail == '' ? 'error' :"secondary"} focused autoFocus/>

            <TextField  onChange={handlerUserLogin} type='password' label="Your password" name='userPassword' color={errorInFo && !userLoggIn.userPassword ? 'error' :"secondary"} focused />

            <Button style={{display:'flex', gap:'8px'}} aria-label="fingerprint" color="secondary" onClick={handlerLoggInInfo}>
          Loggin
        <Fingerprint />
      </Button>
            </form>
            <div className='my-8 flex flex-col gap-2 align-middle'>
            <h3 className='m-auto font-semibold'> You do not have an account?</h3>
            <RegisterForm /> 
            </div>
            </Card>
          </div>
        </div>
      </Modal>
    </div>
  );
}