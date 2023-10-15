import React, {useState, useEffect} from 'react';
import '../../../../Mobile/Components/CardElem/CardElem.scss'
import { IoIosClose } from 'react-icons/io';
import { FiPlus, FiMinus } from 'react-icons/fi';
import {useDispatch, useSelector} from "react-redux";
import {
    setCartElemQuantityIncrement,
    setCartElemQuantityDecrement,
    setCartElemQuantityValue,
    deleteCartElem,
    setCartElemCurrentUnit
} from "../../../../features/allCartItems";
import {
    setElemCurrentUnit,
    setElemQuantityDecrement,
    setElemQuantityIncrement,
    setElemQuantityValue
} from "../../../../features/allItems";
import {Select} from "antd";

const CartElemDefMarket = ({elem}) => {
    const worksDays = useSelector((state) => state.worksDay.worksDaysArray)
    const chooseWeeks = useSelector((state) => state.chooseWeeks.chooseWeeks)
    const chooseMarket = useSelector((state) => state.chooseMarket.chooseMarket)
    const allItems = useSelector((state) => state.allItems.allItems)


    const dispatch = useDispatch()
    const handleChange = (event) => {
        const newValue = event.target.value;
        // Проверяем, что введенное значение является числом
        if (newValue || newValue == '') {
            dispatch(setCartElemQuantityValue({value: newValue, elem: elem, chooseWeeks: chooseWeeks}))
            dispatch(setElemQuantityValue({value: newValue, elem: elem, chooseWeeks: chooseWeeks}))
        }
        // if(newValue == 0){
        //     dispatch(deleteCartElem(elem))
        //     dispatch(setElemQuantityValue({value: 0, elem: elem, chooseWeeks: chooseWeeks}))
        //
        // }
    };

    const OptionsList = (elem)=>{
        let options=[]

        if(Array.isArray(elem.unit)){
            console.log(elem.unit)
            for (let i = 0; i < elem.unit.length; i++) {
                console.log(elem.unit[i])
                options.push({
                    value: elem.unit[i],
                    label: elem.unit[i],
                });
            }
            console.log(options)
            return options
        }else{
            for (let i = 0; i < elem.unit.split(",").length; i++) {
                options.push({
                    value: elem.unit.split(",")[i],
                    label: elem.unit.split(",")[i],
                });
            }
            console.log(options)
            return options
        }
    }
    const handleMouseLeave = (event) => {
        console.log('leave')
        const newValue = event.target.value;

        if(true){
            dispatch(setCartElemQuantityValue({value: elem.quantity, elem: elem, chooseWeeks: chooseWeeks}))
            dispatch(setElemQuantityValue({value: elem.quantity, elem: elem, chooseWeeks: chooseWeeks}))
        }
        // if(newValue == ''){
        //     dispatch(setCartElemQuantityValue({value: 0, elem: elem, chooseWeeks: chooseWeeks}))
        //     dispatch(setElemQuantityValue({value: 0, elem: elem, chooseWeeks: chooseWeeks}))
        // }
    }
    const handleChangeCurrentUnit = (newUnit) => {
        console.log(newUnit)
        const newValue = newUnit
        if (isNaN(newValue)) {
            dispatch(setCartElemCurrentUnit({value: newValue, elem: elem, chooseWeeks: chooseWeeks}))

            dispatch(setElemCurrentUnit({value: newValue, elem: elem, chooseWeeks: chooseWeeks}))
        }
    };

    return (
        <div className='cardElem'>
            <IoIosClose className='cardElemDeleteImg' onClick={() => {
                dispatch(deleteCartElem(elem))
                dispatch(setElemQuantityValue({value: 0, elem: elem, chooseWeeks: chooseWeeks}))
            }}/>
            <div><img className='imgCardElem' src={elem.img} alt="tomato"/></div>
            <div className="cardElemName">{elem.name}</div>
            <div className='cardElemChange' style={{marginTop:"10px"}}>
                <FiMinus onClick={(e) => {

                    dispatch(setCartElemQuantityDecrement(elem))
                    dispatch(setElemQuantityDecrement(elem))
                    if(parseInt(elem.quantity) <= 1){
                        dispatch(deleteCartElem(elem))
                    }
                }}/>

                <div className="inputUnits" style={{display:"flex",justifyContent:"center",alignItems:"center"}} >
                    <input style={{marginRight:"5px",textAlign: "right",alignItems:"center",width:(((elem.quantity).toString().length+1)*8)+"px"}} type="number" onChange={handleChange} onBlur={handleMouseLeave} value={allItems.filter((items) => items._id === elem._id)[0].quantity}/>
                    {
                        Array.isArray(elem.unit) || elem.unit.includes(",") ?
                            <div className="UnitsSetelect">
                                {<Select


                                    style={{
                                        padding:0,
                                        width: 68,
                                    }}
                                    onChange={(newUnit)=>handleChangeCurrentUnit(newUnit)}
                                    value={elem?.currentUnit || OptionsList(elem)[0] }
                                    options={OptionsList(elem)}
                                />}
                            </div>
                            :
                            <div style={{alignItems:"center"}}>{elem?.currentUnit ? elem.currentUnit : elem.unit}</div>
                    }
                </div>

                {/*<div>*/}
                {/*    <input type="number" onChange={handleChange} onBlur={handleMouseLeave} value={allItems.filter((items) => items._id === elem._id)[0].quantity}/>*/}
                {/*</div>*/}
                <FiPlus onClick={() => {
                    dispatch(setCartElemQuantityIncrement(elem))
                    dispatch(setElemQuantityIncrement(elem))
                }}/>

            </div>
            <div className="cardElemPrice">{(elem.marketPriceCP * elem.quantity || elem.marketPriceCP * elem.quantity < 0 ? elem.marketPriceCP * elem.quantity : 0).toFixed(2)}€</div>
            {chooseMarket == 2 && <div className="cardElemAMP"><span>AMP</span> for {worksDays.length} days</div>}
            <div className='cardElemBottomSpace'></div>

        </div>
    );
};

export default CartElemDefMarket;