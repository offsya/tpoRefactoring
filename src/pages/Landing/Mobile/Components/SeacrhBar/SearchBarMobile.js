import React from 'react';
import './SearchBar.scss'
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



const SearchBarMobile = ({setIsOpenCart, isOpenCart, setIsMobile, setRegModalOpen, setProfileOpen}) => {
    const dispatch = useDispatch();
    const seeOptions = useSelector((state) => state.seeOptions.seeOptions);
    const userAcc = useSelector((state) => state.userAcc.userAcc);

    const [isOpen, setIsOpen] = React.useState(false);
    const allItemsCart = useSelector((state) => state.allCartItems.allItemsCart)

    return (
        <div className='bodyBarSearch-mobile'>
            {
                isOpenCart ?
                    <div>
                        <div className="iconsAndSearch-mobile">
                            <div className="optionsBack-mobile" onClick={() => {setIsMobile(true); setIsOpenCart(false); dispatch(setSeeOptions(false))}}><BsArrowLeft className="optionsBackArrow-mobile"/>Back</div>
                            <div className="logoAndText-mobile logoAndTextCartIsOpen-mobile" onClick={() => {setIsMobile(true); setIsOpenCart(false); dispatch(setSeeOptions(false))}}>
                                <div className="logo-mobile"></div>
                                <div className="logoText-mobile">Tu Producto Online</div>
                            </div>
                            <div className="iconCartBackground-mobile" >
                                <div className='cartIconBackground'>
                                    {allItemsCart.length > 0 && <div className='cartElemQuantity'>{allItemsCart.length}</div>}
                                    <TbTruckDelivery className="iconCart-mobile iconCartIsOpen-mobile" onClick={() => {dispatch(setSeeOptions(false)); setIsOpenCart(true)}}/>

                                </div>
                                <div className='cartIconBackground'style={{marginTop:13, marginLeft:20}} >
                                    <BiUserCircle className="iconCart-mobile userProfile-mobile" onClick={() => {setRegModalOpen(true); if(userAcc.phone)setProfileOpen(true);setIsOpenCart(false)}}/>
                                </div>

                            </div>
                        </div>
                        {
                            isOpen && <MenuMobile setProfileOpen={setProfileOpen} setIsOpenCart={setIsOpenCart} setIsOpen={setIsOpen}/>
                        }
                    </div>
                    :
                    <div>
                        <div className="logoAndText-mobile">
                            <div className="logo-mobile">
                            </div>
                            <div className="logoText-mobile">Tu Producto Online</div>
                        </div>
                        <div className="iconsAndSearch-mobile">
                            <HiMenu href="#" className="menu-btn" onClick={() => setIsOpen((prev) => !prev)} className='iconMenu-mobile'/>
                            <SearchMobile/>
                            <div className='cartIconBackground'>
                                {allItemsCart.length > 0 && <div className='cartElemQuantity'>{allItemsCart.length}</div>}
                                <TbTruckDelivery className="iconCart-mobile" onClick={() => setIsOpenCart((prev) => !prev)}/>
                            </div>
                            <div className='cartIconBackground'>
                                <BiUserCircle className="iconCart-mobile userProfile-mobile" onClick={() => {setRegModalOpen(true); if(userAcc.phone)setProfileOpen(true)}}/>
                            </div>
                        </div>
                        {
                            isOpen && <MenuMobile  setProfileOpen={setProfileOpen} isOpen={isOpen} setIsOpenCart={setIsOpenCart} setIsOpen={setIsOpen}/>
                        }
                    </div>
            }

        </div>
    );
};

export default SearchBarMobile;