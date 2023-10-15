import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    filterOpenSideMenu: false
}

export const filterOpenSideMenuSlice = createSlice({
    name: 'filterOpenSideMenu',
    initialState,
    reducers: {
        setFilterOpenSideMenu: (state, action) => {
            state.filterOpenSideMenu = action.payload
        }
    }
})


export const {setFilterOpenSideMenu} = filterOpenSideMenuSlice.actions
export default filterOpenSideMenuSlice.reducer