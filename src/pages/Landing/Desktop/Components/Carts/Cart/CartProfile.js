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


const Cart = ({setSeeCalend, seeCalend}) => {
    const dispatch = useDispatch()
    const allItemsCart = useSelector((state) => state.allCartItems.allItemsCart)
    return (
        <div>
            <div>
                <div className="card" onClick={() => dispatch(setCalendOpen((prev) => !prev))}>
                    <div className="cardImgBackground">
                        {allItemsCart.length > 0 && <div className='cartElemQuantity'>{allItemsCart.length}</div>}
                        <TbTruckDelivery className="cardImg"/>
                    </div>
                    <div>Cart</div>
                    <div className='openCardImg' style={{opacity: '1'}}>All the Rates below are the <span>Average Market Price (AMP)</span></div>

                </div>
            </div>
            <div>
                {
                    allItemsCart.length > 0 ?
                    <div className='openCard cardProfile'>
                        {
                            allItemsCart.map((elem) => {
                                return <CartElem elem={elem}/>
                            })
                        }
                    </div>
                        :
                    <div className='openCard openCardEmpty cardProfile'>
                        <img className='emptyCartImg' src={emtpyCartImg} alt="tomato"/>
                        <div className='emptyCartText'>
                            cart is empty
                        </div>
                    </div>
                }
                {/*<div className="seeOptionsCardBackground" onClick={() => dispatch(setSeeOptions(true))}>*/}
                {/*    <div className="seeOptionsCard">See Options</div>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default Cart;