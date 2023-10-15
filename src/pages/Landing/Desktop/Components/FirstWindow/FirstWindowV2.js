import React, {useEffect, useState} from 'react';
import '../../../Mobile/Components/FirstWindowV2/FirstWindowV2.scss'
import money from '../../../../../assets/money.svg'
import cloud from '../../../../../assets/cloud.svg'
import maps from '../../../../../assets/maps.svg'
import {setFrstWin} from "../../../features/frstWin";
import {setChooseMarket} from "../../../features/chooseMarket";
import {useDispatch} from "react-redux";
import axios from "axios";
import fk from "../../../../../assets/av.svg";
import {addAllItems} from "../../../features/allItems";
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

    const [textInfoLeft, setTextInfoLeft] = useState(currTexts.textInfoLeft)
    const [textCircleItem1, setTextCircleItem1] = useState(currTexts.textCircleItem1)
    const [textCircleItem2, setTextCircleItem2] = useState(currTexts.textCircleItem2)
    const [textCircleItem3, setTextCircleItem3] = useState(currTexts.textCircleItem3)

    const [textOptionsTitle, setTextOptionsTitle] = useState(currTexts.textOptionsTitle)

    const [textOptionsTitleName1, setTextOptionsTitleName1] = useState(currTexts.textOptionsTitleName1)
    const [textOptionsTitle1, setTextOptionsTitle1] = useState(currTexts.textOptionsTitle1)

    const [textOptionsTitleName2, setTextOptionsTitleName2] = useState(currTexts.textOptionsTitleName2)
    const [textOptionsTitle2, setTextOptionsTitle2] = useState(currTexts.textOptionsTitle2)

    const [textOptionsTitleName3, setTextOptionsTitleName3] = useState(currTexts.textOptionsTitleName3)
    const [textOptionsTitle3, setTextOptionsTitle3] = useState(currTexts.textOptionsTitle3)


    const [lastText, setLastText] = useState(currTexts.lastText)



    const crt = () => {
        let data = {
            textInfoLeft,
            textCircleItem1,
            textCircleItem2,
            textCircleItem3,
            textOptionsTitle,
            textOptionsTitle1,
            textOptionsTitle2,
            textOptionsTitle3,
            textOptionsTitleName1,
            textOptionsTitleName2,
            textOptionsTitleName3,
            lastText
        }

        axios.post('https://tpomobi.shop/updateTexts', data).then((resp) => {
            console.log(resp.data)
        });
    }

    return (
        <div className='firstWindowV2'>
            <div className='leftS'>
                <div className='leftSLogo'><div className='logoText'>Tu Producto Online</div></div>
                <div className='leftSText'><textarea type="text" onChange={e => {setTextInfoLeft(e.target.value)}} value={textInfoLeft} defaultValue={currTexts.textInfoLeft}></textarea></div>
                <div className='leftSImage'></div>
            </div>
            {   currOpen == 1 &&
                <div className='rightS'>
                    <div className='rightSNavBar'>
                        <div className='rightSNavBarText' onClick={() => {dispatch(setFrstWin(false)); dispatch(setChooseMarket(1))}}>Smart Delivery</div>
                        <div className='rightSNavBarText' onClick={() => {dispatch(setFrstWin(false)); dispatch(setChooseMarket(1))}}>Catalog</div>
                    </div>
                    <div className='circleElemsBlock'>
                        <div className='circleElem'><img src={money} alt=""/><textarea onChange={e => setTextCircleItem1(e.target.value)} value={textCircleItem1} defaultValue={currTexts.textCircleItem1}>{textCircleItem1}</textarea></div>
                        <div className='circleElem'><img src={maps} alt=""/><textarea onChange={e => setTextCircleItem2(e.target.value)}  value={textCircleItem2} defaultValue={currTexts.textCircleItem2}>{textCircleItem2}</textarea></div>
                        <div className='circleElem'><img src={cloud} alt=""/><textarea onChange={e => setTextCircleItem3(e.target.value)} value={textCircleItem3} defaultValue={currTexts.textCircleItem3}>{textCircleItem3}</textarea></div>
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
                <div className='rightS'>
                    <div className='rightSWindowSmart' style={{position: 'absolute', top: '10px'}}>
                        <textarea name="" id="" onChange={e => setTextOptionsTitle(e.target.value)} value={textOptionsTitle} defaultValue={currTexts.textOptionsTitle}>
                        {textOptionsTitle}
                        </textarea>
                    </div>
                    <div className='rightSpointsBlock' style={{marginTop: '0px'}}>
                        <div><span>01</span><textarea onChange={e => setTextOptionsTitleName1(e.target.value)}  value={textOptionsTitleName1} defaultValue={currTexts.textOptionsTitleName1}>{textOptionsTitleName1}</textarea></div>
                        <textarea onChange={e => setTextOptionsTitle1(e.target.value)}  value={textOptionsTitle1} defaultValue={currTexts.textOptionsTitle1}>
                        {textOptionsTitle1}
                        </textarea>
                    </div>
                    <div className='rightSpointsBlock'>
                        <div><span>02</span><textarea onChange={e => setTextOptionsTitleName2(e.target.value)}  value={textOptionsTitleName2} defaultValue={currTexts.textOptionsTitleName2}>{textOptionsTitleName2}</textarea></div>
                        <textarea onChange={e => setTextOptionsTitle2(e.target.value)}  value={textOptionsTitle2} defaultValue={currTexts.textOptionsTitle2}>
                        {textOptionsTitle2}
                        </textarea>

                    </div>
                    <div className='rightSpointsBlock'>
                        <div><span>03</span><textarea onChange={e => setTextOptionsTitleName3(e.target.value)}  value={textOptionsTitleName3} defaultValue={currTexts.textOptionsTitleName3}>{textOptionsTitleName3}</textarea></div>
                        <textarea onChange={e => setTextOptionsTitle3(e.target.value)}  value={textOptionsTitle3} defaultValue={currTexts.textOptionsTitle3}>{textOptionsTitle3}</textarea>
                    </div>
                        <div className='rightSbuttonTwo rightSbuttonLeft' style={{width: '100%', height: '80px', position: 'absolute', bottom: '10px'}} onClick={() => {dispatch(setFrstWin(false)); dispatch(setChooseMarket(1))}}>
                            Smart order (-40%)
                        </div>
                </div>
            }
            {   currOpen == 3 &&
                <div className='rightS'>
                    <div className='rightSWindowSmart'>
                        <textarea style={{height: '150px'}} onChange={e => setLastText(e.target.value)}  value={lastText} defaultValue={currTexts.lastText}>
                        {lastText}
                        </textarea>
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
            <div className='buttonSave' onClick={() => crt()}>Save</div>
        </div>
    );
};

export default FirstWindowV2;