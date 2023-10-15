import React from 'react';
import '../../../Mobile/Components/SeacrhBar/SearchBar.scss'
import { Col, Row } from 'antd';
import Search from "./Search";
import {useSelector, useDispatch} from "react-redux";
import { BsArrowLeft } from 'react-icons/bs';
import {setSeeOptions} from "../../../features/seeOptions";
import Cart from "../Carts/Cart/Cart";
import CartOptions from "../Carts/Cart/CartOptions";
import {BiUserCircle} from "react-icons/bi";


const OptionsSearchBar = ({setRegModalOpen}) => {
    const dispatch = useDispatch();
    const seeOptions = useSelector((state) => state.seeOptions.seeOptions)

    return (
        <div className='bodyBarSearchOptions'>
            <div className="optionsBack" onClick={() => dispatch(setSeeOptions(false))}><BsArrowLeft className="optionsBackArrow"/>Back</div>
            <div className="logoOptions logoTestOption" onClick={() => dispatch(setSeeOptions(false))}>
                <div className="logoText">Tu Producto Online</div>
            </div>
            <div className="cartOptions">
                <CartOptions/>
            </div>
        </div>
    );
};

export default OptionsSearchBar;