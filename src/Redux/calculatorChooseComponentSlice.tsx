import {createSlice} from "@reduxjs/toolkit";

const init = {
    dryWall:[
        {
            type:'wall',
            show:false,
            inPrice: false
        },
        {
            type:'box',
            show:false,
            inPrice:false
        },
        {
            type:'bath',
            show:false,
            inPrice:false
        }
        ]
}

const calculatorChooseComponentSlice = createSlice({
    name:'calculatorChooseComponent',
    initialState:init,
    reducers: {
        openReducer: (state, action) => {
            const {name,type} = action.payload
            if(name === 'dryWall') state.dryWall.map((data)=> data.type === type ?
                data.show = !data.show :
                data.show = false)
        },
        closeReducer:(state,action) => {
            const name = action.payload
            if(name === 'dryWall') state.dryWall.map((data) => {
                data.show = false
                data.inPrice = false
            })
        },
        inPriceReducer:(state, action) => {
            const {name,type} = action.payload
            state[name as keyof typeof state].map((data) => data.type === type ? data.inPrice = true : data.inPrice = false)
        }
    }
})

export const {openReducer,closeReducer,inPriceReducer} = calculatorChooseComponentSlice.actions

export default calculatorChooseComponentSlice.reducer
