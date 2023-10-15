import React, {useEffect, useState} from 'react';
import '../../../Mobile/Components/ItemCard/MainBar.scss'
import ItemsCard from "../Login/Items/ItemsCard";
import tomato from '../../../../../assets/tomato.svg'
import corn from '../../../../../assets/corn.svg'
import chili from '../../../../../assets/chili.svg'
import avocado from '../../../../../assets/avocado.svg'
import Cart from "../Carts/Cart/Cart";
import Calend from "../Calendar/Calend";
import {useDispatch, useSelector} from "react-redux";
import CalendModal from "../Calendar/CalendModal";
import ItemsCardDefMarket from "../Login/Items/ItemsCardDefMarket";
import CartElem from "../Carts/CartElem/CartElemDefMarket";
import CartElemDefMarket from "../Carts/CartElem/CartElemDefMarket";
import CartDefMarket from "../Carts/Cart/CartDefMarket";
import FilterSideBar from "../FilterSideBar/FilterSideBar";
import {setFilterOpenSideMenu} from "../../../features/filtersOpenSideMenu";

const MainBar = () => {

    const dispatch = useDispatch()
    const seeCalend = useSelector((state) => state.calendOpen.calendOpen)
    const allItemsCart = useSelector((state) => state.allCartItems.allItemsCart)
    const check = useSelector((state) => state.checkFrstCalendOpen.checkFrstCalendOpen)
    const chooseMarket = useSelector((state) => state.chooseMarket.chooseMarket)
    const filterSelected = useSelector((state) => state.filterOpenSideMenu.filterOpenSideMenu)
    const [sortPopularity, setSortPopularity] = useState(false)
    const [sortPrice, setSortPrice] = useState(false)
    const [sortAlphabet, setSortAlphabet] = useState(false)

    return (
        <div className='mainBar'>
            <div className='infoLine'>
                Catalog
                <div className="filtersButtons">
                    <button className="mainFilter" style={{
                        background:filterSelected?"#5FC56D":"#E8E8E8",color:filterSelected?"#FFF":"#4C4C4C",
                    }} onClick={()=>{
                        dispatch(setFilterOpenSideMenu(!filterSelected))
                    }}>Filters</button>
                    <div className="otherFiltersButtons">
                        <div className="filterByPopularity" onClick={() => {
                            setSortPopularity(!sortPopularity)
                            setSortPrice(false)
                            setSortAlphabet(false)
                        }}
                             style={{
                                 background: sortPopularity ? "#5FC56E" : "#E8E8E8",
                                 color: sortPopularity ? "#FFFFFF" : "#4C4C4C",
                             }}>by popularity
                        </div>
                        <div className="filterByPrice"
                             onClick={() => {
                                 setSortPopularity(false)
                                 setSortPrice(!sortPrice)
                                 setSortAlphabet(false)
                             }}
                             style={{
                                 background: sortPrice ? "#5FC56E" : "#E8E8E8",
                                 color: sortPrice ? "#FFFFFF" : "#4C4C4C",
                             }}>by price
                        </div>
                        <div className="filterAlphabetically"
                             onClick={() => {
                                 setSortPopularity(false)
                                 setSortPrice(false)
                                 setSortAlphabet(!sortAlphabet)
                             }}
                             style={{
                                 background: sortAlphabet ? "#5FC56E" : "#E8E8E8",
                                 color: sortAlphabet ? "#FFFFFF" : "#4C4C4C",
                             }}>alphabetically
                        </div>
                        <div className="filterByPrice"
                             onClick={() => {
                                 setSortPopularity(false)
                                 setSortPrice(!sortPrice)
                                 setSortAlphabet(false)
                             }}
                             style={{
                                 background: sortPrice ? "#5FC56E" : "#E8E8E8",
                                 color: sortPrice ? "#FFFFFF" : "#4C4C4C",
                             }}>Available
                        </div>
                        <div className="filterByPrice"
                             onClick={() => {
                                 setSortPopularity(false)
                                 setSortPrice(!sortPrice)
                                 setSortAlphabet(false)
                             }}
                             style={{
                                 background: sortPrice ? "#5FC56E" : "#E8E8E8",
                                 color: sortPrice ? "#FFFFFF" : "#4C4C4C",
                             }}>by SPO
                        </div>
                    </div>
                </div>
            </div>
            <div className='itemCardBar'>
                {
                    chooseMarket == 2
                        ?
                        <ItemsCard/>
                        :
                        <ItemsCardDefMarket/>
                }
                <div className='itemsCart'>
                    {(chooseMarket == 2 && (seeCalend || (check && allItemsCart.length != 0))) && <CalendModal/>}
                    {
                        chooseMarket == 2 ?
                            <Cart/>
                            :
                            <CartDefMarket/>
                    }
                </div>
            </div>
        </div>
    );
};

export default MainBar;