import React from 'react';
import '../../../../Mobile/Components/Cart/Card.scss'
import CartElem from "../CartElem/CartElem";
import { BsFillHandbagFill } from 'react-icons/bs';
import { TbTruckDelivery } from 'react-icons/tb';

import { MdExpandMore } from 'react-icons/md';
import {useSelector, useDispatch} from "react-redux";
import {setSeeOptions} from "../../../../features/seeOptions";
import {setCalendOpen} from "../../../../features/calendOpen";
import emtpyCartImg from "../../../../../../assets/emptyCart.svg"
import CartElemDefMarket from "../CartElem/CartElemDefMarket";

const CartDefMarket = ({setSeeCalend, seeCalend}) => {
    const dispatch = useDispatch()
    const allItemsCart = useSelector((state) => state.allCartItems.allItemsCart)
    const allItems = useSelector((state) => state.allItems.allItems)
    const chooseMarket = useSelector((state) => state.chooseMarket.chooseMarket)
    return (
        <div>
            <div>
                <div className="card" onClick={() => dispatch(setCalendOpen((prev) => !prev))}>
                    <div className="cardImgBackground">
                        {allItemsCart.length > 0 && <div className='cartElemQuantity'>{allItemsCart.length}</div>}
                        <TbTruckDelivery className="cardImg"/>
                    </div>
                    <div>Cart</div>
                    <div className='openCardImg' style={{opacity: '0'}}>All the Rates below are the <span>Average Market Price (AMP)</span></div>

                </div>
            </div>
            <div>
                {
                    allItemsCart.length > 0 ?
                    <div className='openCard'>
                        {
                            allItemsCart.map((elem) => {
                                if(elem.quantity > -1 || elem.quantity === ''){
                                    return <CartElemDefMarket elem={elem}/>
                                }
                            })
                        }
                    </div>
                        :
                    <div className='openCard openCardEmpty'>
                        <img className='emptyCartImg' src={emtpyCartImg} alt="tomato"/>
                        <div className='emptyCartText'>
                            cart is empty
                        </div>
                    </div>
                }
                {allItemsCart.length > 0 &&
                <div className="seeOptionsCardBackground" onClick={() => dispatch(setSeeOptions(true))}>
                    <div className="seeOptionsCard">Continue {(allItems.map(elem => {if(elem.quantity > 0){
                        return elem.quantity * elem.marketPriceCP
                    }else{return 0}})).reduce((acc, num) => acc + num, 0).toFixed(2) || 0}€</div>
                </div>
                }
            </div>
        </div>
    );
};

export default CartDefMarket;