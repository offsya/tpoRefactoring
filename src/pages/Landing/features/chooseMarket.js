import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    chooseMarket: 1 //null
}

export const chooseMarketSlice = createSlice({
    name: 'chooseMarket',
    initialState,
    reducers: {
        setChooseMarket: (state, action) => {
            state.chooseMarket = action.payload
        }
    }
})


export const {setChooseMarket} = chooseMarketSlice.actions
export default chooseMarketSlice.reducer