import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../Redux/ReduxConfigStore";
import ModalBathList from "./ModalBathList";
import {

    ButtonBase,
    Modal,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip
} from "@mui/material";
import './ModalList.css'
import {resultCost} from "../../../Redux/CalculatorBathSlice";



// const style = {
//     position: 'absolute' as 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: '#847C6E',
//     border: '2px solid #E5DCCB',
//     boxShadow: 24,
//     pt: 2,
//     px: 4,
//     pb: 3,
//     color:"#484747",
//     fontSize:"15px",
//     fontWeight:"bold",
// };

function ModalList() {
    const [modalShow, setModalShow] = useState(false)
    const BathCalc = useAppSelector(state=>state.CalculatorBath)
    const dispatch = useAppDispatch()
    const showElement = Object.values(BathCalc).filter(data => data.price > 0)
    const handleShow = () => setModalShow(!modalShow)


    // const WrongComponent = () => (<Modal
    //     open={modalShow}
    //     onClose={handleShow}
    //     aria-labelledby="parent-modal-title"
    //     aria-describedby="parent-modal-description"
    // >
    //     <Box sx={{...style,width: 400 }}>
    //         <h2 id="parent-modal-title">Вы ничего не выбрали</h2>
    //     </Box>
    // </Modal>)



    return (
        <>
        {<Modal open={modalShow} onClose={handleShow}>
                <TableContainer className={'ModalContainer'}>
            <Table className={'ModalTable'}>
                <TableHead>
                    <TableRow className={'ModalTable_Row'}>
                        <TableCell className={'ModalTable_Row__items'}>Услуга</TableCell>
                        <TableCell className={'ModalTable_Row__items'}>Цена за единицу</TableCell>
                        <TableCell className={'ModalTable_Row__items'}>Количество(шт|п/м|кв/м)</TableCell>
                        <TableCell className={'ModalTable_Row__items'}>Цена</TableCell>
                        <TableCell className={'ModalTable_Row__items'}>Убрать из списка</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <ModalBathList />
                    <TableRow sx={{bgcolor:'#E5DCCB'}}>
                        <TableCell colSpan={3}>Итого по смете</TableCell>
                        <TableCell colSpan={3}>{BathCalc.finalResult}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        </Modal>
            // : <WrongComponent />
            }
            <div className={'ButtonModalList'}>
                <Tooltip title={'Смета'}>
                    <ButtonBase className={'ButtonModalList_icon'}
                                onClick={() => {
                        handleShow()
                        return dispatch(resultCost())
                    }}>
                        <i className="fa-regular fa-rectangle-list fa-xl"></i>
                        {showElement.length > 0 && <p className={'ButtonModalList_icon__span'}>{showElement.length}</p>}
                    </ButtonBase>
                </Tooltip>
            </div>
        </>
    );
}

export default ModalList;