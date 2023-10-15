import React, {useEffect} from 'react';
import {FiMinus, FiPlus} from "react-icons/fi";
import {
    setCartElemQuantityDecrement,
    setCartElemQuantityIncrement,
    setCartElemQuantityValue
} from "../../../features/allCartItems";
import {useDispatch, useSelector} from "react-redux";

const ProfitElem = ({elem}) => {
    const dispatch = useDispatch();
    const chooseOption = useSelector((state) => state.chooseOption.chooseOption)
    const chooseWeeks = useSelector((state) => state.chooseWeeks.chooseWeeks)
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
        <div className='profitTableElem profitTableElemBorder'>
            <span className="profitProductName profitSize"><img className='imgCardElemProfit' src={elem.img} alt="tomato"/>{elem.name}</span>
            <span className="profitProductMiddle profitSize">{parseFloat(parseFloat(elem.marketPriceCP).toFixed(2)) != 'NaN' ? parseFloat(parseFloat(elem.marketPriceCP).toFixed(2)) : 0}€</span>
            <span className='profitOurPrice profitSize'>{(elem.ourPriceCP * (chooseOption == 1 ? elem.MB : elem.DP) / 100 + elem.ourPriceCP).toFixed(2)}€</span>
            <div className='cardElemChange'><FiMinus onClick={() =>
            {
                if((chooseWeeks != 3 ? chooseWeeks != 1 ? 4.5 : 2 : 1) * parseFloat(elem.minQt) < parseFloat(elem.quantity)){
                    dispatch(setCartElemQuantityDecrement(elem))
                }
            }}/><div><input type="number"  onChange={handleChange} onBlur={handleMouseLeave} value={elem.quantity}/></div><FiPlus onClick={() => dispatch(setCartElemQuantityIncrement(elem))}/></div>
            <span className='profitProfit profitSize'>{((elem.marketPriceCP - (elem.ourPriceCP * (chooseOption == 1 ? elem.MB : elem.DP) / 100 + elem.ourPriceCP)) * elem.quantity).toFixed(2)}€</span>
        </div>
    );
};

export default ProfitElem;