import React, {useState} from 'react';
import './BodyBar.scss'
import {BiCategoryAlt, BiUserCircle} from 'react-icons/bi';
import { TbHome } from 'react-icons/tb';
import { TbMoodNervous } from 'react-icons/tb';
import { TbNotes } from 'react-icons/tb';
import { TbUpload } from 'react-icons/tb';


import { MdLanguage } from 'react-icons/md';
import {useDispatch, useSelector} from "react-redux";
import {setCurrentMenuButton} from "../../../features/menuSlice";
import {setFrstWin} from "../../../features/frstWin";
import { TbTemplate } from 'react-icons/tb';
import {setUserAcc} from "../../../features/userAcc";

const MenuButtonMobile2 = ({title, icon, setLangMobileOpen,setSideMenuMobile,setPersonalDataMobile, setOrdersMobile,setProfileOpen}) => {
    const dispatch = useDispatch()
    const current = useSelector((state) => state.menu.currentMenuButton)
    const currentIcon = () => {


        if(icon == 1) return <TbHome className="currentMenuIcon-mobile"/>
        if(icon == 2) return <BiCategoryAlt className="currentMenuIcon-mobile"/>
        if(icon == 3) return <TbHome className="currentMenuIcon-mobile"/>
        if(icon == 4) return <MdLanguage className="currentMenuIcon-mobile"/>
        if(icon == 5) return <BiUserCircle className="currentMenuIcon-mobile"/>
        if(icon == 6) return <TbNotes className="currentMenuIcon-mobile"/>
        if(icon == 7) return <TbUpload style={{transform:"rotate(270deg)"}} className="currentMenuIcon-mobile"/>



        if(icon == 9) return <TbTemplate className="currentMenuIcon-mobile"/>
    }
    return (
        <div>
            <button onClick={() => {if(icon == 4 || icon == 3)setLangMobileOpen(true);dispatch(setCurrentMenuButton(icon)); if(icon == 1){
                dispatch(setFrstWin(true))
            }if(icon==5) {
                setSideMenuMobile(false)
                setPersonalDataMobile(true)
                setOrdersMobile(false)
            }if(icon==6) {
                setSideMenuMobile(false)
                setPersonalDataMobile(false)
                setOrdersMobile(true)
            }if(icon==1){

                setProfileOpen(false)
            }if(icon==7){
                setProfileOpen(false)
                dispatch(setUserAcc({}))
                localStorage.setItem('userAccPassword', '')
                localStorage.setItem('userAccRemember', false)
                }
            }} className="menuButton-mobile">
                <div>
                    {
                        currentIcon()
                    }
                </div>
                {title}
            </button>
        </div>
    );
};

export default MenuButtonMobile2;