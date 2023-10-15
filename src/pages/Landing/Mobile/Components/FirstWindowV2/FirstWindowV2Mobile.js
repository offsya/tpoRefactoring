import React, {useEffect, useState} from 'react';
import './FirstWindowV2.scss'
import money from '../../../../../assets/money.svg'
import cloud from '../../../../../assets/cloud.svg'
import maps from '../../../../../assets/maps.svg'
import {setFrstWin} from "../../../features/frstWin";
import {setChooseMarket} from "../../../features/chooseMarket";
import {useDispatch} from "react-redux";
import axios from "axios";
const FirstWindowV2 = () => {
    const [currOpen, setCurrOpen] = useState(1)
    const dispatch = useDispatch();
    const [currTexts, setCurrTexts] = useState({})


    useEffect(() => {
        axios.get('https://tpomobi.shop/getTexts').then((resp) => {
            console.log(resp.data)
            setCurrTexts(resp.data)
        });
    }, [])
    return (
        <div className='firstWindowV2-mobile'>
            {   currOpen == 1 &&
                <div className='rightS'>
                    <div className='rightSNavBar'>
                        <div className='rightSNavBarText' onClick={() => {dispatch(setFrstWin(false)); dispatch(setChooseMarket(1))}}>Smart Delivery</div>
                        <div className='rightSNavBarText' onClick={() => {dispatch(setFrstWin(false)); dispatch(setChooseMarket(1))}}>Catalog</div>
                    </div>
                    <div className='circleElemsBlock'>
                        <div className='circleElem'><img src={money} alt=""/><div className='textDiv'>{currTexts.textCircleItem1}</div></div>
                        <div className='circleElem'><img src={maps} alt=""/><div className='textDiv'>{currTexts.textCircleItem2}</div></div>
                        <div className='circleElem'><img src={cloud} alt=""/><div className='textDiv'>{currTexts.textCircleItem3}</div></div>
                    </div>
                    <div className='rightSbuttonsBlock'>
                        <div className='rightSbutton rightSbuttonLeft' onClick={() => setCurrOpen(2)}>
                            Smart order (-40%)
                        </div>
                        <div className='rightSbutton' onClick={() => setCurrOpen(3)}>
                            Standart order
                        </div>
                    </div>
                </div>
            }
            {   currOpen == 2 &&
                <div className='rightS' style={{gridGap: '20px'}}>
                    <div className='rightSWindowSmart' style={{position: 'absolute', top: '10px'}}>
                        <div className='textDiv' name="" id="">
                            {currTexts.textOptionsTitle}
                        </div>
                    </div>
                    <div className='rightSpointsBlock'>
                        <div><span>01</span><div className='textDiv'>{currTexts.textOptionsTitleName1}</div></div>
                        <div className='textDiv'>{currTexts.textOptionsTitle1}</div>
                    </div>
                    <div className='rightSpointsBlock'>
                        <div><span>02</span><div className='textDiv'>{currTexts.textOptionsTitleName2}</div></div>
                        <div className='textDiv'>{currTexts.textOptionsTitle2}</div>

                    </div>
                    <div className='rightSpointsBlock'>
                        <div><span>03</span><div className='textDiv'>{currTexts.textOptionsTitleName3}</div></div>
                        <div className='textDiv'>{currTexts.textOptionsTitle3}</div>
                    </div>
                        <div className='rightSbuttonTwo rightSbuttonLeft' style={{width: '100%', height: '80px', position: 'absolute', bottom: '10px'}} onClick={() => {dispatch(setFrstWin(false)); dispatch(setChooseMarket(1))}}>
                            Smart order (-40%)
                        </div>
                </div>
            }
            {   currOpen == 3 &&
                <div className='rightS'>
                    <div className='rightSWindowSmart'>
                        <div className='textDiv' style={{height: '150px'}}>
                            {currTexts.lastText}
                        </div>
                    </div>

                    <div className='rightSbuttonsBlock'>
                        <div className='rightSbutton rightSbuttonLeft' onClick={() => setCurrOpen(2)}>
                            Try smart order
                        </div>
                        <div className='rightSbutton' onClick={() => {dispatch(setFrstWin(false)); dispatch(setChooseMarket(1))}}>
                            Standart order
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default FirstWindowV2;