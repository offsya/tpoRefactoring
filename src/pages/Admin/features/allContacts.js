import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    allContacts: []
}

export const allContactsSlice = createSlice({
    name: 'allContacts',
    initialState,
    reducers: {
        updateContact: (state, action) => {
            state.allContacts = state.allContacts.map(el => {
                if(el._id == action.payload.id){
                    return {...action.payload, _id: action.payload.id}
                }else{
                    return el
                }
            })
        },

        createContact: (state, action) => {
            state.allContacts = [...state.allContacts, action.payload]
        },

        addallContacts: (state, action) => {
            if(action.payload){
                state.allContacts = action.payload
            }else{
                state.allContacts = []
            }
        },

    }

})


export const {addallContacts, updateContact, createContact} = allContactsSlice.actions
export default allContactsSlice.reducer