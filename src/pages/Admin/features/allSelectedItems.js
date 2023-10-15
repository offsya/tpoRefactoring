import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    allSelectedItems: []
}

export const allSelectedItemsSlice = createSlice({
    name: 'allSelectedItems',
    initialState,
    reducers: {
        setAllSelectedItems: (state, action) => {
            const filterArray = state.allSelectedItems.map((elem) => elem._id);
            if(!filterArray.includes(action.payload._id)){
                state.allSelectedItems = [...state.allSelectedItems, action.payload]
            }else{
                state.allSelectedItems = state.allSelectedItems.filter(item => item._id !== action.payload._id);
            }
        },
        setAllSelectedItemsOrders: (state, action) => {
            const filterArray = state.allSelectedItems.map((elem) => elem._id);
            if(!filterArray.includes(action.payload._id)){
                state.allSelectedItems = [...state.allSelectedItems, action.payload]
            }else{
                state.allSelectedItems = state.allSelectedItems.filter(item => item._id !== action.payload._id);
            }
        },
        delAllSelectedItems: (state, action) => {
                state.allSelectedItems = []
        },
        addAllSelectedItems: (state, action) => {
            if(action.payload.check){
                state.allSelectedItems = action.payload.arr
            }else{
                state.allSelectedItems = []
            }
        },
    }

})


export const {delAllSelectedItems, setAllSelectedItemsOrders, setAllSelectedItems, addAllSelectedItems} = allSelectedItemsSlice.actions
export default allSelectedItemsSlice.reducer