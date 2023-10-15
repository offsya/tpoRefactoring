import React from 'react';
import './FirstWindow.scss'
import {useDispatch} from "react-redux";
import {setFrstWin} from "../../../features/frstWin";
import {setChooseMarket} from "../../../features/chooseMarket";

const FirstWindowMobile = () => {
    const dispatch = useDispatch()
    return (
        <div className='firstWindowMobile'>
            <div className='leftSide' onClick={() => {dispatch(setFrstWin(false)); dispatch(setChooseMarket(1))}}>
                <div className='textSide'>I need products daily</div>
                <div className='buttonSide'>Standart market</div>
            </div>
            <div className='rightSide' onClick={() => {dispatch(setFrstWin(false)); dispatch(setChooseMarket(2))}}>
                <div className='textSide'>I wanna planing my business</div>
                <div className='buttonSide'>Сalculator</div>
            </div>
        </div>
    );
};

export default FirstWindowMobile;