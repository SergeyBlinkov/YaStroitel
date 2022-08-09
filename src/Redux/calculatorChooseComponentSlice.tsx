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
        ],
    bathType:[
        {
            type:'cast-iron',
            show:false,
            inPrice:false
        },
        {
            type:'acrylic',
            show:false,
            inPrice:false
        },
        {
            type:'steel',
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
            state[name as keyof typeof state].map((data) => data.type === type ?
            data.show = !data.show :
            data.show = false)
        },
        closeReducer:(state,action) => {
            const name = action.payload
            state[name as keyof typeof state].map(data => data.inPrice = false)
            state[name as keyof typeof state].map(data => data.show = false)
        },
        inPriceReducer:(state, action) => {
            const {name,type} = action.payload
            state[name as keyof typeof state].map((data) => data.type === type ? data.inPrice = true : data.inPrice)
        },
        closeInPrice:(state, action) => {
            const {name,type} = action.payload
            state[name as keyof typeof state].map((data) => data.type === type ? data.inPrice = false : data.inPrice)
        }
    }
})

export const {openReducer,closeReducer,inPriceReducer,closeInPrice} = calculatorChooseComponentSlice.actions

export default calculatorChooseComponentSlice.reducer
