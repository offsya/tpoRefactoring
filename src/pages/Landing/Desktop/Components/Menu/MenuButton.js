import React, {useState} from 'react';
import '../../../Mobile/Components/Menu/BodyBar.scss'
import { BiCategoryAlt } from 'react-icons/bi';
import { TbHome } from 'react-icons/tb';
import { MdLanguage } from 'react-icons/md';
import { TbTemplate } from 'react-icons/tb';
import { BiCategory } from 'react-icons/bi';

import {useDispatch, useSelector} from "react-redux";
import {setCurrentMenuButton} from "../../../features/menuSlice";
import {setFrstWin} from "../../../features/frstWin";

const MenuButton = ({title, icon}) => {
    const dispatch = useDispatch()
    const current = useSelector((state) => state.menu.currentMenuButton)
    const currentIcon = () => {
        if(icon == 1) return <TbHome className="currentMenuIcon"/>
        if(icon == 2) return <BiCategoryAlt className="currentMenuIcon"/>
        if(icon == 3) return <BiCategory className="currentMenuIcon"/>
        if(icon == 4) return <MdLanguage className="currentMenuIcon"/>
        if(icon == 9) return <TbTemplate className="currentMenuIcon"/>
    }
    return (
        <div className={icon == 4 && current == 4 ? 'langOpen' : ''} onClick={() => {
            if(icon == 1){
                // dispatch(setFrstWin(true))
            }
        }}>
            <button onClick={() => dispatch(setCurrentMenuButton(icon))} className="menuButton" style={{background: current == icon ? '#FFFFFF' : '#FFFFFF', color: current == icon ? '#5FC56E' : '#4C4C4C'}}>
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

export default MenuButton;