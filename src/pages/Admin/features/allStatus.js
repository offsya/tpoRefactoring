import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    allStatus: [],
}

export const allStatusSlice = createSlice({
    name: 'allStatus',
    initialState,
    reducers: {
        setAllArrayStatus: (state, action) => {
            state.allStatus = action.payload

        },
        setAllStatus: (state, action) => {
            // const filterArray = state.allStatus.map((elem) => elem.name);
            // if(!filterArray.includes(action.payload.name)){
            //     state.allStatus = [...state.allStatus, action.payload]
            // }else{
            //     state.allStatus = state.allStatus.filter(item => item.name !== action.payload.name);
            // }
            state.allStatus = [...state.allStatus, action.payload]

        },
        addNewColor:(state, action) => {
          state.allStatus = state.allStatus.map(elem => {
              if(elem._id == action.payload.elem._id)
              {
                  elem.color = action.payload.color
              }
              return elem
          })
        },
        setOpenColorPicker: (state, action) => {
            state.allStatus = state.allStatus.map(elem => {
                if(elem._id == action.payload._id)
                {
                    elem.openColorPicker = !(elem.openColorPicker)
                }else{
                    elem.openColorPicker = false
                }
                return elem
            })
        },
        setStatusName: (state, action) => {
            state.allStatus = state.allStatus.map(elem => {
                if(elem._id == action.payload._id) {
                    elem.name = action.payload.name
                }
                return elem
            })
        },
        setDeleteStatus: (state, action) => {
                state.allStatus = state.allStatus.filter(item => item._id !== action.payload._id);
        },
    }
})


export const {setDeleteStatus,setStatusName,setOpenColorPicker,addNewColor, setAllArrayStatus, setAllStatus} = allStatusSlice.actions
export default allStatusSlice.reducer