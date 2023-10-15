import React from 'react';
import { FaShoppingCart } from "react-icons/fa";

import { BsFillCaretLeftFill } from "react-icons/bs";

import { BsQuestionLg } from "react-icons/bs";

import { GiDeliveryDrone } from "react-icons/gi";

import { GrLanguage } from "react-icons/gr";

import MyInput from "./input/MyInput";
const tg = window.Telegram.WebApp;


const HeaderToCatalog = ({dell, setDell, setDel, setLang, lang, nameLang, showFullItem, setShowFullItem, cartOpen, setCartOpen, onDelete, addQuantity, onAdd, setSearchQuery, searchQuery, cartOpenonShowItem, setShowForm, showForm, setCheckCategory, chooseCategory}) => {

    return (
        <header>
            <div>
                <ul className='nav'>
                    {
                        !lang &&
                        <li>
                            {
                                cartOpen || showForm || showFullItem || dell?
                                    <BsFillCaretLeftFill onClick={() => {setCartOpen(false); setShowForm(false); setDell(false); setShowFullItem(false); setDel(false)}} className='shop-cart-button leftArrow'/>
                                    :
                                    <BsFillCaretLeftFill onClick={() => {tg.close()}} className='shop-cart-button leftArrow'/>

                            }
                        </li>
                    }
                    {!lang &&
                        <a href="https://t.me/Botonbcn">
                            <BsQuestionLg className='shop-cart-button' onClick={() => {setDell(false)}} style={{marginRight: '-8px', color: 'black'}}/>
                        </a>
                    }
                    {
                        cartOpen || lang || dell ?
                            <div style={{width: '130px'}}>
                                <img style={{width: '100px', marginLeft: '15px', marginTop: '-5px'}} src="./img/Logo2.1.png" alt=""/>
                            </div>
                            :
                            <div className='searchDiv'><MyInput
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value)
                                }}
                                placeholder={nameLang[0]}
                            /></div>
                    }
                    {!lang &&
                        <GrLanguage onClick={() => {setLang(!lang); setDell(false)}} className='shop-cart-button'/>
                    }
                    {!lang &&
                        <GiDeliveryDrone className='shop-cart-button' onClick={() => setDell(!dell)}/>
                    }
                    {
                        !lang &&
                        <li style={{marginRight: '0px', marginLeft: '0px'}}>
                            <FaShoppingCart onClick={() => {setShowForm(false); setDell(false); setCartOpen(!cartOpen)}} className='shop-cart-button'/>
                        </li>
                    }
                </ul>
            </div>
        </header>
    );
};

export default HeaderToCatalog;