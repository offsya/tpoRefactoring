import React, {useState} from 'react';
import '../../../Mobile/Components/SeacrhBar/SearchBar.scss'
import { Col, Row } from 'antd';
import Search from "./Search";
import {useDispatch, useSelector} from "react-redux";
import {BiUserCircle} from 'react-icons/bi'
import {setCurrentMenuButton} from "../../../features/menuSlice";
import {setFrstWin} from "../../../features/frstWin";
import {setCartOpenModal} from "../../../features/cartOpenModal";
import {BsFillHandbagFill} from "react-icons/bs";
import { TbTruckDelivery } from 'react-icons/tb';
import Profileicon from "../../../components/Search/Profile.svg"
import ProfileGreenicon from "../../../components/Search/ProfileGreen.svg"
import LastOrderModal from "../Modals/LastOrderModal";
import OpenCartModal from "../Modals/OpenCartModal";
import {setSeeOptions} from "../../../features/seeOptions";
import personalDataIco from "../../../components/Search/Persdataico.svg"
import historyofordersIco from "../../../components/Search/HistoryOfOrders.svg"
import totalprofitIco from "../../../components/Search/TotalProfit.svg"
import singOutIco from "../../../components/Search/SingOut.svg"
import {setUserAcc} from "../../../features/userAcc";

const SearchBar = ({setRegModalOpen, setProfileOpen}) => {
    const[isOpen,setOpen] = useState(false)
    const frstWin = useSelector((state) => state.frstWin.frstWin)
    const seeOptions = useSelector((state) => state.seeOptions.seeOptions)
    const allItemsCart = useSelector((state) => state.allCartItems.allItemsCart)
    const cartOpenModal = useSelector((state) => state.cartOpenModal.cartOpenModal)
    const userAcc = useSelector((state) => state.userAcc.userAcc)
    console.log(userAcc)
    const [cartModal, setCartModal] = useState(false)
    const dispatch = useDispatch();
    return (
        <div className='bodyBarSearch'>
            <div className="logo" onClick={() => dispatch(setFrstWin(false))}>
                <div className="logoText">Tu Producto Online</div>
            </div>
            <Search/>
            {/*<div className="cardIconSearchBar" onClick={() => dispatch(setCartOpenModal(true))}>*/}
            {/*    {allItemsCart.length > 0 && <div className='cartElemQuantitySearchBar'>{allItemsCart.length}</div>}*/}
            {/*    <TbTruckDelivery className="cardImgSearchBar"/>*/}
            {/*</div>*/}
            <div className="optionsCardOpenSearchBar" onClick={() => {dispatch(setSeeOptions(false)); dispatch(setCartOpenModal(true))}}>
                {allItemsCart.length > 0 && <div className='cartElemQuantity'>{allItemsCart.length}</div>}
                <TbTruckDelivery className="cardImg"/>
            </div>

            <div style={{display: userAcc?._id ? "flex" : "none"}}>
                <div className={`MyAccaountButton ${isOpen ? "active": "" }`} onClick={()=> setOpen(!isOpen)} >
                    <img className="ProfileImage" src={isOpen ? ProfileGreenicon : Profileicon}/>
                    <span className="Droptext" >My account</span>
                </div>
                <div className={`Dropmenu ${isOpen ? "active": "" }`} >
                    <div className="Dropmenu_list">
                        <div className="Dropmenu_items" onClick={() => { setProfileOpen(true); dispatch(setCurrentMenuButton(5))}}>
                            <img src={personalDataIco}/>
                            <span className="Droptext" >Personal data</span>
                        </div>
                        <div className="Dropmenu_items" onClick={() => { setProfileOpen(true); dispatch(setCurrentMenuButton(6))}}>
                            <img src={historyofordersIco}/>
                            <span className="Droptext" >Orders</span>
                        </div>
                            <div style={{border: "1px solid #9D9D9D",width:"100%",marginBottom:12}}></div>
                        <div className="Dropmenu_items" style={{marginBottom:"12px"}}>
                            <img src={singOutIco}/>
                            <span className="Droptext" onClick={() => {
                                dispatch(setUserAcc({}))
                                localStorage.setItem('userAccPassword', '')
                                localStorage.setItem('userAccRemember', false)
                            }}>Sign out</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="LoginButton"
                 style={{display: userAcc?._id ? "none" : " flex"}}
                  onClick={() => {
                      setRegModalOpen(true);
                      dispatch(setCurrentMenuButton(5))
                  }}>

                <img src={ProfileGreenicon}/>
                <span className="Droptext">Log in</span>
            </div>



            {
                cartOpenModal && <OpenCartModal setCartModal={setCartModal}/>
            }
        </div>
    );
};

export default SearchBar;