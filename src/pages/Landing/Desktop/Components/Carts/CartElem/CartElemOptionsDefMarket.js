import React from 'react';
import '../../../../Mobile/Components/CardElem/CardElem.scss'
import { IoIosClose } from 'react-icons/io';
import { FiPlus, FiMinus } from 'react-icons/fi';
import {useDispatch, useSelector} from "react-redux";
import {
    setCartElemQuantityIncrement,
    setCartElemQuantityDecrement,
    deleteCartElem,
    setCartElemQuantityValue
} from "../../../../features/allCartItems";
import {setElemQuantityDecrement, setElemQuantityIncrement, setElemQuantityValue} from "../../../../features/allItems";

const CartElemOptions = ({elem}) => {
    const dispatch = useDispatch()
    const worksDays = useSelector((state) => state.worksDay.worksDaysArray)

    return (
        <div className='cardElem cardElemOptions'>
            <IoIosClose className='cardElemDeleteImg' onClick={() => {
                dispatch(deleteCartElem(elem))
                dispatch(setElemQuantityValue({value: 0, elem: elem, chooseWeeks: chooseWeeks}))
            }}/>
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
            <div className="cardElemAMP"><span>AMP</span> for {worksDays.length} days</div>
            <div className='cardElemBottomSpace'></div> </div>
    );
};

export default CartElemOptions;