import React, {useEffect} from 'react';
import './ModalWindow.scss'
import { CgClose } from 'react-icons/cg';
import {useDispatch, useSelector} from "react-redux";
import {setChooseWeeks} from "../../../features/chooseWeeks";
import {changeWorkDay, setWorksDayArray} from "../../../features/chooseWorksDays";
import {setCalendOpen} from "../../../features/calendOpen";
import {setCheckFrstCalendOpen} from "../../../features/checkFrstCalendOpen";
import {setCartElemQuantityValue} from "../../../features/allCartItems";

const CalendModalMobile = ({setSeeCalend, setCheck}) => {
    const seeOptions = useSelector((state) => state.seeOptions.seeOptions)
    const dispatch = useDispatch()
    const check = useSelector((state) => state.checkFrstCalendOpen.checkFrstCalendOpen)
    const chooseWeeks = useSelector((state) => state.chooseWeeks.chooseWeeks)
    console.log(chooseWeeks)
    const worksDays = useSelector((state) => state.worksDay.worksDaysArray)
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const allItemsCart = useSelector((state) => state.allCartItems.allItemsCart)

    const threeDays = [1,2,3].map((elem, index) => {
        let dateNow = Date.now() + 3600000 * 24 * (elem);
        let date = new Date(dateNow);
        let currentDate = date.getDate() + '.' + date.getMonth() + '.' + date.getHours()
        return currentDate
    })
    const oneWeeks = [1,2,3,4,5,6,7].map((elem, index) => {
        let dateNow = Date.now() + 3600000 * 24 * (elem);
        let date = new Date(dateNow);
        let currentDate = date.getDate() + '.' + date.getMonth() + '.' + date.getHours()
        return currentDate
    })
    const twoWeeks = [1,2,3,4,5,6,7, 8, 9, 10, 11, 12, 13, 14].map((elem, index) => {
        let dateNow = Date.now() + 3600000 * 24 * (elem);
        let date = new Date(dateNow);
        let currentDate = date.getDate() + '.' + date.getMonth() + '.' + date.getHours()
        return currentDate
    })
    useEffect(() => {
        allItemsCart.forEach((elem) => {
            dispatch(setCartElemQuantityValue({value: elem.minQt * (chooseWeeks != 3 ? chooseWeeks != 1 ? 4.5 : 2 : 1), elem: elem}))
        })
    }, [chooseWeeks])
    return (
        <div className='modal' onClick={() => {dispatch(setCalendOpen(false)); dispatch(setCheckFrstCalendOpen(false))}}>
            <div className='calendModalMobile' onClick={(e) => e.stopPropagation()}>
                <div className='seeCalendTitleText'><span>C</span>alendar <CgClose className="closeButton" onClick={() => { dispatch(setCalendOpen(false)); dispatch(setCheckFrstCalendOpen(false))}}/></div>
                <span className='calendBetterText'>
                    Which day suits me better
                </span>
                <div className="calendForModal">
                    <div className="changeWeeks">
                        <div className="changeWeekButton" style={{background: chooseWeeks == 3 ? '#FFFFFF' : '#F5F4F2', border: chooseWeeks == 3 ? '1px solid #969696' : 'none'}} onClick={() => {dispatch(setChooseWeeks(3)); dispatch(setWorksDayArray(threeDays))}}>a 3 days</div>
                        <div className="changeWeekButton" style={{background: chooseWeeks == 1 ? '#FFFFFF' : '#F5F4F2', border: chooseWeeks == 1 ? '1px solid #969696' : 'none'}} onClick={() => {dispatch(setChooseWeeks(1)); dispatch(setWorksDayArray(oneWeeks))}}>a week</div>
                        <div className="changeWeekButton" style={{background: chooseWeeks == 2 ? '#FFFFFF' : '#F5F4F2', border: chooseWeeks == 2 ? '1px solid #969696' : 'none'}} onClick={() => {dispatch(setChooseWeeks(2)); dispatch(setWorksDayArray(twoWeeks))}}>a 2 week</div>
                    </div>
                    <div className="calendMounth">
                        March 2023
                    </div>
                    <div className='calendDaysModalMobile'>
                        {
                            chooseWeeks == 3 ?
                                <div>
                                    <div className="calendDaysThree">
                                        {
                                            [1,2,3].map((elem, index) => {
                                                let weekDay = new Date(Date.now() + 3600000 * 24 * (elem));
                                                return <span style={{color: (weekDay.getDay() == 0 || weekDay.getDay() == 6) ? '#F46363' : 'black'}}>{weekDays[weekDay.getDay()]}</span>
                                            })
                                        }
                                    </div>
                                    <div className="calendDaysNumbersThree">
                                        {
                                            [1,2,3].map(elem => {
                                                let dateNow = Date.now() + 3600000 * 24 * (elem);
                                                let date = new Date(dateNow);
                                                let currentDate = date.getDate() + '.' + date.getMonth() + '.' + date.getHours()
                                                return <span onClick={() => dispatch(changeWorkDay(currentDate))} className="calenSpanElem" style={{border:  worksDays.includes(currentDate) ? '1px solid #5FC56E' : ''}}>{new Date(Date.now() + 3600000 * 24 * (elem)).getDate()}</span>
                                            })
                                        }
                                    </div>
                                </div>

                                :

                                <div>
                                    <div className="calendDays">
                                        {
                                            [1,2,3,4,5,6,7].map((elem, index) => {
                                                let weekDay = new Date(Date.now() + 3600000 * 24 * (elem));
                                                return <span style={{color: (weekDay.getDay() == 0 || weekDay.getDay() == 6) ? '#F46363' : 'black'}}>{weekDays[weekDay.getDay()]}</span>
                                            })
                                        }
                                    </div>
                                    <div className="calendDaysNumbers">
                                        {
                                            [1,2,3,4,5,6,7].map(elem => {
                                                let dateNow = Date.now() + 3600000 * 24 * (elem);
                                                let date = new Date(dateNow);
                                                let currentDate = date.getDate() + '.' + date.getMonth() + '.' + date.getHours()
                                                return <span onClick={() => dispatch(changeWorkDay(currentDate))} className="calenSpanElem" style={{border:  worksDays.includes(currentDate) ? '1px solid #5FC56E' : ''}}>{new Date(Date.now() + 3600000 * 24 * (elem)).getDate()}</span>
                                            })
                                        }
                                    </div>
                                    {chooseWeeks == 2 &&
                                        <div className="calendDaysNumbers">
                                            {
                                                [8, 9, 10, 11, 12, 13, 14].map(elem => {
                                                    let dateNow = Date.now() + 3600000 * 24 * (elem);
                                                    let date = new Date(dateNow);
                                                    let currentDate = date.getDate() + '.' + date.getMonth() + '.' + date.getHours()
                                                    return <span onClick={() => dispatch(changeWorkDay(currentDate))} className="calenSpanElem" style={{border:  worksDays.includes(currentDate) ? '1px solid #5FC56E' : ''}}>{new Date(Date.now() + 3600000 * 24 * (elem)).getDate()}</span>
                                                })
                                            }
                                        </div>
                                    }
                                </div>
                        }
                    </div>
                </div>
                <div className='acceptButton' onClick={() => {dispatch(setCalendOpen(false)); dispatch(setCheckFrstCalendOpen(false))}}>
                    <div>
                        Accept
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CalendModalMobile;