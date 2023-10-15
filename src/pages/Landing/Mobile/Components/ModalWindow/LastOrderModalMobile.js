import React, {useMemo, useState} from 'react';
import './ModalWindow.scss'
import { CgClose } from 'react-icons/cg';
import CartElem from "../../../Desktop/Components/Carts/CartElem/CartElem";
import ProfitElem from "../../../Desktop/Components/Modals/ProfitElem";

import {FiMinus, FiPlus} from "react-icons/fi";
import {
    setAllArrayItemsCart,
    setCartElemQuantityDecrement,
    setCartElemQuantityIncrement
} from "../../../features/allCartItems";
import {
    deleteCartElem,
    setAllItemsCart,
    setCartElemQuantityValue
} from "../../../features/allCartItems";

import {
    setElemQuantityDecrement,
    setElemQuantityIncrement,
    setElemQuantityValue
} from "../../../features/allItems";
import {useDispatch, useSelector} from "react-redux";
import {setSeeOptions} from "../../../features/seeOptions";
import {
    deleteCartElemLastOrder,
    setCartElemQuantityDecrementLastOrder, setCartElemQuantityIncrementLastOrder,
    setCartElemQuantityValueLastOrder
} from "../../../features/allItemsLastOrder";
import {Switch} from "antd";
import Search from "../../../Desktop/Components/Search/Search";
import ItemDefMarketLastOrderSearch from "../../../Desktop/Components/Login/Items/ItemDefMarketLastOrderSearch";
import SearchMobile from "../SeacrhBar/SearchMobile";


const LastOrderModalMobile = ({setLastOrderModal, currentOption, setIsOpen, setIsOpenCart}) => {
    const allItemsCart = useSelector((state) => state.allCartItems.allItemsCart)
    const allItems = useSelector((state) => state.allItems.allItems)
    const chooseOption = useSelector((state) => state.chooseOption.chooseOption)
    const seeOptions = useSelector((state) => state.seeOptions.seeOptions)
    const chooseWeeks = useSelector((state) => state.chooseWeeks.chooseWeeks)
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
            <div className='profitModal profitModalFavorite-mobile' onClick={(e) => setSeeSearchItems(false)}>
                <div className='seeProfitText'>My last order

                    <CgClose className="closeButton" onClick={() => setLastOrderModal(false)}/>
                </div>
                <div className='seeProfitText'>
                    {changeOrder &&
                        <div className='searchLastOrder-mobile' onClick={(e) => e.stopPropagation()}>
                            <SearchMobile/>
                            <div className='openSearchLastOrderItems-mobile'>
                                {   seeSearchItems &&
                                    allItemsSearch.map((elem) => {
                                        return <ItemDefMarketLastOrderSearch elem={elem}/>
                                    })
                                }
                            </div>
                        </div>}
                    <div className='switchImages switchImages-mobile'><span>Pro Mode</span> <Switch   style={{backgroundColor: !withoutImages ? '#5FC56D' : 'grey'}}   defaultChecked onClick={() => setWithoutImages(prev => !prev)}/>
                    </div>
                </div>


                <div className='profitTableElem profitTableElemLastOrder profitTableElemLastOrder-mobile' style={{gridTemplateColumns: changeOrder ? "1.525fr repeat(3, 1fr)" : "1.525fr repeat(2, 1fr)"}}>
                    <span className='profitProductName'>Product name</span>
                    <span className='profitOurPrice'>Price</span>
                    <span className='profitQuantity'>quantity</span>
                    {
                        changeOrder &&
                        <span className='profitQuantity'>total</span>
                    }
                </div>
                <div className="profitTable profitTableFavorite profitTableFavorite-mobile">
                    {
                        allItemsLastOrder.map((elem, index) => {
                            if(1){
                                return <div className='profitTableElem profitTableElemBorder profitTableElemLastOrder' style={{gridTemplateColumns: changeOrder ? "1.525fr repeat(3, 1fr)" : "1.525fr repeat(2, 1fr)",  height: !withoutImages ? 'auto' : '76px'}}>
                                    <span className="profitProductName profitSize lastOrderNameItem profitSize-mob" style={{marginLeft: withoutImages && '-20px'}}>{withoutImages && <img className='imgCardElemProfit' src={elem.img} alt="tomato"/>}{elem.name}</span>
                                    <span className="profitProductMiddle profitSize profitSize-mob">{parseFloat(parseFloat(elem.marketPriceCP).toFixed(2)) != 'NaN' ? parseFloat(parseFloat(elem.marketPriceCP).toFixed(2)) : 0}€</span>
                                    {
                                        changeOrder ?
                                            <div className='cardElemChangeDefMarketLastOrder-mobile'>
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
                                            <span className='profitOurPrice profitSize profitSize-mob'>{elem.quantity + elem.unit}</span>

                                    }
                                    {
                                        changeOrder &&
                                        <span className='profitQuantity profitSize-mob'>{parseFloat(elem.marketPriceCP * elem.quantity).toFixed(2)}€</span>
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
                    <div className="repeatOrderButton-mobile" onClick={() => {
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
                    <div className="repeatOrderButton-mobile" onClick={() => {
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
                        setIsOpenCart(true);
                        setIsOpen(false);
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

export default LastOrderModalMobile;