import React, {useMemo, useState} from 'react';
import { CgClose } from 'react-icons/cg';
import MenuButton from "../../../Desktop/Components/Menu/MenuButton";
import MenuButtonMobile from "./MenuButtonMobile";
import LanguageMobile from "../../../components/Language/LanguageMobile";
import {useDispatch, useSelector} from "react-redux";
import LastOrderModal from "../../../Desktop/Components/Modals/LastOrderModal";
import FavoriteElemModal from "../ModalWindow/FavoriteElemModal";
import LastOrderModalMobile from "../ModalWindow/LastOrderModalMobile";
import FavoriteElemModalMobile from "../ModalWindow/FavoriteElemModalMobile";
import {setSearch} from "../../../features/searchItems";
import {AiFillHeart} from "react-icons/ai";
import {setArr,addItem } from '../../../../Admin/features/allFavoritCategory'

const MenuMobile = ({setIsOpen, isOpen, setIsOpenCart,setProfileOpen}) => {
    const dispatch = useDispatch()
    const [langMobileOpen, setLangMobileOpen] = useState(false);
    const current = useSelector((state) => state.menu.currentMenuButton)
    const samplesCategory = useSelector((state) => state.allFavoritCategory.allFavoritCategory)

    const [lastOrderModal, setLastOrderModal] = useState(false);
    const [favoriteElemModal, setFavoriteElemModal] = useState(false);

    const allItems = useSelector((state) => state.allItems.allItems)

    return (
        <div className="menu-mobile">
            <div className="menuContent-mobile">
                <CgClose onClick={() => setIsOpen(false)} className="close-button"/>
                {langMobileOpen ?
                    <div className="menuButtons-mobile">
                        <LanguageMobile setIsOpen={setIsOpen} current={current} setLangMobileOpen={setLangMobileOpen} setProfileOpen={setProfileOpen}/>
                    </div>
                    :
                    <div className="menuButtons-mobile">
                        <MenuButtonMobile title="Home" setIsOpen={setIsOpen} setProfileOpen={setProfileOpen} icon={1}/>
                        <MenuButtonMobile title="Samples" setIsOpen={setIsOpen} setProfileOpen={setProfileOpen} icon={9}/>
                        <div className='SamplesSubButtonBack-mobile'>
                            {
                                current == 9 &&
                                <div className="SamplesSubButton-mobile" onClick={() => setFavoriteElemModal((prev) => !prev)}>
                                    · My favorite's
                                </div>
                            }
                            {
                                current == 9 &&
                                <div className="SamplesSubButton-mobile" onClick={() => setLastOrderModal((prev) => !prev)}>
                                    · My last order
                                </div>
                            }
                            {
                                (current == 9 && samplesCategory.length > 0) &&
                                samplesCategory.map(elem => {
                                    return  <div className="SamplesSubButton-mobile" onClick={() => dispatch(setSearch(elem))}>
                                <span onClick={() => {
                                    if(samplesCategory.includes(elem)) {
                                        let ar = samplesCategory.filter(el => el != elem)
                                        dispatch(setArr(ar))
                                    }else{
                                        dispatch(addItem(elem))

                                    }
                                }}><AiFillHeart/></span> {elem}
                                    </div>
                                })
                            }
                        </div>
                        {/*<MenuButtonMobile title="Market" icon={2}/>*/}
                        <MenuButtonMobile setIsOpen={setIsOpen} setProfileOpen={setProfileOpen} title="Category" setLangMobileOpen={setLangMobileOpen} icon={3}/>
                        <MenuButtonMobile setIsOpen={setIsOpen} setProfileOpen={setProfileOpen} title="Language" setLangMobileOpen={setLangMobileOpen} icon={4}/>
                        {
                            lastOrderModal && <LastOrderModalMobile setIsOpenCart={setIsOpenCart} setIsOpen={setIsOpen} setLastOrderModal={setLastOrderModal}/>
                        }
                        {
                            favoriteElemModal && <FavoriteElemModalMobile setIsOpen={setIsOpen} setFavoriteElemModal={setFavoriteElemModal}/>
                        }
                    </div>
                }
            </div>
        </div>
    );
};

export default MenuMobile;