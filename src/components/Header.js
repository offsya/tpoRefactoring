import React from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { BsFillCaretLeftFill } from "react-icons/bs";

import { BsQuestionLg } from "react-icons/bs";

import { GiDeliveryDrone } from "react-icons/gi";

import MyInput from "./input/MyInput";
import {GrLanguage} from "react-icons/gr";


const Header = ({dell, setDell ,setDel, setLang, lang, nameLang, showFullItem, cartOpen, setCartOpen, onDelete, addQuantity, onAdd, setSearchQuery, searchQuery, cartOpenonShowItem, setShowForm, showForm, setCheckCategory, chooseCategory, setShowFullItem}) => {



    return (
        <header className='headCont'>
            <div>
                <ul className='nav'>
                    { !lang &&
                        <li>
                            {
                                cartOpen || showForm || showFullItem ?
                                    <BsFillCaretLeftFill onClick={() => {setCartOpen(false); setShowForm(false); setShowFullItem(false); setDell(false); setDel(false)}} className='shop-cart-button leftArrow'/>
                                    :
                                    <BsFillCaretLeftFill onClick={() => {setCheckCategory(true); setSearchQuery(''); setDell(false); chooseCategory('all')}} className='shop-cart-button leftArrow'/>

                            }
                        </li>
                    }
                    {!lang &&
                            <a href="http://t.me/Botonbcn">
                                <BsQuestionLg className='shop-cart-button' style={{marginRight: '-8px', color: 'black'}} onClick={() => {setDell(false); }}/>
                            </a>
                    }
                    {
                        cartOpen || lang || dell ?
                            <div style={{width: '130px'}}>
                                <img style={{width: '100px', marginLeft: '15px', marginTop: '-5px'}} src="./img/Logo2.1.png" alt=""/>
                            </div>
                            :
                            <div style={{marginRight: '0px', marginLeft: '0px'}} className='searchDiv'><MyInput
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
            <div className='headContImg'>
                {/*<div className='presentation'>*/}

                {/*</div>*/}
            </div>
        </header>
    );
};

export default Header;