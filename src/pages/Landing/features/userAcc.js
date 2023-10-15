import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    userAcc: {
    }, //null,
}

export const userAccSlice = createSlice({
    name: 'userAcc',
    initialState,
    reducers: {
        setUserAcc: (state, action) => {
            state.userAcc = action.payload
        }
    }
})


export const {setUserAcc} = userAccSlice.actions
export default userAccSlice.reducer