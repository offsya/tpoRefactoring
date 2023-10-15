import React, {useState, useEffect} from 'react';
import '../../../../Mobile/Components/CardElem/CardElem.scss'
import { IoIosClose } from 'react-icons/io';
import { FiPlus, FiMinus } from 'react-icons/fi';
import {useDispatch, useSelector} from "react-redux";
import {setCartElemQuantityIncrement, setCartElemQuantityDecrement, setCartElemQuantityValue, deleteCartElem} from "../../../../features/allCartItems";

const CartElem = ({elem}) => {
    const worksDays = useSelector((state) => state.worksDay.worksDaysArray)
    const chooseWeeks = useSelector((state) => state.chooseWeeks.chooseWeeks)
    const chooseMarket = useSelector((state) => state.chooseMarket.chooseMarket)

    const dispatch = useDispatch()
    const handleChange = (event) => {
        const newValue = event.target.value;
        // Проверяем, что введенное значение является числом
        if (!isNaN(newValue)) {
            dispatch(setCartElemQuantityValue({value: newValue, elem: elem, chooseWeeks: chooseWeeks}))
        }
    };

    useEffect(() => {
        if(parseFloat(elem.quantity) < parseFloat(elem.minQt)){
            dispatch(setCartElemQuantityValue({value: elem.minQt * (chooseWeeks != 3 ? chooseWeeks != 1 ? 4.5 : 2 : 1), elem: elem, chooseWeeks: chooseWeeks}))
        }
    }, [(chooseWeeks != 3 ? chooseWeeks != 1 ? 4.5 : 2 : 1)])



    const handleMouseLeave = (event) => {
        console.log('leave')
        if(parseFloat(elem.quantity) < parseFloat(elem.minQt) * (chooseWeeks != 3 ? chooseWeeks != 1 ? 4.5 : 2 : 1)){
            dispatch(setCartElemQuantityValue({value: elem.minQt * (chooseWeeks != 3 ? chooseWeeks != 1 ? 4.5 : 2 : 1), elem: elem, chooseWeeks: chooseWeeks}))
        }
    }

    return (
        <div className='cardElem'>
            <IoIosClose className='cardElemDeleteImg' onClick={() => dispatch(deleteCartElem(elem))}/>
            <div><img className='imgCardElem' src={elem.img} alt="tomato"/></div>
            <div className="cardElemName">{elem.name}</div>
            <div className='cardElemChange'>
                <FiMinus onClick={() => {
                    if((chooseWeeks != 3 ? chooseWeeks != 1 ? 4.5 : 2 : 1) * parseFloat(elem.minQt) < parseFloat(elem.quantity)){
                        dispatch(setCartElemQuantityDecrement(elem))
                    }
            }}/>
                <div>
                    <input type="number" onChange={handleChange} onBlur={handleMouseLeave} value={elem.quantity}/></div>
                <FiPlus onClick={() => dispatch(setCartElemQuantityIncrement(elem))}/>
            </div>
            <div className="cardElemPrice">{(elem.marketPriceCP * elem.quantity || elem.marketPriceCP * elem.quantity < 0 ? elem.marketPriceCP * elem.quantity : 0).toFixed(2)}€</div>
            <div className="cardElemAMP"><span>AMP</span> for {worksDays.length} days</div>
            <div className='cardElemBottomSpace'></div>

        </div>
    );
};

export default CartElem;