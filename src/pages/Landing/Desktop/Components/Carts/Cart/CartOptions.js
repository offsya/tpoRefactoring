import React, {useState} from 'react';
import '../../../../Mobile/Components/Cart/Card.scss'
import CartElem from "../CartElem/CartElem";
import { BsFillHandbagFill } from 'react-icons/bs';
import { TbTruckDelivery } from 'react-icons/tb';

import { MdExpandMore } from 'react-icons/md';
import {useSelector, useDispatch} from "react-redux";
import {setSeeOptions} from "../../../../features/seeOptions";
import CartElemMobile from "../../../../Mobile/Components/CardElem/CartElemMobile";
import CartElemOptions from "../CartElem/CartElemOptions";
import emtpyCartImg from "../../../../../../assets/emptyCart.svg";
import CartElemDefMarket from "../CartElem/CartElemDefMarket";
import {setCartOpenModal} from "../../../../features/cartOpenModal";


const CartOptions = () => {
    const dispatch = useDispatch()
    const allItemsCart = useSelector((state) => state.allCartItems.allItemsCart)
    const allItems = useSelector((state) => state.allItems.allItems)
    const [cartOpen, setCartOpen] = useState(false)
    const chooseMarket = useSelector((state) => state.chooseMarket.chooseMarket)
    return (
        <div>
            <div>
                {/*<div className="cardOptions" style={{borderBottomRightRadius: !cartOpen ? '30px' : '0px', borderBottomLeftRadius: !cartOpen ? '30px' : '0px', background: cartOpen && 'white', boxShadow: cartOpen && "0px 4px 4px rgba(0, 0, 0, 0.25)"}} onClick={() => setCartOpen((prev) => !prev)}>*/}
                {/*    Cart*/}
                {/*    <MdExpandMore className='openCardImgOptions' style={{transform: cartOpen && "rotate(180deg)"}}/>*/}
                {/*    <div className="cardImgBackgroundOptions">*/}
                {/*        {allItemsCart.length > 0 && <div className='cartElemQuantity'>{allItemsCart.length}</div>}*/}
                {/*        <BsFillHandbagFill className="cardImg"/>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div className="optionsCardOpen" onClick={() => {dispatch(setSeeOptions(false)); dispatch(setCartOpenModal(true))}}>
                    {allItemsCart.length > 0 && <div className='cartElemQuantity'>{allItemsCart.length}</div>}
                    <TbTruckDelivery className="cardImg"/>
                </div>

            </div>
            {cartOpen &&
                <div>
                    {
                        allItemsCart.length > 0 ?
                            <div className='openCard openCardOptions'>
                                {
                                    chooseMarket == 2 ?
                                        <div>
                                            {
                                                allItemsCart.map((elem) => {
                                                    return <CartElem elem={elem}/>
                                                })
                                            }
                                        </div>
                                        :
                                        <div>
                                            {
                                                allItems.map((elem) => {
                                                    if(elem.quantity > 0 || elem.quantity === 0){
                                                        return <CartElemDefMarket elem={elem}/>
                                                    }
                                                })
                                            }
                                        </div>
                                }
                            </div>
                            :
                            <div className='openCard openCardOptions openCardEmpty'>
                                <img className='emptyCartImg' src={emtpyCartImg} alt="tomato"/>
                                <div className='emptyCartText'>
                                    cart is empty
                                </div>
                            </div>
                    }
                    {/*<div className="seeOptionsCardBackgroundOptionsCart" onClick={() => dispatch(setSeeOptions(true))}>*/}
                    {/*    <div>*/}
                    {/*        <div className='seeOptionsCardTotalMoney-mobile'>{(allItemsCart.map(elem => elem.quantity * elem.middlePrice)).reduce((acc, num) => acc + num, 0) || 0}€</div>*/}
                    {/*        <div className='seeOptionsCardTotalMoneyText-mobile'>Total market price</div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            }
        </div>

    );
};

export default CartOptions;