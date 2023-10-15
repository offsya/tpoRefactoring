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
import {setElemQuantityDecrement, setElemQuantityIncrement} from "../../../features/allItems";

const CartElemMobile = ({elem, proMod}) => {
    const dispatch = useDispatch()
    const chooseWeeks = useSelector((state) => state.chooseWeeks.chooseWeeks)
    const worksDays = useSelector((state) => state.worksDay.worksDaysArray)
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
        <div className='cardElem cardElemMobile' style={{gridTemplateColumns: "1.525fr repeat(3, 1fr)",  height: proMod && 'auto', paddingTop: proMod && '0px'}}>
            {proMod ?
                <div>
                    <div className='profitTableElem profitTableElemBorder profitTableElemLastOrder' style={{gridTemplateColumns: "1.525fr repeat(3, 1fr)",  height: 'auto'}}>
                        <span className="profitProductName profitSize lastOrderNameItem profitSize-mob" style={{marginLeft: '0px'}}>{false&& <img className='imgCardElemProfit' src={elem.img} alt="tomato"/>}{elem.name}</span>
                        <span className="profitProductMiddle profitSize profitSize-mob">{elem.marketPriceCP}€</span>
                        {
                            true ?
                                <div className='cardElemChangeDefMarketLastOrder-mobile'>
                                    <FiMinus onClick={() => {
                                        if((chooseWeeks != 3 ? chooseWeeks != 1 ? 4.5 : 2 : 1) * parseFloat(elem.minQt) < parseFloat(elem.quantity)){
                                            dispatch(setCartElemQuantityDecrement(elem))
                                        }
                                    }}/>
                                    <div className='lastOrderInput'>
                                        <input style={{borderRight: '1px solid gray'}} type="number"
                                               onChange={handleChange} onBlur={handleMouseLeave} value={elem.quantity}/>
                                    </div>
                                    <FiPlus onClick={() => {
                                        dispatch(setCartElemQuantityIncrement(elem))
                                    }}/>
                                </div>
                                :
                                <span className='profitOurPrice profitSize profitSize-mob'>{elem.quantity + elem.unit}</span>

                        }
                        {
                            true &&
                            <span className='profitQuantity profitSize-mob'>{parseFloat(elem.marketPriceCP * elem.quantity).toFixed(2)}€</span>
                        }
                        {/*{*/}
                        {/*    changeOrder &&*/}
                        {/*    <span className='profitQuantity'>x</span>*/}
                        {/*}*/}
                    </div>
                </div>
                :
                <div>
            <IoIosClose className='cardElemDeleteImg-mobile' onClick={() => dispatch(deleteCartElem(elem))}/>
            <div><img className='imgCardElem-mobile' src={elem.img} alt="tomato"/></div>
            <div className="cardElemName-mobile">{elem.name}</div>
            <div className="cardElemPrice-mobile">{(elem.marketPriceCP * elem.quantity || elem.marketPriceCP * elem.quantity < 0 ? elem.marketPriceCP * elem.quantity : 0).toFixed(2)}€</div>
            <div className='cardElemChange-mobile'>
                <FiMinus onClick={() =>
            {
                if((chooseWeeks != 3 ? chooseWeeks != 1 ? 4.5 : 2 : 1) * parseFloat(elem.minQt) < parseFloat(elem.quantity)){
                    dispatch(setCartElemQuantityDecrement(elem))
                }
            }}/>
                <div>
                <input style={{borderRight: '1px solid gray'}} type="number" onChange={handleChange} onBlur={handleMouseLeave} value={elem.quantity}/>
                </div>
                <FiPlus onClick={() => dispatch(setCartElemQuantityIncrement(elem))}/>
            </div>
            <div className="cardElemAMP-mobile"><span>AMP</span> for {worksDays.length} days</div>
            <div className='cardElemBottomSpace-mobile'></div>
                 </div>
            }
        </div>
    );
};

export default CartElemMobile;