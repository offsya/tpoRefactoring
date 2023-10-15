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

const CartElemOptions = ({elem}) => {
    const dispatch = useDispatch()
    const worksDays = useSelector((state) => state.worksDay.worksDaysArray)

    return (
        <div className='cardElem cardElemOptions'>
            <IoIosClose className='cardElemDeleteImg-mobile' onClick={() => dispatch(deleteCartElem(elem))}/>
            <div><img className='imgCardElem-mobile' src={elem.img} alt="tomato"/></div>
            <div className="cardElemNameOptions">{elem.name}</div>
            <div className="cardElemPriceOptions">{(elem.marketPriceCP * elem.quantity || elem.marketPriceCP * elem.quantity < 0 ? elem.marketPriceCP * elem.quantity : 0).toFixed(2)}€</div>
            <div className='cardElemChangeOptions'><FiMinus onClick={() => dispatch(setCartElemQuantityDecrement(elem))}/><div><input type="number" onChange={(e) => dispatch(setCartElemQuantityValue({value: e.target.value, elem: elem}))} value={elem.quantity}/></div><FiPlus onClick={() => dispatch(setCartElemQuantityIncrement(elem))}/></div>
            <div className="cardElemAMPOptions"><span>AMP</span> for {worksDays.length} days</div>
            <div className='cardElemBottomSpaceOptions'></div>
        </div>
    );
};

export default CartElemOptions;