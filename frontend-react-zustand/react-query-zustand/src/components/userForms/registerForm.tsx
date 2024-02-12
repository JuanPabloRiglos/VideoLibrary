import { Avatar, Box, Modal, TextField } from "@mui/material";
import {Button} from '@tremor/react'
import { useState } from "react";

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
  };
  
   export function RegisterForm() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <>
        <Button className="border-2 border-cyan-600 bg-violet-900
         hover:border-violet-900 hover:bg-cyan-600" onClick={handleOpen}>Go to Register Form</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 800, height:275 }}> Create your account
          
            {/* <h2 id="child-modal-title">Text in a child modal</h2>
            <p id="child-modal-description">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </p> */}
            <form className="flex flex-col gap-3 flex-wrap">
                <div className=" w-full flex justify-around">
            <TextField type="text" label="User name" variant="standard" autoFocus/>
            <TextField id="standard-basic" label="write your email" variant="standard" />
            </div>
            <div className=" w-full flex justify-around">
            <TextField id="standard-basic" type="password" label="Passwor" variant="standard" />
            <TextField id="standard-basic" type="password" label="Repeat password" variant="standard" />
            </div>
            <div className=" flex justify-center gap-4">
            <Avatar style={{marginTop:'10px'}} src="/broken-image.jpg" />
            <TextField id="standard-basic" label="Charge your perfil image" variant="standard" />
            </div>
            <Button className=" w-1/2 m-auto border-2 border-cyan-600 bg-violet-900
         hover:border-violet-900 hover:bg-cyan-600" onClick={handleClose}>Registrate</Button>
            </form>
          </Box>
        </Modal>
      </>
    );
  }