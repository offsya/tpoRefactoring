import React, {useState} from 'react';
import {IoClose} from "react-icons/io5";
import {useDispatch, useSelector} from "react-redux";
import {
    deleteStatus,
    setAllStatus,
    setAllArrayStatus,
    addNewColor,
    setOpenColorPicker,
    setStatusName
} from "../../../../features/allStatus";
import axios from "axios";
const StatusComponent = ({elem, statusAddOpen, colorPicker, setColorPicker, deleteStatus, setAllChangesStatusArray}) => {
    const [name, setName] = useState(elem.name);
    const [colorsArray, setColorsArray] = useState(['#359970', '#d5c567', '#ffbdbd', '#ff9191', '#c95c76', '#ff44a1', '#ff7bd0', '#fbb4f4', '#6645a9', '#401694', '#777ae5', '#4e73a7', '#79affd', '#71d6d1', '#85d6ff', '#86b4ca', '#aebdca', '#999999', '#5c5c5c', '#99756c', '#e190c0', '#bdab95', '#b4e9f8', '#ca9a8b', '#5591ea', '#457b82', '#cab9fa', '#bacbed', '#b1adc7', '#786565'])
    const dispatch = useDispatch()
    const allStatus = useSelector((state) => state.allStatus.allStatus)
    console.log(elem)
    const updateNameOfStatus = (name, color) => {
        setName(name)
        dispatch(setStatusName({...elem, 'name': name}))
        setAllChangesStatusArray((all) => {
            const filterArray = all.map((item) => item._id);
            if(!filterArray.includes(elem._id)){
                return [...all, {'_id': elem._id, 'name': name, 'color': color}]
            }else{
                const buffArr = all.filter(item => item._id !== elem._id);
                return [...buffArr, {'_id': elem._id, 'name': name, 'color': color}]
            }
        })
    }





    return (
        <div className='statusElemInputChangeBlock'>
            <div className='statusElemInputChange'>
                    <span onClick={() => dispatch(setOpenColorPicker(elem))} style={{background: elem.color, border: elem.color == '#FFF' && '1px solid #B7B7B7'}}>

                    </span>
                <input type="text" onChange={(e) => updateNameOfStatus(e.target.value, elem.color)} value={name}/>
            </div>
            <div className='statusElemInputChangeClose' onClick={() => deleteStatus(elem)}>
                <IoClose/>
            </div>
            {elem.openColorPicker &&
                <div className='colorPickerBlock'>
                    <div className='colorPicker'>
                        {colorsArray.map(color => {
                            return <span style={{background: color}} onClick={() => {dispatch(addNewColor({elem, color})); updateNameOfStatus(elem.name, color)}} className='colorElem'></span>
                        })}
                    </div>
                </div>
            }
        </div>
    );
};

export default StatusComponent;