import React, {useState} from 'react';
import {Checkbox, FormControlLabel} from "@mui/material";
import {ChangeEvent} from "../CalculatorBath/BathType";

function DryWall() {
    const [dryWall,setDryWall] = useState(false)
    const handleChange = (e:ChangeEvent) => {
        const check = e.target.checked
        if(!check) {
            console.log('10:string DryWall')
        }
        return setDryWall(check)
    }
    return (
        <div className="dryWall">
            <FormControlLabel
                control={<Checkbox onChange={handleChange} />}
                label={'Установка коробов из гипсокартона?'}/>
            {dryWall && <div className="dryWallOpen">
                open
            </div>}
        </div>

    );
}

export default DryWall;