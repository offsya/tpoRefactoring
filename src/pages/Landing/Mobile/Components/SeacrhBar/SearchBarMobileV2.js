import React from 'react';
import './SearchBarMobileV2.scss'
import { Col, Row } from 'antd';
import Search from "../../../Desktop/Components/Search/Search";
import {useDispatch, useSelector} from "react-redux";
import SearchMobile from "./SearchMobile";
import {BsArrowLeft, BsFillHandbagFill} from 'react-icons/bs';
import { TbTruckDelivery } from 'react-icons/tb';

import { HiMenu } from 'react-icons/hi';
import { TiUserOutline } from 'react-icons/ti';
import { BiUserCircle } from 'react-icons/bi'
import MenuMobile from "../Menu/MenuMobile";
import CartMobile from "../Cart/CartMobile";
import {setSeeOptions} from "../../../features/seeOptions";



const SearchBarMobileV2 = ({setIsOpenCart, isOpenCart, setIsMobile, setRegModalOpen, setProfileOpen}) => {
    const dispatch = useDispatch();
    const seeOptions = useSelector((state) => state.seeOptions.seeOptions);
    const userAcc = useSelector((state) => state.userAcc.userAcc);

    const [isOpen, setIsOpen] = React.useState(false);
    const allItemsCart = useSelector((state) => state.allCartItems.allItemsCart)

    return (
        <div className='bodyBarSearch-mobileV2'>
            {
                isOpenCart ?
                    <div>
                        <div className="iconsAndSearch-mobileV2">
                            <div className="optionsBack-mobileV2" onClick={() => {setIsMobile(true); setIsOpenCart(false); dispatch(setSeeOptions(false))}}><BsArrowLeft className="optionsBackArrow-mobileV2"/>Back</div>
                            <div className="logoAndText-mobileV2 logoAndTextCartIsOpen-mobileV2" onClick={() => {setIsMobile(true); setIsOpenCart(false); dispatch(setSeeOptions(false))}}>
                                <div className="logo-mobileV2"></div>
                                <div className="logoText-mobileV2">Tu Producto Online</div>
                            </div>
                            <div className="iconCartBackground-mobileV2" >
                                <div className='cartIconBackgroundV2'>
                                    {allItemsCart.length > 0 && <div className='cartElemQuantityV2'>{allItemsCart.length}</div>}
                                    <TbTruckDelivery className="iconCart-mobileV2 iconCartIsOpen-mobileV2" onClick={() => {dispatch(setSeeOptions(false)); setIsOpenCart(true)}}/>

                                </div>
                                <div className='cartIconBackgroundV2' style={{marginTop:13, marginLeft:20}} >
                                    <BiUserCircle className="iconCart-mobileV2 userProfile-mobileV2" onClick={() => {setRegModalOpen(true); if(userAcc.phone)setProfileOpen(true);setIsOpenCart(false)}}/>
                                </div>

                            </div>
                        </div>
                        {
                            isOpen && <MenuMobile setProfileOpen={setProfileOpen} setIsOpenCart={setIsOpenCart} setIsOpen={setIsOpen}/>
                        }
                    </div>
                    :
                    <div>
                        <div className="BodybarWithOutSearch-mobileV2">

                            <div className="iconsAndSearch-mobileV2">
                                <HiMenu href="#" className="menu-btnV2" onClick={() => setIsOpen((prev) => !prev)} className='iconMenu-mobileV2'/>
                                {/*<SearchMobile/>*/}
                                <div className="logoAndText-mobileV2">
                                    <div className="logo-mobileV2">
                                    </div>
                                    <div className="logoText-mobileV2">Tu Producto Online</div>
                                </div>
                                <div className='cartIconBackgroundV2'>
                                    {allItemsCart.length > 0 && <div className='cartElemQuantityV2'>{allItemsCart.length}</div>}
                                    <TbTruckDelivery className="iconCart-mobileV2" onClick={() => setIsOpenCart((prev) => !prev)}/>
                                </div>
                                <div className='cartIconBackgroundV2'>
                                    <BiUserCircle className="iconCart-mobileV2 userProfile-mobileV2" onClick={() => {setRegModalOpen(true); if(userAcc.phone)setProfileOpen(true)}}/>
                                </div>
                            </div>
                            {
                                isOpen && <MenuMobile  setProfileOpen={setProfileOpen} isOpen={isOpen} setIsOpenCart={setIsOpenCart} setIsOpen={setIsOpen}/>
                            }
                        </div>
                    </div>
            }

        </div>
    );
};

export default SearchBarMobileV2;