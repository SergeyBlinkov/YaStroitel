import React, {useState} from 'react';
import {Checkbox, FormControlLabel, TextField, Tooltip} from "@mui/material";
import {ChangeEvent} from "../../CalculatorBath/BathType";
import './WallComponent.css'
import CCCNewButton from "../../CalculatorChooseComponent/CCCNewButton";
import {useAppDispatch} from "../../../../Redux/ReduxConfigStore";
import {wallInstallation} from "../../../../Redux/CalculatorBathSlice";

const initStorage = {
    length:0,
    DoorBoolean:false,
    SoundBoolean:false,
    SocketBoolean:false,
    SocketCount:0
}
function WallComponent() {
    const dispatch = useAppDispatch()
const [storage,setStorage] = useState(initStorage)

    const handleChangeBool = (e:ChangeEvent) => {
        const {name,checked} = e.target
        return setStorage({...storage,[name]:checked})
    }
    const handleClickDispatch = () => dispatch(wallInstallation(storage))

    const handleChangeText = (e:ChangeEvent) => {
        const {name,value} = e.target
        return setStorage({...storage,[name]:value})
    }
    return (
        <div className={'WallComponent'}>
            <div className={'WallComponent_size'}>
                <p>Введите сюда размер стены которую необходимо будет сделать</p>
                <Tooltip
                    title={'Размер будет браться стандартный 2.5(Если вы не указали его вручную выше)'}>
                    <TextField
                        label={'Ширина стены'}
                        name={'length'}
                        onChange={handleChangeText}/>
                </Tooltip>
            </div>
            <div className={'WallComponent_item'}>
                <FormControlLabel
                    control={<Checkbox
                        name={'DoorBoolean'}
                        checked={storage.DoorBoolean}
                        onChange={handleChangeBool}
                    />}
                    label={'Необходимо сделать дверной проем?'} />
            </div>
            <div className="WallComponent_item">
                <FormControlLabel
                    control={<Checkbox
                        name={'SoundBoolean'}
                        checked={storage.SoundBoolean}
                        onChange={handleChangeBool}/>}
                    label={'Необходима звуко-шумоизоляция?'} />
            </div>
            <div className="WallComponent_item">
                <FormControlLabel
                    control={<Checkbox
                        name={'SocketBoolean'}
                        onChange={handleChangeBool}
                        checked={storage.SocketBoolean}/>}
                    label={'Установка розеток в этой стене?'}/>
                {storage.SocketBoolean &&
                    <Tooltip title={'Проводка кабеля и установка подразетника не входит в стоимость'}><TextField
                        type={'number'}
                        onChange={handleChangeText}
                        name={'SocketCount'}
                        label={'Введите их количество'}/></Tooltip>}
            </div>
            {storage.length > 0 && <CCCNewButton label={'Добавить работу в смету'} click={handleClickDispatch} />}
        </div>
    );
}

export default WallComponent;