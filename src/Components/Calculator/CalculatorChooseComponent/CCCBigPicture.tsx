import React, {Dispatch,SetStateAction} from 'react';
import {Box, Button, Modal} from "@mui/material";


type Props = {
    bigPicture:{show:boolean,img:string},
    setBigPicture:Dispatch<SetStateAction<{show:boolean,img:string}>>
}

function CCCBigPicture({bigPicture,setBigPicture}:Props) {
    const handleClose = () => setBigPicture(prev=>({...prev,show:false}))
    return (
        <Modal
            open={bigPicture.show}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >

                <Box className={'CCCBigPicture'} sx={{width:400}}>
                    <img src={bigPicture.img} alt={`bigPicture`}/>
                    <Button onClick={handleClose} variant={'contained'} color={'success'}>Скрыть</Button>
                </Box>


        </Modal>
    );
}

export default CCCBigPicture;