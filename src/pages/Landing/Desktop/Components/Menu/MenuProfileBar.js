import React, {useState} from 'react';
import '../../../Mobile/Components/Menu/BodyBar.scss'
import MenuButton from "./MenuButton";
import Calend from "../Calendar/Calend";
import Language from "../../../components/Language/Language";
import {useSelector} from "react-redux";
import MenuButtonProfile from "./MenuButtonProfile";

const MenuProfileBar = ({setProfileOpen}) => {

    const current = useSelector((state) => state.menu.currentMenuButton)
    const [langOpen, setLangOpen] = useState(true)
    return (
        <div className='menuBarProfile'>
            <MenuButtonProfile title="Home" icon={1} setProfileOpen={setProfileOpen} setLangOpen={setLangOpen} langOpen={langOpen}/>
            <MenuButtonProfile title="Personal data" icon={5} setProfileOpen={setProfileOpen}  setLangOpen={setLangOpen} langOpen={langOpen}/>
            <MenuButtonProfile title="Orders" icon={6} setProfileOpen={setProfileOpen} setLangOpen={setLangOpen} langOpen={langOpen}/>
            {/*<MenuButtonProfile title="Total profit" icon={7} setProfileOpen={setProfileOpen} setLangOpen={setLangOpen} langOpen={langOpen}/>*/}
            <MenuButtonProfile title="Sign out" icon={8} setProfileOpen={setProfileOpen} setLangOpen={setLangOpen} langOpen={langOpen}/>
            {
                current == 4 && <Language/>
            }
        </div>
    );
};

export default MenuProfileBar;