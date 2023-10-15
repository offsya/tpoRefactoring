import React, {useState} from 'react';
import './BodyBar.scss'
import { BiCategoryAlt } from 'react-icons/bi';
import { TbHome } from 'react-icons/tb';
import { MdLanguage } from 'react-icons/md';
import {useDispatch, useSelector} from "react-redux";
import {setCurrentMenuButton} from "../../../features/menuSlice";
import {setFrstWin} from "../../../features/frstWin";
import { TbTemplate } from 'react-icons/tb';
import {setSearch} from "../../../features/searchItems";

const MenuButtonMobile = ({title, icon, setLangMobileOpen, setIsOpen}) => {
    const dispatch = useDispatch()
    const current = useSelector((state) => state.menu.currentMenuButton)
    const currentIcon = () => {
        if(icon == 1) return <TbHome className="currentMenuIcon-mobile"/>
        if(icon == 2) return <BiCategoryAlt className="currentMenuIcon-mobile"/>
        if(icon == 3) return <TbHome className="currentMenuIcon-mobile"/>
        if(icon == 4) return <MdLanguage className="currentMenuIcon-mobile"/>
        if(icon == 9) return <TbTemplate className="currentMenuIcon-mobile"/>
    }
    return (
        <div>
            <button onClick={() => {if(icon == 4 || icon == 3)setLangMobileOpen(true);dispatch(setCurrentMenuButton(icon)); if(icon == 1){
                dispatch(setFrstWin(true));
                setIsOpen(false);
                dispatch(setSearch(''))
            }}} className="menuButton-mobile">
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

export default MenuButtonMobile;