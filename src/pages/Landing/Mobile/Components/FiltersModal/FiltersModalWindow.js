import React from 'react';
import "./FiltersModalWindow.scss"
import {Input, Slider} from "antd";
import CustomSwitch from "../../../Desktop/Components/FilterSideBar/CustomSwitch/CustomSwitch";
import {MdOutlineKeyboardArrowRight} from "react-icons/md";
const FiltersModalWindow = ({setIsOpenFilters}) => {
    return (
        <div className="FiltersMW">
            <div className="FiltersMWTopRow">
                <div className="FMWClose"  onClick={() => setIsOpenFilters(false)} >X</div>
                <div className="FMWTag">Filters</div>
                <div className="FMWReset">reset all</div>
            </div>
            <div className="FiltersMWMain">
                <div className="FMWPrice">
                    <span> Price,<span>€</span></span>
                    <div className="FMWPriceSlider">
                        <div className="FMWPriceSliderLeft">
                            <span>from</span>
                            <Input bordered={false} type={"number"} style={{
                                color: "#5FC56E",
                                fontFamily: "Inter",
                                fontSize: "18px",
                                fontStyle: "normal",
                                fontWeight: "500",
                                lineHeight: "normal",
                                letterSpacing: "1.8px",
                            }}
                            placeholder ="0"/>
                        </div>
                        <div className="FMWPriceSliderSeparator"></div>
                        <div className="FMWPriceSliderRight">
                            <span>until</span>
                            <Input bordered={false} type={"number"} style={{
                                marginLeft:"-3px",
                                color: "#5FC56E",
                                fontFamily: "Inter",
                                fontSize: "18px",
                                fontStyle: "normal",
                                fontWeight: "500",
                                lineHeight: "normal",
                                letterSpacing: "1.8px",
                            }}
                                   placeholder ="200"/>
                        </div>
                    </div>
                    <div className="FWMSlider">
                        <Slider range defaultValue={[0, 200]} max={200}/>
                    </div>
                </div>
                <div className="FMWSpo">
                    <span>Show only Special Offers</span>
                    <div className="FMWToggle">
                        <CustomSwitch/>
                    </div>
                </div>
                <div className="FMWCategories">Categories <MdOutlineKeyboardArrowRight /> </div>
                <div className="FMWCategories">Brands <MdOutlineKeyboardArrowRight/></div>
                <div className="FMWCategories">Cuisine <MdOutlineKeyboardArrowRight/></div>
                <div className="FMWCategories">Und <MdOutlineKeyboardArrowRight/></div>

            </div>
        </div>
    );
};

export default FiltersModalWindow;