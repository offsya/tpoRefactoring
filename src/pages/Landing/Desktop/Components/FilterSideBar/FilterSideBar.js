import React from 'react';
import "./FilterSideBar.scss"
import CustomSwitch from "./CustomSwitch/CustomSwitch";
import {useDispatch, useSelector} from "react-redux";
import {setFilterOpenSideMenu} from "../../../features/filtersOpenSideMenu";
const FilterSideBar = () => {
    const dispatch = useDispatch()

    const filterSelected = useSelector((state) => state.filterOpenSideMenu.filterOpenSideMenu)

    return (
        <div>{
              filterSelected &&  <div className="FilterSideBar ">
                <div className="mainBlockFilterSideBar">
                    <div className="topRowFilterSideBar">
                        <div className="closeFilterSideBar" onClick={()=>{
                            dispatch(setFilterOpenSideMenu(false))
                        }} >+</div>
                        <div className="nameTextFilterSideBar">Filters</div>
                    </div>
                    <div className="categoriesElemFilterSideBar">
                        <div className="categoriesTextFilterSideBar">Categories</div>
                        <div className="checkboxRowCategoriesFilterSideBar">
                            <div className="checkboxCategoriesFilterSideBar"><span>✔</span></div>
                            <div className="textCategoriesFilterSideBar">Frutas</div>
                        </div>
                        <div className="checkboxRowCategoriesFilterSideBar">
                            <div className="checkboxCategoriesFilterSideBar"><span>✔</span></div>
                            <div className="textCategoriesFilterSideBar">Flores</div>
                        </div>
                        <div className="checkboxRowCategoriesFilterSideBar">
                            <div className="checkboxCategoriesFilterSideBar"><span>✔</span></div>
                            <div className="textCategoriesFilterSideBar">Zumos</div>
                        </div>
                        <div className="moreButtonCategoriesFilterSideBar">more..</div>


                    </div>
                    <div className="specialOffersFilterSideBar">
                        <div className="SPOTextImageFilterSideBar">
                            <div className="SPOImgFilterSideBar">
                                SPO
                            </div>
                            <div className="SPOTextFilterSideBar">
                                Show only Special Offers
                            </div>
                        </div>
                        <div className="toggleButtonFilterSideBar">
                            <CustomSwitch/>
                        </div>
                    </div>
                    <div className="categoriesElemFilterSideBar">
                        <div className="categoriesTextFilterSideBar">Brands</div>
                        <div className="checkboxRowCategoriesFilterSideBar">
                            <div className="checkboxCategoriesFilterSideBar"><span>✔</span></div>
                            <div className="textCategoriesFilterSideBar">Koppert Cress</div>
                        </div>
                        <div className="checkboxRowCategoriesFilterSideBar">
                            <div className="checkboxCategoriesFilterSideBar"><span>✔</span></div>
                            <div className="textCategoriesFilterSideBar">Itac</div>
                        </div>
                        <div className="checkboxRowCategoriesFilterSideBar">
                            <div className="checkboxCategoriesFilterSideBar"><span>✔</span></div>
                            <div className="textCategoriesFilterSideBar">Frit Ravich</div>
                        </div>
                        <div className="moreButtonCategoriesFilterSideBar">more..</div>


                    </div>
                    <div className="categoriesElemFilterSideBar">
                        <div className="categoriesTextFilterSideBar">Cuisine</div>
                        <div className="checkboxRowCategoriesFilterSideBar">
                            <div className="checkboxCategoriesFilterSideBar"><span>✔</span></div>
                            <div className="textCategoriesFilterSideBar">Para Bares</div>
                        </div>
                        <div className="checkboxRowCategoriesFilterSideBar">
                            <div className="checkboxCategoriesFilterSideBar"><span>✔</span></div>
                            <div className="textCategoriesFilterSideBar">Para Sushi</div>
                        </div>
                        <div className="checkboxRowCategoriesFilterSideBar">
                            <div className="checkboxCategoriesFilterSideBar"><span>✔</span></div>
                            <div className="textCategoriesFilterSideBar">Para Poke</div>
                        </div>
                        <div className="moreButtonCategoriesFilterSideBar">more..</div>


                    </div>

                </div>
                </div>
        }</div>
    );
};

export default FilterSideBar;