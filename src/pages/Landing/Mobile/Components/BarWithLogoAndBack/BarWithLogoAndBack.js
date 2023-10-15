import React, {useState} from 'react';
import './BarWithLogoAndBack.scss'
import {setSeeOptions} from "../../../features/seeOptions";
import {BsArrowLeft} from "react-icons/bs";
import {useDispatch} from "react-redux";
import {HiMenu} from "react-icons/hi";


const BarWithLogoAndBack = ( { setIsMobile, isOpenCart, setIsOpenCart, setOrdersMobile, setPersonalDataMobile, setSideMenuMobile}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [signInOpen, setSignInOpen] = useState(true);
    const [regOpen, setRegInOpen] = useState(false);
    const [createOpen, setCreateInOpen] = useState(false);
    const dispatch = useDispatch()


    return (
        <div className="BarWithLogoAndBack">
            <div className="logoRow">
                <div className="ProfileMobileUpperRow">

                    <div className="iconMenu-mobilediv" onClick={() => {setSideMenuMobile(true)
                        setPersonalDataMobile(false)
                        setOrdersMobile(false)}}><HiMenu className='iconMenu-mobile'/></div>
                    <div className="ProfileMobilelogoAndText" onClick={() => {setIsMobile(true); setIsOpenCart(false); dispatch(setSeeOptions(false))}}>
                        <div className="logo-mobile"></div>
                        <div className="logoText-mobile">Tu Producto Online</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BarWithLogoAndBack;