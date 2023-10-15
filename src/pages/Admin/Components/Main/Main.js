import React, {useState} from 'react';
import './Main.scss';
import { FaUserCircle } from 'react-icons/fa';
import {IoMdArrowDropup} from "react-icons/io";
import TableComponent from "./Table/TableComponent";
import OrdersComponent from "./Table/OrdersComponent";
import {useDispatch} from "react-redux";
import {
    setValue,
} from "../../features/setAddProdAdmin";
import {delAllSelectedItems} from "../../features/allSelectedItems";
import snp1 from '../Main/Table/images/snp1.jpg'

import snp2 from '../Main/Table/images/snp2.jpg'
import ContactsComponent from "./Table/ContactsComponent";

const Main = ({newMenu}) => {
    const [selectLang, setSelectLang] = useState(false)
    const [menuElem, setMenuElem] = useState('Orders')
    const dispatch = useDispatch();
    const [passFake, setPassFake] = useState(localStorage.getItem('password'))
    console.log(menuElem)
    return (
        <div className='mainClass'>
            {
                localStorage.getItem('password') != 'U71x24Ndm' ?
                    <div style={{display: 'flex', width: '100vw', height: '100vh', justifyContent: 'center', alignItems: 'center'}}>
                        <input style={{width: '150px', height: '30px', boxShadow: '1px 1px 6px 0px black', borderRadius: '10px', textAlign: 'center'}} placeholder='password' onChange={(e) => {setPassFake(e.target.value); localStorage.setItem('password', e.target.value)}} value={passFake} type="password"/>
                    </div>
                    :
                    <div>
                        <div className="mainClassNavBar">
                            <div className='logoName' style={{zIndex: '99'}} onClick={() => {dispatch(delAllSelectedItems()); dispatch(setValue(2))}}>
                                <div className='leftSLogo'><div className='logoText'>Tu Producto Online</div></div>
                            </div>
                            <div className='menuNavBar'>
                    <span style={{background: menuElem == 'Orders' && '#06C1B0', color: menuElem == 'Orders' && '#FFFFFF'}} onClick={() => {
                        setMenuElem('Orders')
                        dispatch(setValue(2))
                        dispatch(delAllSelectedItems())
                    }}>
                        Orders
                    </span>
                                <span style={{background: menuElem == 'Contacts' && '#06C1B0', color: menuElem == 'Contacts' && '#FFFFFF'}} onClick={() => {
                                    setMenuElem('Contacts')
                                    dispatch(setValue(2))
                                }}>
                        Contacts
                    </span>
                                <span style={{background: menuElem == 'Catalog' && '#06C1B0', color: menuElem == 'Catalog' && '#FFFFFF'}} onClick={() => {
                                    setMenuElem('Catalog')
                                    dispatch(setValue(2))
                                    dispatch(delAllSelectedItems())
                                }}>
                        Catalog
                    </span>
                                <span style={{background: menuElem == 'Operacion' && '#06C1B0', color: menuElem == 'Operacion' && '#FFFFFF'}} onClick={() => {
                                    setMenuElem('Operacion')
                                    dispatch(setValue(2))
                                }}>
                        Operacion
                    </span>
                                <span style={{background: menuElem == 'Messages' && '#06C1B0', color: menuElem == 'Messages' && '#FFFFFF'}} onClick={() => {
                                    setMenuElem('Messages')
                                    dispatch(setValue(2))
                                }}>
                        Messages
                    </span>
                                <span style={{background: menuElem == 'Projects' && '#06C1B0', color: menuElem == 'Projects' && '#FFFFFF'}} onClick={() => {
                                    setMenuElem('Projects')
                                    dispatch(setValue(2))
                                }}>
                        Projects
                        <div className='selectIcon' style={{display: 'none'}}>
                            <IoMdArrowDropup  style={{transform: true ? 'rotate(0deg)' : 'rotate(180deg)'}}/>
                        </div>
                    </span>
                            </div>
                            <div className='langUser'>
                                <div className='lang' onClick={() => setSelectLang((prev) => !prev)}>
                                    LANG
                                    <div className='selectIcon'>
                                        <IoMdArrowDropup style={{transform: selectLang ? 'rotate(0deg)' : 'rotate(180deg)'}}/>
                                    </div>
                                </div>
                                <div className='userIcon'>
                                    <FaUserCircle/>
                                </div>
                            </div>
                        </div>
                        {menuElem == 'Catalog' && <TableComponent/>}
                        {menuElem == 'Orders' && <OrdersComponent/>}
                        {menuElem == 'Contacts' && <ContactsComponent/>}

                        <div style={{display: (menuElem == 'Orders' || menuElem == 'Catalog' || menuElem == 'Contacts') ? 'none' : 'flex', width: '100vw', height: '100vh', justifyContent: 'center', marginTop: '50px'}}>
                            <img style={{width: 'auto', height: '700px', boxShadow: '1px 1px 10px 0px black', position: 'absolute'}} src={Math.random()*10 > 5 ? snp1 : snp2} alt=""/>
                        </div>
                    </div>
            }
        </div>
    );
};

export default Main;