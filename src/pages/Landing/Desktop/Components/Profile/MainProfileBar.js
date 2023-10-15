import React, {useEffect, useState} from 'react';
import ItemsCard from "../Login/Items/ItemsCard";
import tomato from '../../../../../assets/tomato.svg'
import corn from '../../../../../assets/corn.svg'
import chili from '../../../../../assets/chili.svg'
import avocado from '../../../../../assets/avocado.svg'
import Cart from "../Carts/Cart/Cart";
import Calend from "../Calendar/Calend";
import {useDispatch, useSelector} from "react-redux";
import CalendModal from "../Calendar/CalendModal";
import '../BodyComponents/ProfileBar.scss'
import PersonalDataProfile from "./PersonalDataProfile";
import CartProfile from "../Carts/Cart/CartProfile";
import HistoryOrdersProfile from "./HistoryOrdersProfile";
import TotalProfitProfile from "./TotalProfitProfile";
import CartDefMarket from "../Carts/Cart/CartDefMarket";
import axios from "axios";
import {addAllOrders} from "../../../../Admin/features/allOrders";

const MainBar = () => {

    const current = useSelector((state) => state.menu.currentMenuButton)

    const dispatch = useDispatch()
    const seeCalend = useSelector((state) => state.calendOpen.calendOpen)
    const allItemsCart = useSelector((state) => state.allCartItems.allItemsCart)
    const check = useSelector((state) => state.checkFrstCalendOpen.checkFrstCalendOpen)
    const userAcc = useSelector((state) => state.userAcc.userAcc)
    React.useEffect(() => {
        axios.get('https://tpomobi.shop/getOrdersAdmin').then((resp) => {
            dispatch(addAllOrders(resp.data.reverse()));
        });
    }, [])
    return (
        <div className='mainBarProfile'>
            <div className='profileCardBar'>
                {
                 current == 5 && <PersonalDataProfile/>
                }
                {
                    current == 6 && <HistoryOrdersProfile/>
                }
                {
                    current == 7 && <TotalProfitProfile/>
                }
                <div className='itemsCart'>
                    {/*{ (seeCalend || (check && allItemsCart.length != 0)) && <CalendModal/> }*/}
                    {/*<CartProfile/>*/}
                    <CartDefMarket/>
                </div>

         </div>
        </div>
    );
};

export default MainBar;