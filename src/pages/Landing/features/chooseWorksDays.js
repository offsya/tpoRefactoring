import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    worksDaysArray: [''],
}

export const worksDaysArraySlice = createSlice({
    name: 'worksDaysArray',
    initialState,
    reducers: {
        changeWorkDay: (state, action) => {
            // const filterArray = state.worksDaysArray.map((elem) => elem);
            // if(!filterArray.includes(action.payload)){
            //     state.worksDaysArray = [...state.worksDaysArray, action.payload]
            // }else{
            //     state.worksDaysArray = state.worksDaysArray.filter(item => item !== action.payload);
            // }
            state.worksDaysArray = [action.payload]
        },
        setWorksDayArray: (state, action) => {
            state.worksDaysArray = [...action.payload]
        },
    }
})


export const {changeWorkDay, setWorksDayArray} = worksDaysArraySlice.actions
export default worksDaysArraySlice.reducer