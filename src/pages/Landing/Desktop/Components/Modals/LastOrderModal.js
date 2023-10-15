import React, {useMemo, useState} from 'react';
import '../../../Mobile/Components/ModalWindow/ModalWindow.scss'
import { CgClose } from 'react-icons/cg';
import CartElem from "../Carts/CartElem/CartElem";
import ProfitElem from "./ProfitElem";

import {FiMinus, FiPlus} from "react-icons/fi";
import {setCartElemQuantityDecrement, setCartElemQuantityIncrement} from "../../../features/allCartItems";
import {
    deleteCartElem,
    setAllItemsCart,
    setCartElemQuantityValue,
    setAllArrayItemsCart
} from "../../../features/allCartItems";
import {
    setallItemsLastOrder,
    setCartElemQuantityDecrementLastOrder,
    setCartElemQuantityIncrementLastOrder,
    setCartElemQuantityValueLastOrder,
    deleteCartElemLastOrder
} from "../../../features/allItemsLastOrder";


import {
    setElemQuantityDecrement,
    setElemQuantityIncrement,
    setElemQuantityValue
} from "../../../features/allItems";
import {useDispatch, useSelector} from "react-redux";
import Search from "../Search/Search";
import CartElemDefMarket from "../Carts/CartElem/CartElemDefMarket";
import CartElemDefMarketLastOrder from "../Carts/CartElem/CartElemDefMarketLastOrder";
import CartElemMobileDefMarket from "../../../Mobile/Components/CardElem/CartElemMobileDefMarket";
import CartElemMobileDefMarketLastOrder from "../../../Mobile/Components/CardElem/CartElemMobileDefMarketLastOrder";
import ItemDefMarketLastOrderSearch from "../Login/Items/ItemDefMarketLastOrderSearch";
import {setSeeOptions} from "../../../features/seeOptions";
import { Switch } from 'antd';


const LastOrderModal = ({setLastOrderModal, currentOption}) => {
    const allItemsCart = useSelector((state) => state.allCartItems.allItemsCart)
    const allItems = useSelector((state) => state.allItems.allItems)
    const chooseOption = useSelector((state) => state.chooseOption.chooseOption)
    const chooseWeeks = useSelector((state) => state.chooseWeeks.chooseWeeks)
    const chooseMarket = useSelector((state) => state.chooseMarket.chooseMarket)
    const allItemsLastOrder = useSelector((state) => state.allItemsLastOrder.allItemsLastOrder)
    const [changeOrder, setChangeOrder] = useState(false);
    const [withoutImages, setWithoutImages] = useState(false);
    const [seeSearchItems, setSeeSearchItems] = useState(false);
    const dispatch = useDispatch()


    const search = useSelector((state) => state.search.search)

    const allItemsSearch = useMemo(() => {
        setSeeSearchItems(true)
        if(search !== ''){
            return allItems.filter((elem) => {
                try{
                    return elem.name.toLowerCase().includes(search.toLowerCase())
                }catch (e) {
                    return false
                }
            })
        }else{
            return []
        }
    }, [search, allItems])

    const handleChange = (event, elem) => {
        const newValue = event.target.value;
        // Проверяем, что введенное значение является числом
        if (!isNaN(newValue)) {
            dispatch(setCartElemQuantityValueLastOrder({value: newValue, elem: elem, chooseWeeks: chooseWeeks}))
        }
    };


    const handleMouseLeave = (event, elem) => {
        console.log('leave')
        if(true){
            dispatch(setCartElemQuantityValueLastOrder({value: elem.quantity, elem: elem, chooseWeeks: chooseWeeks}))
        }
    }

    return (
        <div className='modalFavorite'>
            <div className='profitModal' onClick={(e) => setSeeSearchItems(false)}>
                <div className='seeProfitText'>My last order
                    {changeOrder &&
                        <div className='searchLastOrder' onClick={(e) => e.stopPropagation()}>
                            <Search/>
                            <div className='openSearchLastOrderItems'>
                                {   seeSearchItems &&
                                    allItemsSearch.map((elem) => {
                                        return <ItemDefMarketLastOrderSearch elem={elem}/>
                                    })
                                }
                            </div>
                        </div>}
                    <div className='switchImages'><span>Pro Mode</span> <Switch   style={{backgroundColor: !withoutImages ? '#5FC56D' : 'grey'}}   defaultChecked onClick={() => setWithoutImages(prev => !prev)}/>
                    </div>
                    <CgClose className="closeButton" onClick={() => setLastOrderModal(false)}/>
                </div>
                <div className='profitTableElem' style={{gridTemplateColumns: changeOrder ? "1.5fr repeat(3, 1fr)" : "1.5fr repeat(2, 1fr)"}}>
                    <span className='profitProductName'>Product name</span>
                    <span className='profitOurPrice'>Price</span>
                    <span className='profitQuantity'>quantity</span>
                    {
                       changeOrder &&
                        <span className='profitQuantity'>total</span>
                    }
                </div>
                <div className="profitTable profitTableFavorite">
                    {
                        allItemsLastOrder.map((elem, index) => {
                            if(1){
                                return <div className='profitTableElem profitTableElemBorder profitTableElemLastOrder' style={{gridTemplateColumns: changeOrder ? "1.525fr repeat(3, 1fr)" : "1.525fr repeat(2, 1fr)",  height: !withoutImages ? '35px' : '76px'}}>
                                    <span className="profitProductName profitSize lastOrderNameItem">{withoutImages && <img className='imgCardElemProfit' src={elem.img} alt="tomato"/>}{elem.name}</span>
                                    <span className="profitProductMiddle profitSize">{parseFloat(parseFloat(elem.marketPriceCP).toFixed(2)) != 'NaN' ? parseFloat(parseFloat(elem.marketPriceCP).toFixed(2)) : 0}€</span>
                                    {
                                        changeOrder ?
                                            <div className='cardElemChangeDefMarketLastOrder'>
                                                <FiMinus onClick={() => {
                                                    dispatch(setCartElemQuantityDecrementLastOrder(elem))
                                                    if(elem.quantity <= 1){
                                                        dispatch(deleteCartElemLastOrder(elem))
                                                    }
                                                }}/>
                                                <div className='lastOrderInput'>
                                                    <input type="number" onChange={(e) => handleChange(e, elem)} onBlur={(e) => handleMouseLeave(e, elem)} value={elem.quantity}/>
                                                </div>
                                                <FiPlus onClick={() => {
                                                    dispatch(setCartElemQuantityIncrementLastOrder(elem))
                                                }}/>
                                            </div>
                                            :
                                            <span className='profitOurPrice profitSize'>{elem.quantity + elem.unit}</span>

                                    }
                                    {
                                        changeOrder &&
                                        <span className='profitQuantity'>{parseFloat(elem.marketPriceCP * elem.quantity).toFixed(2)}€</span>
                                    }
                                    {/*{*/}
                                    {/*    changeOrder &&*/}
                                    {/*    <span className='profitQuantity'>x</span>*/}
                                    {/*}*/}
                                </div>
                            }
                        })
                    }
                </div>
                <div className='repeatOrderButtonFlex'>
                    <div className="repeatOrderButton" onClick={() => {
                        // allItems.forEach((elem, index) => {
                        //     if(index < 4){
                        //         dispatch(setAllItemsCart(elem))
                        //         dispatch(setElemQuantityValue({value: ((index + 1) * 3), elem: elem}))
                        //     }
                        // })
                        setChangeOrder(prev => !prev)
                    }}>
                        Change Order
                    </div>
                    <div className="repeatOrderButton" onClick={() => {
                        console.log(allItemsLastOrder)
                        dispatch(setAllArrayItemsCart(allItemsLastOrder))
                        allItems.forEach((elem, index) => {
                            if(1){
                                dispatch(setElemQuantityValue({value: 0, elem: elem}))
                            }
                        })
                        allItemsLastOrder.forEach((elem, index) => {
                            if(1){
                                dispatch(setElemQuantityValue({value: elem.quantity, elem: elem}))
                            }
                        })
                        setLastOrderModal(false);
                        dispatch(setSeeOptions(true));
                    }}>
                        {!changeOrder ? 'Repeat Order' : 'Continue'} {(allItemsLastOrder.map((elem, index) => elem.marketPriceCP * elem.quantity)).reduce((acc, num) => acc + num, 0).toFixed(2) || 0}€
                    </div>
                </div>

            </div>

        </div>
    );
};

export default LastOrderModal;