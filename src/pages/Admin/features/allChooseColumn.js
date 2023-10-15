import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    allChooseColumn: ['SKU', 'Image', 'Enabled', 'Name', 'Category','Proveedor', 'Unit', 'IVA', 'CP', 'Entry Price', 'Profit', 'Margen', 'Total', 'C.Qty', 'O.Qty']
}

export const allChooseColumnSlice = createSlice({
    name: 'allChooseColumn',
    initialState,
    reducers: {
        setAllArrayChooseColumn: (state, action) => {
            state.allChooseColumn = action.payload

        },
        setAllChooseColumn: (state, action) => {
            const filterArray = state.allChooseColumn.map((elem) => elem);
            if(!filterArray.includes(action.payload)){
                state.allChooseColumn = [...state.allChooseColumn, action.payload]
            }else{
                state.allChooseColumn = state.allChooseColumn.filter(item => item !== action.payload);
            }

        },
        deleteColumn: (state, action) => {
            state.allChooseColumn = state.allChooseColumn.filter(item => item !== action.payload);
        },
    }
})


export const {deleteColumn, setAllArrayChooseColumn, setAllChooseColumn} = allChooseColumnSlice.actions
export default allChooseColumnSlice.reducer