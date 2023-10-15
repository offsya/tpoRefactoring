import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    allChooseColumnOrders: ['Number', 'Source', 'Client', 'Comments', 'Status', 'Date','Address', 'Phone', 'Total', 'Profit', 'Codigo', 'Name', 'Type', 'Address', 'Email', 'Paid', 'Balance', 'NIF', 'IBAN', 'Tags', 'Last Visit', 'Last Update', 'Margen', 'User', 'Delivery Date']
}

export const allChooseColumnOrdersSlice = createSlice({
    name: 'allChooseColumnOrders',
    initialState,
    reducers: {
        setAllArrayChooseColumn: (state, action) => {
            state.allChooseColumnOrders = action.payload

        },
        setAllChooseColumnOrders: (state, action) => {
            const filterArray = state.allChooseColumnOrders.map((elem) => elem);
            if(!filterArray.includes(action.payload)){
                state.allChooseColumnOrders = [...state.allChooseColumnOrders, action.payload]
            }else{
                state.allChooseColumnOrders = state.allChooseColumnOrders.filter(item => item !== action.payload);
            }

        },
        deleteColumn: (state, action) => {
            state.allChooseColumnOrders = state.allChooseColumnOrders.filter(item => item !== action.payload);
        },
    }
})


export const {deleteColumn, setAllArrayChooseColumn, setAllChooseColumnOrders} = allChooseColumnOrdersSlice.actions
export default allChooseColumnOrdersSlice.reducer