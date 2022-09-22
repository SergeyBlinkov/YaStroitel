import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../Redux/ReduxConfigStore";
import ModalBathList from "./ModalBathList";
import {Box, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import './ModalList.css'
import {resultCost} from "../../../Redux/CalculatorBathSlice";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const styleTable = {
    margin: 'auto',
    zIndex: 10,
    maxWidth: 1280,
    minWidth: 650
}

function ModalList() {
    const [modalShow, setModalShow] = useState(false)
    const BathCalc = useAppSelector(state=>state.CalculatorBath)
    const dispatch = useAppDispatch()
    const showElement = Object.values(BathCalc).filter(data => data.price > 0)
    const ShowChecker = showElement.length > 0 && BathCalc.MetresRoom.floor.amount > 0 && BathCalc.TileSize.price > 0


    const handleShow = () => setModalShow(!modalShow)


    const WrongComponent = () => (<Modal
        open={modalShow}
        onClose={handleShow}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
    >
        <Box sx={{...style,width: 400 }}>
            <h2 id="parent-modal-title">Вы ничего не выбрали</h2>
        </Box>
    </Modal>)



    return (
        <>
        {ShowChecker ? <Modal open={modalShow} onClose={handleShow}><TableContainer component={Paper} sx={{ ...styleTable,marginTop:4}}>
            <Table sx={{...styleTable}}>
                <TableHead>
                    <TableRow>
                        <TableCell>Услуга</TableCell>
                        <TableCell>Цена за единицу</TableCell>
                        <TableCell>Количество(шт|п/м|кв/м)</TableCell>
                        <TableCell>Цена</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <ModalBathList />
                    <TableRow sx={{bgcolor:'lightyellow'}}>
                        <TableCell colSpan={2}>Итого по смете</TableCell>
                        <TableCell colSpan={2}>{BathCalc.finalResult}</TableCell>

                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        </Modal>
            : <WrongComponent />}
            <div
                className={'ButtonModalList'}
                onClick={() => {
                handleShow()
                    return dispatch(resultCost())
            }}>
                <i className="fa-regular fa-rectangle-list"></i>
                <p>Смета</p>
            </div>
        </>
    );
}

export default ModalList;