import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    searchItemsAdmin: '',
}

export const searchSlice = createSlice({
    name: 'searchItemsAdmin',
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.searchItemsAdmin = action.payload
        },
    }
})


export const {setSearch} = searchSlice.actions
export default searchSlice.reducer