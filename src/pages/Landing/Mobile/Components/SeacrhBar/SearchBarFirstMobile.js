import React from 'react';
import './SearchBar.scss'
import { Col, Row } from 'antd';
import Search from "../../../Desktop/Components/Search/Search";
import {useSelector} from "react-redux";

const SearchBarFirstMobile = () => {
    const seeOptions = useSelector((state) => state.seeOptions.seeOptions)

    return (
        <div className='bodyBarSearchFirst'>
            <div className="logo">
                <div className="logoText">Tu Producto Online</div>
            </div>
        </div>
    );
};

export default SearchBarFirstMobile;