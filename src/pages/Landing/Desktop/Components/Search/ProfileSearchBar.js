import React from 'react';
import '../../../Mobile/Components/SeacrhBar/SearchBar.scss'
import { Col, Row } from 'antd';
import Search from "./Search";
import {useSelector, useDispatch} from "react-redux";
import { BsArrowLeft } from 'react-icons/bs';
import {setSeeOptions} from "../../../features/seeOptions";
import '../BodyComponents/ProfileBar.scss'


const ProfileSearchBar = ({setProfileOpen}) => {
    const dispatch = useDispatch();
    const seeOptions = useSelector((state) => state.seeOptions.seeOptions)

    return (
        <div className='bodyBarSearchOptionsProfile'>
            <div className="optionsBack" onClick={() => {setProfileOpen(false); dispatch(setSeeOptions(false))}}><BsArrowLeft className="optionsBackArrow"/>Back</div>
            <div className="logoOptions" onClick={() => dispatch(setSeeOptions(false))}>
                <div className="logoText">Tu Producto Online</div>
            </div>
        </div>
    );
};

export default ProfileSearchBar;