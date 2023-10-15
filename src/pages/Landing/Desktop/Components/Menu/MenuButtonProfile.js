import React, {useState} from 'react';
import '../../../Mobile/Components/Menu/BodyBar.scss'
import { BiCategoryAlt } from 'react-icons/bi';
import { TbHome } from 'react-icons/tb';
import { MdLanguage } from 'react-icons/md';
import { ImStatsDots } from 'react-icons/im';
import { BiUserCircle } from 'react-icons/bi';
import { BiHistory } from 'react-icons/bi';
import { IoExitOutline } from 'react-icons/io5';
import {useDispatch, useSelector} from "react-redux";
import {setCurrentMenuButton} from "../../../features/menuSlice";
import {setFrstWin} from "../../../features/frstWin";
import {setUserAcc} from "../../../features/userAcc";

const MenuButtonProfile = ({title, icon, setProfileOpen}) => {
    const dispatch = useDispatch()
    const current = useSelector((state) => state.menu.currentMenuButton)
    const [langOpen, setLangOpen] = useState(false)
    const currentIcon = () => {
        if(icon == 1) return <TbHome className="currentMenuIcon"/>
        if(icon == 2) return <BiCategoryAlt className="currentMenuIcon"/>
        if(icon == 3) return <TbHome className="currentMenuIcon"/>
        if(icon == 4) return <MdLanguage className="currentMenuIcon"/>
        if(icon == 5) return <BiUserCircle className="currentMenuIcon"/>
        if(icon == 6) return <BiHistory className="currentMenuIcon"/>
        if(icon == 7) return <ImStatsDots className="currentMenuIcon"/>
        if(icon == 8) return <IoExitOutline className="currentMenuIcon"/>
    }
    return (
        <div className={icon == 4 && current == 4 ? 'langOpen' : ''} onClick={() => {
            if(icon == 2){
                dispatch(setFrstWin(true))
            }
        }}>
            <button onClick={() => {
                    if(icon == 1 || icon == 8){setProfileOpen(false)};
                    if(icon == 8){
                        dispatch(setUserAcc({}))
                        localStorage.setItem('userAccPassword', '')
                        localStorage.setItem('userAccRemember', false)
                    }
                    dispatch(setCurrentMenuButton(icon))
            }} className="menuButton" style={{background: current == icon ? '#F5F5F5' : '#F5F5F5', color: current == icon ? '#5FC56E' : '#4C4C4C'}}>
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

export default MenuButtonProfile;