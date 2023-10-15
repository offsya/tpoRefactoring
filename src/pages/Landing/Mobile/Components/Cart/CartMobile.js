import React, {useState} from 'react';
import './Card.scss'
import CartElem from "../../../Desktop/Components/Carts/CartElem/CartElem";
import { BsFillHandbagFill } from 'react-icons/bs';
import { TbTruckDelivery } from 'react-icons/tb';

import { MdExpandMore } from 'react-icons/md';
import {useSelector, useDispatch} from "react-redux";
import {setSeeOptions} from "../../../features/seeOptions";
import CartElemMobile from "../CardElem/CartElemMobile";
import CalendModal from "../../../Desktop/Components/Calendar/CalendModal";
import emtpyCartImg from "../../../../../assets/emptyCart.svg";
import CalendModalMobile from "../ModalWindow/CalendModalMobile";
import CartElemDefMarket from "../../../Desktop/Components/Carts/CartElem/CartElemDefMarket";
import CartElemMobileDefMarket from "../CardElem/CartElemMobileDefMarket";
import {Switch} from "antd";
import LastOrderModalMobile from "../ModalWindow/LastOrderModalMobile";
import LastOrderModalMobileForCart from "../ModalWindow/LastOrderModalMobileForCart";
import PhoneNumberModalWindowMobile from "./PhoneNumber/PhoneNumberModalWindowMobile";
const tg = window.Telegram.WebApp


const CartMobile = ({setRegModalOpen}) => {
    const dispatch = useDispatch()
    const chooseMarket = useSelector((state) => state.chooseMarket.chooseMarket)

    const seeCalend = useSelector((state) => state.calendOpen.calendOpen)
    const allItemsCart = useSelector((state) => state.allCartItems.allItemsCart)
    const allItems = useSelector((state) => state.allItems.allItems)
    const userAcc = useSelector((state) => state.userAcc.userAcc)

    const check = useSelector((state) => state.checkFrstCalendOpen.checkFrstCalendOpen)
    const [withoutImages, setWithoutImages] = useState(false)
    const [proMod, setProMod] = useState(false)
    const [addPhoneNumber, setAddPhoneNumber] = useState(false)

    return (
        <div>
            <div>
                <div className='switchImages switchMode-mobile'><span>Pro Mode (W/O Photo)</span> <Switch  style={{backgroundColor: !proMod ? '#5FC56D' : 'grey'}}   defaultChecked onClick={() => setProMod(prev => !prev)}/>
                </div>
                <div>{
                    allItemsCart.length >= 0 ?
                    <div className='openCard-mobile'>
                        {
                            chooseMarket == 2 ?
                                <div>
                                    {
                                        allItemsCart.map((elem) => {
                                            return <CartElemMobile proMod={proMod} elem={elem}/>
                                        })
                                    }
                                </div>
                                :
                                <div>
                                    {
                                        allItemsCart.map((elem) => {
                                            if(elem.quantity > -1 || elem.quantity === ''){
                                                return <CartElemMobileDefMarket proMod={proMod} elem={elem}/>
                                            }
                                        })
                                    }
                                </div>
                        }
                    </div>
                    :
                    <div className='openCard-mobile openCardEmpty'>
                        <img className='emptyCartImg' src={emtpyCartImg} alt="tomato"/>
                        <div className='emptyCartText'>
                            cart is empty
                        </div>
                    </div>
                    }
                </div>
            </div>
            <div className="seeOptionsCardBackground-mobile" onClick={() =>
                {
                    // setAddPhoneNumber(true)

                    if(userAcc.phone){
                        dispatch(setSeeOptions(true))
                    }else if(tg.initDataUnsafe.user){
                        setAddPhoneNumber(true)
                    }else{
                        setRegModalOpen(true)
                    }

                }
            }>
                <div>
                    {
                        chooseMarket == 2 ?
                            <div className='seeOptionsCardTotalMoney-mobile'>

                                {(allItemsCart.map(elem => {if(elem.quantity > 0){
                                    return elem.quantity * elem.marketPriceCP
                                }else{return 0}})).reduce((acc, num) => acc + num, 0).toFixed(2) || 0}€

                            </div>
                            :
                        <div className='seeOptionsCardTotalMoney-mobile'>

                                {(allItems.map(elem => {if(elem.quantity > 0){
                                    return elem.quantity * elem.marketPriceCP
                                }else{return 0}})).reduce((acc, num) => acc + num, 0).toFixed(2) || 0}€

                            </div>


                    }
                <div className='seeOptionsCardTotalMoneyText-mobile'>Total market price</div>
                </div>
                <div className="seeOptionsCard-mobile">Continue</div>
            </div>
            {addPhoneNumber &&
                <div style={{position: 'absolute', width: '100%', height: '100%', background: 'none', top: '0px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

                    <div>
                        <PhoneNumberModalWindowMobile active={addPhoneNumber} setAddPhoneNumber={setAddPhoneNumber}/>

                    </div>
                </div>
            }

            {(chooseMarket == 2 && (seeCalend || (check && allItemsCart.length != 0))) && <CalendModalMobile/> }
        </div>
    );
};

export default CartMobile;