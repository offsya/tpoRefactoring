import React from 'react';
import "./SideMenuMobile.scss"
import MenuButtonMobile2 from "../Menu/MenuButtonMobile2";
import {setFrstWin} from "../../../features/frstWin";
import {setChooseMarket} from "../../../features/chooseMarket";
import {useDispatch} from "react-redux";
const SideMenuMobile = ({setLangMobileOpen, setProfileOpen, setPersonalDataMobile, setOrdersMobile, setSideMenuMobile}) => {
    const dispatch = useDispatch()

    return (
        <div className="SideMenuMobile">
            <div className="SideMenuButtons">
                <MenuButtonMobile2 title="Home" setProfileOpen={setProfileOpen} setSideMenuMobile={setSideMenuMobile} setPersonalDataMobile={setPersonalDataMobile} setOrdersMobile={setOrdersMobile} icon={1} />
                <MenuButtonMobile2 title="Personal data" setSideMenuMobile={setSideMenuMobile}  setPersonalDataMobile={setPersonalDataMobile} setOrdersMobile={setOrdersMobile}  icon={5} />
                <MenuButtonMobile2 title="Orders" setSideMenuMobile={setSideMenuMobile} setPersonalDataMobile={setPersonalDataMobile} setOrdersMobile={setOrdersMobile}  icon={6} />
                {/*<MenuButtonMobile2 title="Language" setSideMenuMobile={setSideMenuMobile} setPersonalDataMobile={setPersonalDataMobile} setOrdersMobile={setOrdersMobile} icon={4}/>*/}
                <MenuButtonMobile2 title="Sign out" setProfileOpen={setProfileOpen} setSideMenuMobile={setSideMenuMobile} setPersonalDataMobile={setPersonalDataMobile} setOrdersMobile={setOrdersMobile} icon={7}/>
            </div>
        </div>
    );
};

export default SideMenuMobile;