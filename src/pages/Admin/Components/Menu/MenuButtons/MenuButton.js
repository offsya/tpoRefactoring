import React, {useState} from 'react';
import './MenuButton.scss'
import { FaShoppingCart } from 'react-icons/fa';
import { IoAppsOutline } from 'react-icons/io5';
import { FaUsers } from 'react-icons/fa';
import { BsFileText } from 'react-icons/bs';
import { AiFillMessage } from 'react-icons/ai';
import { IoIosSettings } from 'react-icons/io';
import { IoExit } from 'react-icons/io5';
import { IoMdArrowDropup } from 'react-icons/io';


const MenuButton = ({elem, setSelect, select, setNewMenu}) => {
    const icon = () => {
        if(elem.id == 1){

            return <FaShoppingCart/>
        }
        if(elem.id == 2){
            return <FaUsers/>
        }
        if(elem.id == 3){
            return <BsFileText/>
        }
        if(elem.id == 4){
            return <AiFillMessage/>
        }
        if(elem.id == 5){
            return <IoIosSettings/>
        }
        if(elem.id == 6){
            return <IoAppsOutline/>
        }
        if(elem.id == 7){
            return <IoExit/>
        }
    }
    return (
        <div className='menuButtonAdmin'>
            <div onClick={() => {elem.id == 6 && setSelect((prev) => !prev); setNewMenu(elem.id)}}>
                <span>{icon()}</span>
                {elem.name}
                {elem.id == 6 &&
                    <div className='selectIcon'>
                        <IoMdArrowDropup  style={{transform: select ? 'rotate(0deg)' : 'rotate(180deg)'}}/>
                    </div>
                }

            </div>
        </div>
    );
};

export default MenuButton;