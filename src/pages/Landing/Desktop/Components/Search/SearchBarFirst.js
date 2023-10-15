import React from 'react';
import '../../../Mobile/Components/SeacrhBar/SearchBar.scss'
import { Col, Row } from 'antd';
import Search from "./Search";
import {useSelector} from "react-redux";

const SearchBarFirst = () => {
    const seeOptions = useSelector((state) => state.seeOptions.seeOptions)

    return (
        <div className='bodyBarSearchFirst'>
            <div className="logo">
                <div className="logoText">Tu Producto Online</div>
            </div>
        </div>
    );
};

export default SearchBarFirst;