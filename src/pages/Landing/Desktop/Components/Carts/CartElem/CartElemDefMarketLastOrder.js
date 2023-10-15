import React, {useState, useEffect} from 'react';
import '../../../../Mobile/Components/CardElem/CardElem.scss'
import { IoIosClose } from 'react-icons/io';
import { FiPlus, FiMinus } from 'react-icons/fi';
import {useDispatch, useSelector} from "react-redux";
import {setCartElemQuantityIncrement, setCartElemQuantityDecrement, setCartElemQuantityValue, deleteCartElem} from "../../../../features/allCartItems";
import {setElemQuantityDecrement, setElemQuantityIncrement, setElemQuantityValue} from "../../../../features/allItems";

const CartElemDefMarketLastOrder = ({elem}) => {
    const worksDays = useSelector((state) => state.worksDay.worksDaysArray)
    const chooseWeeks = useSelector((state) => state.chooseWeeks.chooseWeeks)
    const chooseMarket = useSelector((state) => state.chooseMarket.chooseMarket)

    const dispatch = useDispatch()
    const handleChange = (event) => {
        const newValue = event.target.value;
        // Проверяем, что введенное значение является числом
        if (!isNaN(newValue)) {
            dispatch(setCartElemQuantityValue({value: newValue, elem: elem, chooseWeeks: chooseWeeks}))
            dispatch(setElemQuantityValue({value: newValue, elem: elem, chooseWeeks: chooseWeeks}))
        }
    };


    const handleMouseLeave = (event) => {
        console.log('leave')
        if(true){
            dispatch(setCartElemQuantityValue({value: elem.quantity, elem: elem, chooseWeeks: chooseWeeks}))
            dispatch(setElemQuantityValue({value: elem.quantity, elem: elem, chooseWeeks: chooseWeeks}))
        }
    }

    return (
        <div className='cardElem'>
            <div><img className='imgCardElem' src={elem.img} alt="tomato"/></div>
            <div className="cardElemName">{elem.name}</div>
            <div className='cardElemChange'>
                <FiMinus onClick={() => {
                    dispatch(setCartElemQuantityDecrement(elem))
                    dispatch(setElemQuantityDecrement(elem))
                    console.log(elem.quantity)
                    if(elem.quantity == 1 || parseInt(elem.quantity) == 0){
                        dispatch(deleteCartElem(elem))
                    }
                }}/>
                <div>
                    <input type="number" onChange={handleChange} onBlur={handleMouseLeave} value={elem.quantity}/></div>
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

export default CartElemDefMarketLastOrder;