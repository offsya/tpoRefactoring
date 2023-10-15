import React, {useEffect} from 'react';
import './CardElem.scss'
import { IoIosClose } from 'react-icons/io';
import { FiPlus, FiMinus } from 'react-icons/fi';
import {useDispatch, useSelector} from "react-redux";
import {
    setCartElemQuantityIncrement,
    setCartElemQuantityDecrement,
    deleteCartElem,
    setCartElemQuantityValue
} from "../../../features/allCartItems";
import {setElemQuantityDecrement, setElemQuantityIncrement, setElemQuantityValue} from "../../../features/allItems";

const CartElemMobileDefMarketLastOrder = ({elem}) => {
    const dispatch = useDispatch()
    const chooseMarket = useSelector((state) => state.chooseMarket.chooseMarket)
    const chooseWeeks = useSelector((state) => state.chooseWeeks.chooseWeeks)
    const worksDays = useSelector((state) => state.worksDay.worksDaysArray)
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
        <div className='cardElem cardElemMobile cardElemLastOrderSearch'>
            <div><img className='imgCardElem-mobile' src={elem.img} alt="tomato"/></div>
            <div className="cardElemName-mobile">{elem.name}</div>
            <div className="cardElemPrice-mobile">{(elem.marketPriceCP * elem.quantity || elem.marketPriceCP * elem.quantity < 0 ? elem.marketPriceCP * elem.quantity : 0).toFixed(2)}€</div>
            <div className='cardElemChange-mobile'>
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
            {chooseMarket == 2 && <div className="cardElemAMP-mobile"><span>AMP</span> for {worksDays.length} days</div>}
            <div className='cardElemBottomSpace-mobile'></div>
        </div>
    );
};

export default CartElemMobileDefMarketLastOrder;