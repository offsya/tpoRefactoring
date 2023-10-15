import React, {useEffect, useMemo, useState} from 'react';
import '../../../Mobile/Components/ModalWindow/ModalWindow.scss'
import { CgClose } from 'react-icons/cg';

import {FiMinus, FiPlus} from "react-icons/fi";
import {
    setCartElemCurrentUnit,
    setCartElemQuantityDecrement,
    setCartElemQuantityIncrement
} from "../../../features/allCartItems";
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
    setElemCurrentUnit,
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
import {setCartOpenModal} from "../../../features/cartOpenModal";
import {Select, Switch} from 'antd';
import ItemDefMarketCardOpenSearch from "../Login/Items/ItemDefMarketCardOpenSearch";


const OpenCartModal = ({dispatcdh, currentOption}) => {
    const allItemsCart = useSelector((state) => state.allCartItems.allItemsCart)
    const allItems = useSelector((state) => state.allItems.allItems)
    const allItemsLastOrder = useSelector((state) => state.allItemsLastOrder.allItemsLastOrder)
    const chooseOption = useSelector((state) => state.chooseOption.chooseOption)
    const chooseWeeks = useSelector((state) => state.chooseWeeks.chooseWeeks)
    const cartOpenModal = useSelector((state) => state.cartOpenModal.cartOpenModal)
    const chooseMarket = useSelector((state) => state.chooseMarket.chooseMarket)
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
            dispatch(setCartElemQuantityValue({value: newValue, elem: elem, chooseWeeks: chooseWeeks}))
            dispatch(setElemQuantityValue({value: newValue, elem: elem, chooseWeeks: chooseWeeks}))
        }



    };


    const handleMouseLeave = (event, elem) => {
        console.log('leave')
        if(true){
            dispatch(setCartElemQuantityValue({value: elem.quantity, elem: elem, chooseWeeks: chooseWeeks}))
            dispatch(setElemQuantityValue({value: elem.quantity, elem: elem, chooseWeeks: chooseWeeks}))
        }

        if(chooseMarket == 2){
            if(parseFloat(elem.quantity) < parseFloat(elem.minQt) * (chooseWeeks != 3 ? chooseWeeks != 1 ? 4.5 : 2 : 1)){
                dispatch(setCartElemQuantityValue({value: elem.minQt * (chooseWeeks != 3 ? chooseWeeks != 1 ? 4.5 : 2 : 1), elem: elem, chooseWeeks: chooseWeeks}))
            }
        }
    }
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
    const handleChangeCurrentUnit = (newUnit,elem) => {
        console.log(newUnit)
        const newValue = newUnit
        if (isNaN(newValue)) {
            dispatch(setCartElemCurrentUnit({value: newValue, elem: elem, chooseWeeks: chooseWeeks}))

            dispatch(setElemCurrentUnit({value: newValue, elem: elem, chooseWeeks: chooseWeeks}))
        }
    };
    return (
        <div className='modalFavorite'>
            <div className='profitModal' onClick={(e) => setSeeSearchItems(false)}>
                <div className='seeProfitText'>My Cart
                    {true &&
                        <div className='searchLastOrder' onClick={(e) => e.stopPropagation()}>
                            <Search/>
                            <div className='openSearchLastOrderItems'>
                                {   false && //seeSearchItems
                                    allItemsSearch.map((elem) => {
                                        return <ItemDefMarketCardOpenSearch elem={elem}/>
                                    })
                                }
                            </div>
                        </div>}
                    <div className='switchImages'><span>Pro Mode</span> <Switch style={{backgroundColor: !withoutImages ? '#5FC56D' : 'grey'}}   defaultChecked onClick={() => setWithoutImages(prev => !prev)}/>
                    </div>
                    <CgClose className="closeButton" onClick={() => dispatch(setCartOpenModal(false))}/>
                </div>
                <div className='profitTableElem' style={{gridTemplateColumns: true ? "1.5fr repeat(3, 1fr)" : "1.5fr repeat(2, 1fr)"}}>
                    <span className='profitProductName'>Product name</span>
                    <span className='profitOurPrice'>Price</span>
                    <span className='profitQuantity'>quantity</span>
                    {
                       true &&
                        <span className='profitQuantity'>total</span>
                    }
                </div>
                <div className="profitTable profitTableFavorite">
                    {
                        chooseMarket == 1 ?
                            allItemsCart.map((elem, index) => {
                                if(elem.quantity > -1 || elem.quantity === ''){
                                    return <div className='profitTableElem profitTableElemBorder profitTableElemLastOrder' style={{gridTemplateColumns: true ? "1.525fr repeat(3, 1fr)" : "1.525fr repeat(2, 1fr)",  height: !withoutImages ? '35px' : '76px'}}>
                                        <span className="profitProductName profitSize lastOrderNameItem">{withoutImages && <img className='imgCardElemProfit' src={elem.img} alt="tomato"/>}{elem.name}</span>
                                        <span className="profitProductMiddle profitSize">{elem.marketPriceCP}€</span>
                                        {
                                            true ?
                                                <div className='cardElemChangeDefMarketLastOrder'>
                                                    <FiMinus style={{marginLeft:"10px"}} onClick={() => {
                                                        dispatch(setCartElemQuantityDecrement(elem))
                                                        dispatch(setElemQuantityDecrement(elem))
                                                        if(elem.quantity == 1 || parseInt(elem.quantity) == 0){
                                                            dispatch(deleteCartElem(elem))
                                                        }
                                                    }}/>
                                                    <div className='lastOrderInput'>
                                                        {/*<input type="number" onChange={(e) => handleChange(e, elem)} onBlur={(e) => handleMouseLeave(e, elem)} value={allItems.filter((items) => items._id === elem._id)[0].quantity}/>*/}
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
                                                                            onChange={(newUnit)=>handleChangeCurrentUnit(newUnit,elem)}
                                                                            value={elem?.currentUnit || OptionsList(elem)[0] }
                                                                            options={OptionsList(elem)}
                                                                        />}
                                                                    </div>
                                                                    :
                                                                    <div style={{alignItems:"center"}}>{elem.unit}</div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <FiPlus style={{marginRight:"10px"}} onClick={() => {
                                                        dispatch(setCartElemQuantityIncrement(elem))
                                                        dispatch(setElemQuantityIncrement(elem))
                                                    }}/>
                                                </div>
                                                :
                                                <span className='profitOurPrice profitSize'>{elem.quantity + elem.unit}</span>

                                        }
                                        {
                                            true &&
                                            <span className='profitQuantity'>{parseFloat(elem.marketPriceCP * elem.quantity).toFixed(2)}€</span>
                                        }
                                        {/*{*/}
                                        {/*    true &&*/}
                                        {/*    <span className='profitQuantity'>x</span>*/}
                                        {/*}*/}
                                    </div>
                                }
                            })
                            :
                            allItemsCart.map((elem, index) => {
                                if(1){
                                    return <div className='profitTableElem profitTableElemBorder profitTableElemLastOrder' style={{gridTemplateColumns: true ? "1.525fr repeat(3, 1fr)" : "1.525fr repeat(2, 1fr)",  height: !withoutImages ? '35px' : '76px'}}>
                                        <span className="profitProductName profitSize lastOrderNameItem">{withoutImages && <img className='imgCardElemProfit' src={elem.img} alt="tomato"/>}{elem.name}</span>
                                        <span className="profitProductMiddle profitSize">{elem.marketPriceCP}€</span>
                                        {
                                            true ?
                                                <div className='cardElemChangeDefMarketLastOrder'>
                                                    <FiMinus onClick={() => {
                                                        if((chooseWeeks != 3 ? chooseWeeks != 1 ? 4.5 : 2 : 1) * parseFloat(elem.minQt) < parseFloat(elem.quantity)){
                                                            dispatch(setCartElemQuantityDecrement(elem))
                                                        }
                                                    }}/>
                                                    <div className='lastOrderInput'>
                                                        <input type="number" onChange={(e) => handleChange(e, elem)} onBlur={(e) => handleMouseLeave(e, elem)} value={elem.quantity}/>
                                                    </div>
                                                    <FiPlus onClick={() => {
                                                        dispatch(setCartElemQuantityIncrement(elem))
                                                    }}/>
                                                </div>
                                                :
                                                <span className='profitOurPrice profitSize'>{elem.quantity + elem.unit}</span>

                                        }
                                        {
                                            true &&
                                            <span className='profitQuantity'>{parseFloat(elem.marketPriceCP * elem.quantity).toFixed(2)}€</span>
                                        }
                                        {/*{*/}
                                        {/*    true &&*/}
                                        {/*    <span className='profitQuantity'>x</span>*/}
                                        {/*}*/}
                                    </div>
                                }
                            })
                    }
                </div>
                <div className='repeatOrderButtonFlex'>
                    {chooseMarket == 1 ?
                        <div className="repeatOrderButton" onClick={() => {
                            dispatch(setCartOpenModal(false))
                            dispatch(setSeeOptions(true));
                        }}>

                            Pay {(allItems.map(elem => {if(elem.quantity > 0){
                            return elem.quantity * elem.marketPriceCP
                        }else{return 0}})).reduce((acc, num) => acc + num, 0).toFixed(2) || 0}€

                        </div>

                        :

                        <div className="repeatOrderButton" onClick={() => {
                            dispatch(setCartOpenModal(false))
                            dispatch(setSeeOptions(true));
                        }}>
                            See Options
                        </div>
                    }
                </div>

            </div>

        </div>
    );
};

export default OpenCartModal;