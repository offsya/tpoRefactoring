import React, {useEffect, useState} from 'react';
import {setChooseWeeks} from "../../../features/chooseWeeks";
import {changeWorkDay} from "../../../features/chooseWorksDays"
import {useDispatch, useSelector} from "react-redux";
import {setWorksDayArray} from '../../../features/chooseWorksDays'
import {setCartElemQuantityValue} from "../../../features/allCartItems";
import {setCalendOpen} from "../../../features/calendOpen";
import {setCheckFrstCalendOpen} from "../../../features/checkFrstCalendOpen";
import {notification, Space} from "antd";

const CalendDef = ({setOrderAddress, setOrderDesc}) => {
    const seeOptions = useSelector((state) => state.seeOptions.seeOptions)
    const dispatch = useDispatch()
    const chooseWeeks = useSelector((state) => state.chooseWeeks.chooseWeeks)
    const worksDays = useSelector((state) => state.worksDay.worksDaysArray)
    const allItemsCart = useSelector((state) => state.allCartItems.allItemsCart)
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    console.log(worksDays)
    console.log(chooseWeeks)
    Date.prototype.daysInMonth = function() {
        return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
    };

    let DaysInMonth=[]
    for (let i=1;i<=new Date().daysInMonth();i++){
        DaysInMonth.push(i)
    }

    const Months={
        1 : 'January',
        2 : 'February',
        3 : 'March',
        4 : 'April',
        5 : 'May',
        6 : 'June',
        7 : 'July',
        8 : 'August',
        9 : 'September',
        10 : 'October',
        11 : 'November',
        12 : 'December'}

    const threeDays = DaysInMonth.map((elem, index) => {
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

    useEffect(() => {
        allItemsCart.forEach((elem) => {
            dispatch(setCartElemQuantityValue({value: elem.minQt * (chooseWeeks != 3 ? chooseWeeks != 1 ? 4.5 : 2 : 1), elem: elem}))
        })
    }, [chooseWeeks])

    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement) => {
        api.warning({
            message: `No hay reparto los Miércoles y Domingos.`,
            placement,
        });
    };


    return (
        <div className="calendDef">
            <>
                {contextHolder}
                <Space>

                </Space>
            </>
                <div className="changeWeeks">
                    <div className="changeWeekButton" style={{background: chooseWeeks == 3 ? '#FFFFFF' : '#F5F4F2', border: chooseWeeks == 3 ? '1px solid #969696' : 'none'}} onClick={() => {dispatch(setChooseWeeks(3))}}>11:00/14:30</div>
                    <div className="changeWeekButton" style={{background: chooseWeeks == 1 ? '#FFFFFF' : '#F5F4F2', border: chooseWeeks == 1 ? '1px solid #969696' : 'none'}} onClick={() => {dispatch(setChooseWeeks(1))}}>16:00/19:00</div>
                </div>
                <div className="calendMounth">
                    {Months[new Date().getMonth()+1] +" " +new Date().getFullYear() }

                </div>
                <div>
                    {
                        // chooseWeeks == 3 ?
                            <div>
                                <div className="calendDaysThree calendDaysThreeDef">
                                    {
                                        [1,2,3,4,5,6,7].map((elem, index) => {
                                            let weekDay = new Date(Date.now() + 3600000 * 24 * (elem));
                                            return <span style={{color: (weekDay.getDay() == 0 || weekDay.getDay() == 3) ? '#F46363' : 'black'}}>{weekDays[weekDay.getDay()]}</span>
                                        })
                                    }
                                </div>
                                <div className="calendDaysNumbersThree calendDaysNumbersDef">
                                    {
                                        DaysInMonth.map(elem => {
                                            let dateNow = Date.now() + 3600000 * 24 * (elem);
                                            let date = new Date(dateNow);
                                            let currentDate = date.getDate() + '.' + (parseInt(date.getMonth())+1) + '.' + date.getFullYear()
                                            return <span onClick={() => {
                                                if(date.getDay() == 0 || date.getDay() == 3){
                                                    openNotification('top')
                                                }else{
                                                    dispatch(changeWorkDay(currentDate))
                                                }
                                            }} className="calenSpanElem" style={{border:  worksDays.includes(currentDate) ? '1px solid #5FC56E' : '', color: (date.getDay() == 0 || date.getDay() == 3) ? '#F46363' : 'black'}}>{new Date(Date.now() + 3600000 * 24 * (elem)).getDate()}</span>
                                        })
                                    }
                                </div>
                            </div>


                    }
                </div>
        </div>
    );
};

export default CalendDef;