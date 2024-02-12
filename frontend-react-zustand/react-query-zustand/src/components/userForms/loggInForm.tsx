import {Box, Modal, CardContent, Typography, CardActions, Button, TextField} from '@mui/material/';
import { useNavigate } from 'react-router-dom';
import {Fingerprint} from '@mui/icons-material/';
import { Card } from '@tremor/react';
import { RegisterForm } from '../userForms/registerForm';
import { useState } from 'react';

export function ModalToUserHandler() {
    const navigate = useNavigate()
  const [open, setOpen] = useState(true);
  return (
    <div className=''>
      <Modal
        open={open}
        onClose={()=>setOpen(!open)}
    
      >
        {/* <Box sx={{ ...style, width: 400 }}> */}
        <Box sx={{ width: '85%', height:'85%', margin:'auto', marginTop:'5%', display:'flex', borderRadius:'25px', overflow:'hidden'}}>
          {/* <h2 id="parent-modal-title">Text in a modal</h2>
          <p id="parent-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
          */}
          <div className='w-1/2 h-full bg-violet-900 animate-fade-right'>
          <Card className='w-3/5 h-3/5 m-auto mt-24'>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Your Fauvorite Video List App
        </Typography>
        <Typography variant="body2" color="text.secondary">
        With this application, you can save your favorite videos in different lists that you create, to have them at your fingertips. Imagine creating lists of your favorite singers, or saving your favorite recipes, why not Messi's goals. Anyway, the sky is the limit.
Know us!
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={()=> navigate('/seAll')} size="small">See all Videos</Button>
      </CardActions>
    </Card>
          </div>
          <div className='w-1/2 h-full bg-tremor-background animate-fade-left'>
          <Card className='w-3/5 h-3/5 m-auto mt-24 shadow-xl'>
            <form className='flex flex-col gap-5'>
            <TextField label="Enter your username" color="secondary" placeholder='Or your email address' focused />
            <TextField label="Your password" color="secondary" focused type='password' />
            <Button style={{display:'flex', gap:'8px'}} aria-label="fingerprint" color="secondary" >
          Loggin
        <Fingerprint />
      </Button>
            </form>
            <div className='my-8 flex flex-col gap-2 align-middle'>
            <h3 style={{margin:'auto'}}> You do not have an account?</h3>
            <RegisterForm /> 
            </div>
            </Card>
          </div>
        </Box>
      </Modal>
    </div>
  );
}