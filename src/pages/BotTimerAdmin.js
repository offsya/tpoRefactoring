import React, {useEffect, useMemo, useState, useRef} from 'react';
import "react-datepicker/dist/react-datepicker.css";
import "../BotTimer.css"
import axios from "axios";
import dayjs from 'dayjs';
import {Button, Input, Select, DatePicker} from 'antd';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';


const tg = window.Telegram.WebApp;


var usr = tg.initDataUnsafe?.user;
// usr = {id: 591254360,
//     first_name: 'Yury',
//     last_name: 'Chyrko',
//     username: 'offsya111168',
//     language_code: 'ru'
// }
// var queryId = tg.initDataUnsafe?.user.id;


const BotTimerAdmin = () => {
    const [cont, setCont] = useState('Add')
    const [recentWork, setRecentWork] = useState(false)
    const today = new Date();
    const [fieldValue, setFieldValue] = useState(new Date());
    const [updateDateForPicker, setUpdateDateForPicker] = useState(new Date());
    const [fieldTouched, setFieldTouched] = useState('');
    const [currentDate, setCurrentDate] = useState(new Date().getDate() + '.' + (new Date().getMonth() + 1) + '.' + new Date().getFullYear())
    const [timeStart, setTimeStart] = useState('');
    const [timeEnd, setTimeEnd] = useState('');
    const [price, setPrice] = useState('')
    const [allPersonWorks, setAllWorksPerson] = useState([])
    const [modalPass, setModalPass] = useState(true);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [currentPass, setCurrentPass] = useState('');
    const [updateWindow, setUpdateWindow] = useState(false);
    const [allWorks, setAllWorks] = useState([])
    const [search, setSearch] = useState('')
    const [updateModal, setUpdateModal] = useState(false);
    const [updateDate, setUpdateDate] = useState('')
    const [updateStart, setUpdateStart] = useState('')
    const [updateEnd, setUpdateEnd] = useState('')
    const [updatePrice, setUpdatePrice] = useState('')
    const [currentElementForUpdate, setCurrentElementForUpdate] = useState({});
    const [changePriceModal, setChangePriceModal] = useState(false)
    const [allPersons, setAllPersons] = useState([])
    const [updateCurrentPrice, setUpdateCurrentPrice] = useState(false)
    const [currentElementForUpdateCurrentPrice, setCurrentElementForUpdateCurrentPrice] = useState({})
    const [updateNewCurrentPrice, setUpdateNewCurrentPrice] = useState('')
    const [updateNewCurrentPay, setUpdateNewCurrentPay] = useState('')
    const [effectUpdate, setEffectUpdate] = useState(true);
    const [changeName, setChangeName] = useState(true);
    const [payment, setPayment] = useState('');
    const [message, setMessage] = useState('');
    const [timer, setTimer] = useState(false);
    const [modalTimer, setModalTimer] = useState(true);
    const [currentDateNow, setCurrentDateNow] = useState(0);
    const [notificationTime, setNotificationTime] = useState('');
    const [currentWork, setCurrentWork] = useState({});
    const [newModal, setNewModal] = useState(true);
    const [selectWork, setSeletWork] = useState('');
    const [modalDisplayForDelete, setModalDisplayForDelete] = useState(false);
    const [selectOptions, setSelectOptions] = useState([
        {value: '1', label: "Facturas de compra"},
        {value: '2', label: "Facturas de venta"},
        {value: '3', label: "Nuevos productos"},
        {value: '4', label: "Soporte picking PLM"},
        {value: '5', label: "Total facturas Margen"},
        {value: '6', label: "Holded reportes"}
    ]);

    const [time, setTime] = useState(0);

    useEffect(() => {
        setCont('Add')
    }, [fieldValue])
    useEffect(() => {
        axios.post('https://tpomobi.shop/checkUser', {
            "user": usr// usr
        }).then(function (response) {
            setPrice(response.data.price);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, [])
    useEffect(() => {
        axios.post('https://tpomobi.shop/findAllPersonWorks', {
            "user": usr // usr
        }).then(function (response) {
            console.log(response.data);
            setAllWorksPerson(response.data);
        })
            .catch(function (error) {
                console.log(error);
            });



        axios.get('https://tpomobi.shop/getAllWorks').then(function (response) {
            setAllWorks(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
        axios.get('https://tpomobi.shop/getAllPersons').then(function (response) {
            setAllPersons(response.data)
        })
            .catch(function (error) {
                console.log(error);
            });
    }, [effectUpdate])

    useEffect(() => {
        axios.post('https://tpomobi.shop/findCurrentWork', {
            "user": usr// usr
        }).then(function (response) {
            setCurrentWork(response.data);
            if(response.data.timeNow){
                setTime(Date.now() - response.data.timeNow)

            }
            console.log(response.data)
        })
            .catch(function (error) {
                console.log(error);
            });
    }, [effectUpdate])

    useEffect(() => {
        if(time != 0){
            handleStart();
        }
    }, [time])

    const allTotalPayment = useMemo(() => {
        if(allPersons && allWorks){
            let all = allPersons.map(person => {
                let total = 0;
                allWorks.forEach((e, index) => {
                    if(person.id == e.idUser){
                        let currentPrice = (((parseFloat(e.price)/60) * ((parseInt(e.end.split(':')[0]) * 60 + parseInt(e.end.split(':')[1])) - (parseInt(e.start.split(':')[0]) * 60 + parseInt(e.start.split(':')[1])))).toFixed(2));
                        console.log(currentPrice)
                        total = total + (parseInt(e.end.split(':')[0]) && parseInt(e.start.split(':')[0]) ? parseFloat(currentPrice) : parseFloat(e.howMuch.replace(',', '.')));
                    }
                })
                return {id: person.id, total: total}
            })
            return all
        }else{
            return []
        }
    }, [allWorks, allPersons])

    const totalForSend = useMemo(() => {
        if(timeStart != '' && timeEnd != '' && parseInt(price)){
            let start = parseInt(timeStart.split(':')[0]) * 60 + parseInt(timeStart.split(':')[1])
            let end = parseInt(timeEnd.split(':')[0]) * 60 + parseInt(timeEnd.split(':')[1])
            let total = (parseFloat(price)/60) * (end - start);
            return total.toFixed(2)
        }else{
            return ''
        }
    }, [timeStart, timeEnd])
    const totalForUpdate = useMemo(() => {
        if(updateStart != '' && updateEnd != '' && parseInt(updatePrice)){
            let start = parseInt(updateStart.split(':')[0]) * 60 + parseInt(updateStart.split(':')[1])
            let end = parseInt(updateEnd.split(':')[0]) * 60 + parseInt(updateEnd.split(':')[1])
            let total = (parseFloat(updatePrice)/60) * (end - start);
            return total.toFixed(2)
        }else{
            return currentElementForUpdate.total
        }
    }, [updateStart, updateEnd, updatePrice])





        const [running, setRunning] = useState(false);
        const intervalRef = useRef(null);

        function handleStart() {
            if (!running && (notificationTime || time != 0)) {
                const startTime = Date.now() - time;
                intervalRef.current = setInterval(() => {
                    setTime(Date.now() - startTime)
                }, 10);
                setRunning(true);
            }
        }

        function handleStop() {
            if (running) {
                clearInterval(intervalRef.current);
                setRunning(false);
            }
        }

    function formatTime(ms) {
        const hours = Math.floor(ms / 3600000);
        const minutes = Math.floor((ms % 3600000) / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const centiseconds = Math.floor((ms % 1000) / 10);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    const sendData = () => {
        if(usr && (timeEnd || timeStart)){
            axios.post('https://tpomobi.shop/addStats', {
                "stats": {
                    "date": currentDate,
                    "start": timeStart,
                    "end": timeEnd,
                    "price": price,
                    "idUser": usr.id,
                    "total": totalForSend,
                    "pay": "0",
                    "message": message,
                    "timeNow": '',
                    "notifyTime": '',
                    "current": '0',
                    "usrData": usr
                }
            }).then(function (response) {
                console.log(response.data);
                setTimeStart('');
                setTimeEnd('');
                setMessage('');
                setAllWorksPerson(response.data);
                setEffectUpdate((prev) => !prev)
            })
                .catch(function (error) {
                    console.log(error);
            });
        }else{
            setCont("Change Time")
        }
    }

    const deleteData = () => {
        axios.post('https://tpomobi.shop/deleteStats', { //tpomobi.shop
            "stats": currentElementForUpdate
        }).then(function (response) {
            console.log(response.data);
            setEffectUpdate((prev) => !prev)
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    const updateData = () => {
            axios.post('https://tpomobi.shop/updateStats', { //tpomobi.shop
                "stats": {
                    "date": updateDate,
                    "start": updateStart,
                    "end": updateEnd,
                    "price": updatePrice,
                    "_id": currentElementForUpdate._id,
                    "total": totalForUpdate,
                    "pay": payment,
                    "message": "",
                    "usrData": currentElementForUpdate
                }
            }).then(function (response) {
                console.log(response.data);
                setEffectUpdate((prev) => !prev)
            })
                .catch(function (error) {
                    console.log(error);
                });
    }

    const sendDataTimer = (dateNow) => {
        if(usr){
            setCurrentDateNow(dateNow);
            axios.post('http://localhost:2222/addStatsTimer', {
                "stats": {
                    "date": currentDate,
                    "start": (new Date(dateNow).getHours() < 10 ? '0'+new Date(dateNow).getHours() : new Date(dateNow).getHours()) + ':' + (new Date(dateNow).getMinutes() < 10 ? '0'+new Date(dateNow).getMinutes() : new Date(dateNow).getMinutes()),
                    "end": '',
                    "price": price,
                    "idUser": usr.id,
                    "total": totalForSend,
                    "pay": "0",
                    "message": message,
                    "timeNow": dateNow,
                    "notifyTime": '1',
                    "current": '1',
                    "cronInfo": '',
                    "usrData": usr
                }
            }).then(function (response) {
                console.log(response.data);
                setTimeStart('');
                setTimeEnd('');
                setMessage('');
                setEffectUpdate((prev) => !prev)
            })
                .catch(function (error) {
                    console.log(error);
                });
        }else{
            setTimer(true)
        }
    }


    const updateDataTimer = () => {
        if(usr && currentWork){
            axios.post('http://localhost:2222/updateDataTimer', {
                "stats": {
                    "date": currentDate,
                    "start": '',
                    "end": (new Date().getHours() < 10 ? '0'+new Date().getHours() : new Date().getHours()) + ':' + (new Date().getMinutes() < 10 ? '0'+new Date().getMinutes() : new Date().getMinutes()),
                    "price": price,
                    "idUser": usr.id,
                    "total": totalForSend,
                    "pay": "0",
                    "message": message,
                    "timeNow": '',
                    "current": '0',
                    "_id": currentWork._id,
                    "notifyTime": notificationTime,
                    "cronInfo": currentWork.cronInfo,
                    "usrData": usr
                }
            }).then(function (response) {
                console.log(response.data);
                setTimeStart('');
                setTimeEnd('');
                setMessage('');
                setCurrentWork({});
                setEffectUpdate((prev) => !prev)
                setTime(0)
            })
                .catch(function (error) {
                    console.log(error);
                });
        }else{
            setTimer(true)
        }
    }

    const updatePriceNew = () => {
            console.log((parseFloat(currentElementForUpdateCurrentPrice.pay)))
            console.log(parseFloat(updateNewCurrentPay ? updateNewCurrentPay : '0'))
            axios.post('https://tpomobi.shop/updatePrice', { //tpomobi.shop
                "stats": {
                    "price": updateNewCurrentPrice,
                    "pay": (parseFloat(currentElementForUpdateCurrentPrice.pay) + parseFloat(updateNewCurrentPay ? updateNewCurrentPay : '0')).toFixed(2),
                    "id": currentElementForUpdateCurrentPrice.id
                }
            }).then(function (response) {
                console.log(response.data);
                setUpdateNewCurrentPay('');
                setEffectUpdate((prev) => !prev)
            })
                .catch(function (error) {
                    console.log(error);
                });

    }

    return (
        <div className="botTimerBody">
            { recentWork ?
                <div>

                    <div className="allWorksBotTimer" style={{height: '90vh'}}>
                        <table className="table" cellSpacing="0">
                        <tr>
                            <th>work</th>
                            <th>data</th>
                            <th>time</th>
                            <th>price</th>
                        </tr>
                        {allPersonWorks.map((e, index) => {
                            return <tr className="divButtonBotTimerRecent" style={{textAlign: 'center'}}><td>{e.message}</td> <td>{e.date}</td> <td>{e.start} - {e.end}</td> <td>{( (parseFloat(e.price)/60) * ((parseInt(e.end.split(':')[0]) * 60 + parseInt(e.end.split(':')[1])) - (parseInt(e.start.split(':')[0]) * 60 + parseInt(e.start.split(':')[1])))).toFixed(2)}€</td></tr>
                        })}
                        </table>
                    </div>
                    <div className="divButtonBotTimer"><button className="buttonBotTimerAllWorks" onClick={() => setRecentWork(false)}>Go Back</button></div>
                </div>
                :
                <div>
                    {
                        modalPass ?
                            <div>
                                {
                                    updateWindow ?
                                        <div style={{marginTop: '20px'}}>
                                            {
                                                updateModal ?
                                                    <div className="updateModal">
                                                        <div className="divButtonBotTimer" style={{fontSize: '24px', textAlign: 'center'}}>
                                                            {currentElementForUpdate.usrData.first_name}({currentElementForUpdate.usrData.username}) Date[{currentElementForUpdate.date}] Time[{currentElementForUpdate.start} - {currentElementForUpdate.end}] Price[{currentElementForUpdate.price}€] Total[{currentElementForUpdate.total}€] Payment[{currentElementForUpdate.pay}€]
                                                        </div>
                                                        <div className="divButtonBotTimer" style={{fontSize: '24px', textAlign: 'center'}}>
                                                            {currentElementForUpdate.message}
                                                        </div>
                                                        <br/>
                                                        <hr/>
                                                            <div className="divButtonBotTimer" style={{fontSize: '28px'}}>Choose New Date</div>
                                                        <DatePicker
                                                            selected={updateDateForPicker}
                                                            onChange={(e) => {
                                                                setUpdateDateForPicker(e)
                                                                setUpdateDate(new Date(e).getDate() + '.' + (new Date(e).getMonth() + 1) + '.' + new Date(e).getFullYear())
                                                            }}
                                                            placeholder="new Date"
                                                            dateFormat="MM.dd.yyyy"
                                                            className="form-control"
                                                        />

                                                            <div className="divButtonBotTimer" style={{fontSize: '28px'}}>Start Time</div>


                                                        <div className="divButtonBotTimer" style={{marginBottom: '10px'}}>
                                                            <LocalizationProvider dateFormats={"dd"} dateAdapter={AdapterDayjs}>
                                                                <MobileTimePicker className="mobileTimePick" ampm={false} onChange={(e) => setUpdateStart((parseInt(e["$H"]) < 10 ? '0' + e["$H"] : e["$H"]) + ":" + (parseInt(e["$m"]) < 10 ? '0' + e["$m"] : e["$m"]))} defaultValue={dayjs('00:00', 'HH:mm')} />
                                                            </LocalizationProvider>
                                                        </div>

                                                        {/*<TimePicker autoFocus={true} autoComplete={true} style={{marginRight: '30px', marginLeft: '30px', marginBottom: '15px'}} defaultValue={dayjs('00:00', 'HH:mm')} format='HH:mm' onChange={(e) => setUpdateStart((parseInt(e["$H"]) < 10 ? '0' + e["$H"] : e["$H"]) + ":" + (parseInt(e["$m"]) < 10 ? '0' + e["$m"] : e["$m"]))} placeholder='Example: 13:00' />*/}


                                                        <hr/>
                                                        <div className="divButtonBotTimer" style={{fontSize: '28px'}}>End Time</div>

                                                        <div className="divButtonBotTimer" style={{marginBottom: '10px'}}>
                                                            <LocalizationProvider dateFormats={"dd"} dateAdapter={AdapterDayjs}>
                                                                <MobileTimePicker className="mobileTimePick" ampm={false} minTime={dayjs().set('hour', parseInt(updateStart.split(':')[0]))} onChange={(e) => setUpdateEnd((parseInt(e["$H"]) < 10 ? '0' + e["$H"] : e["$H"]) + ":" + (parseInt(e["$m"]) < 10 ? '0' + e["$m"] : e["$m"]))} defaultValue={dayjs('00:00', 'HH:mm')} />
                                                            </LocalizationProvider>
                                                        </div>

                                                        {/*<TimePicker autoFocus={true} autoComplete={true} style={{marginRight: '30px', marginLeft: '30px', marginBottom: '15px'}} defaultValue={dayjs('00:00', 'HH:mm')} disabledHours={["11","12","13"]} format='HH:mm' onChange={(e) => setUpdateEnd((parseInt(e["$H"]) < 10 ? '0' + e["$H"] : e["$H"]) + ":" + (parseInt(e["$m"]) < 10 ? '0' + e["$m"] : e["$m"]))} placeholder='Example: 13:00' />*/}
                                                        <hr/>
                                                            <div className="divButtonBotTimer" style={{fontSize: '28px'}}>Price</div>
                                                            <input type="text" onChange={(e) => setUpdatePrice(e.target.value)} placeholder="new Price"/>
                                                        <div className="divButtonBotTimer" style={{fontSize: '28px'}}>Payment</div>
                                                        <input type="text" onChange={(e) => setPayment(e.target.value)} placeholder="Payment"/>
                                                        <div className="divButtonBotTimer" style={{marginTop: '-30px'}}><button className="buttonBotTimer" onClick={() => updateData()}>Send New Data</button><button className="buttonBotTimer" onClick={() => {setUpdateModal(false); setUpdatePrice(''); setUpdateDate(''); setUpdateEnd(''); setUpdateStart(''); setPayment('')}}>Go Back</button></div>
                                                    </div>
                                                    :
                                                <div>
                                                    {
                                                        changePriceModal ?
                                                            <div>
                                                                {
                                                                    updateCurrentPrice ?
                                                                        <div>
                                                                            <hr style={{marginTop: '150px'}}/>
                                                                            <div className="divButtonBotTimer" style={{fontSize: '28px'}}>Price</div>
                                                                            <input type="text" defaultValue={currentElementForUpdateCurrentPrice.price} onChange={(e) => setUpdateNewCurrentPrice(e.target.value)} placeholder="new Price"/>
                                                                            <div className="divButtonBotTimer" style={{fontSize: '28px'}}>Pay</div>
                                                                            <input type="text" onChange={(e) => {setUpdateNewCurrentPay(e.target.value == '' ? '0' : e.target.value); console.log(e.target.value)}} placeholder="Pay"/>
                                                                            <div className="divButtonBotTimer"><button className="buttonBotTimer" onClick={() => updatePriceNew() }>Add New Price</button><button className="buttonBotTimer" onClick={() => setUpdateCurrentPrice(false)}>Go Back</button></div>

                                                                        </div>
                                                                        :
                                                                        <div>
                                                                            <div  className="divButtonBotTimer" style={{fontSize: '28px', textAlign: 'center'}}><div>Scroll Bottom && Tap To Change</div></div>
                                                                            <div className="divButtonBotTimer"><input style={{width: '150px'}} onChange={(e) => setSearch(e.target.value)} placeholder="Name Search" type="text"/></div>
                                                                            <div className="allWorksBotTimer" style={{height: '70vh'}}>
                                                                                <table className="table" cellSpacing="0" >
                                                                                    <tr>
                                                                                        <th>{changeName ? "name" : "username"}</th>
                                                                                        <th>price</th>
                                                                                        <th>total</th>
                                                                                        <th>balance</th>
                                                                                        <th>payment</th>
                                                                                    </tr>
                                                                                {
                                                                                    allPersons.filter((e, index) => {if(e.first_name.toLowerCase().includes(search.toLowerCase())){return e}}).map((e, index) => {
                                                                                        console.log(allTotalPayment)
                                                                                        return <tr className="divButtonBotTimerRecent"><td onClick={() => setChangeName((prev) => !prev)}>{changeName ?  (e.first_name) : (e.username)}</td><td  onClick={() => {setUpdateCurrentPrice(true); setCurrentElementForUpdateCurrentPrice(e)}}>{e.price}€</td><td  onClick={() => {setUpdateCurrentPrice(true); setCurrentElementForUpdateCurrentPrice(e)}}>{((allTotalPayment[index]).total).toFixed(2)}€</td><td onClick={() => {setUpdateCurrentPrice(true); setCurrentElementForUpdateCurrentPrice(e)}}>{(parseFloat((allTotalPayment[index].total).toFixed(2)) - parseFloat(e.pay)).toFixed(2)}€</td><td onClick={() => {setUpdateCurrentPrice(true); setCurrentElementForUpdateCurrentPrice(e)}}>{parseFloat(e.pay).toFixed(2)}€</td></tr>
                                                                                    })
                                                                                }
                                                                                </table>
                                                                            </div>
                                                                            <div className="divButtonBotTimer"><button className="buttonBotTimerAllWorks" onClick={() => setChangePriceModal(false)}>Go Back</button></div>


                                                                        </div>


                                                                }
                                                            </div>
                                                            :
                                                            <div>

                                                                <div  className="divButtonBotTimer" style={{fontSize: '28px', textAlign: 'center'}}><div>Scroll Bottom && Tap To Change</div></div>
                                                                <div className="divButtonBotTimer"><input style={{width: '150px'}} onChange={(e) => setSearch(e.target.value)} placeholder="Name Search" type="text"/></div>
                                                                <div className="allWorksBotTimer" style={{height: '70vh'}}>
                                                                    <table className="table" cellSpacing="0">
                                                                        <tr>
                                                                            <th>{changeName ? "name" : "username"}</th>
                                                                            <th>work</th>
                                                                            <th>date</th>
                                                                            <th>pay</th>
                                                                            <th>del</th>
                                                                        </tr>
                                                                    {
                                                                        allWorks.filter((e) => {try{
                                                                            if(e.usrData.first_name.toLowerCase().includes(search.toLowerCase()) || e.date.includes(search)){return e}if(e.usrData.first_name.toLowerCase().includes(search.toLowerCase()) || e.date.includes(search)){return e}
                                                                        }catch (error) {
                                                                            return e
                                                                        }}).map((e, index) => {
                                                                                return <tr onClick={() => {setCurrentElementForUpdate(e); setUpdateDate(e.date); setUpdateStart(e.start); setUpdateEnd(e.end); setUpdatePrice(e.price); setPayment(e.pay)}} className="divButtonBotTimerRecent" style={{fontSize: '16px'}}><td onClick={() => setChangeName((prev) => !prev)}>{changeName ?  (e.usrData.first_name) : (e.usrData.username)}</td><td onClick={() => setUpdateModal(true)}>{e.message}({e.price}€)</td> <td onClick={() => setUpdateModal(true)}>{e.date + " (" + e.start + '-' + e.end + ')'}</td><td onClick={() => setUpdateModal(true)}>{ parseInt(e.end.split(':')[0]) && parseInt(e.start.split(':')[0]) ? ( (parseFloat(e.price)/60) * ((parseInt(e.end.split(':')[0]) * 60 + parseInt(e.end.split(':')[1])) - (parseInt(e.start.split(':')[0]) * 60 + parseInt(e.start.split(':')[1])))).toFixed(2) : (e.howMuch)}€</td><td onClick={() => {setCurrentElementForUpdate(e); setModalDisplayForDelete(true)}}>x</td></tr>
                                                                        })
                                                                    }
                                                                    </table>
                                                                    <div style={{display: modalDisplayForDelete ? 'flex' : 'none'}}>
                                                                    <div className="modalWindowForAdminDeleteAccess">
                                                                        <div  className="divButtonBotTimer" style={{fontSize: '16px', textAlign: 'center', position: 'absolute', top: '5px'}}>{currentElementForUpdate.usrData ? currentElementForUpdate.usrData.first_name : ' '}</div>
                                                                        <button onClick={() => {setModalDisplayForDelete(false); deleteData()}} className="buttonBotTimerAllWorks" >Yes</button>
                                                                        <button onClick={() => {setModalDisplayForDelete(false)}} className="buttonBotTimerAllWorks" >No</button>
                                                                        <div  className="divButtonBotTimer" style={{fontSize: '16px', textAlign: 'center', position: 'absolute', bottom: '15px'}}>{currentElementForUpdate.start ? currentElementForUpdate.start : ' '} - {currentElementForUpdate.end ? currentElementForUpdate.end : ' '}</div>
                                                                    </div>
                                                                    </div>
                                                                </div>
                                                                <div className="divButtonBotTimer"><button className="buttonBotTimerAllWorks" onClick={() => setChangePriceModal(true) }>Change Current Price</button></div>


                                                            </div>
                                                    }
                                                </div>
                                            }

                                        </div>
                                        :

                                        <div className="modalPassword">
                                            <div className="modalPassword1">
                                                <Input.Password
                                                    placeholder="input password"
                                                    onChange={(e) => {
                                                        setCurrentPass(e.target.value)
                                                        if(e.target.value == '12345'){
                                                            setUpdateWindow(true)
                                                        }
                                                    }
                                                    }
                                                    visibilityToggle={{visible: passwordVisible, onVisibleChange: setPasswordVisible}}
                                                />
                                                <Button style={{width: 80}}
                                                        onClick={() => setPasswordVisible((prevState) => !prevState)}>
                                                    {passwordVisible ? 'Hide' : 'Show'}
                                                </Button>
                                            </div>
                                        </div>
                                }

                            </div>
                            :
                            <div style={{marginTop: '0px'}}>

                                {/*<div className="divButtonBotTimer">*/}

                                {/*    {*/}
                                {/*        false &&*/}
                                {/*        <div>*/}
                                {/*            <button className="buttonBotTimerAllWorks" onClick={() => setModalPass(true)}>ADMIN ACCESS*/}
                                {/*            </button>*/}
                                {/*        </div>*/}
                                {/*    }*/}
                                {/*</div>*/}
                                {
                                    modalTimer ?
                                        <div>
                                            {
                                                newModal ?
                                                    <div className="divButtonBotTimer" style={{flexDirection: 'column', marginTop: '150px'}}>
                                                        <button className="buttonBotTimerAllWorks" onClick={() => setRecentWork(true)}>See
                                                            Recent Works
                                                        </button>
                                                        <button className="buttonBotTimerAllWorks" onClick={() => setNewModal(false)}>
                                                            Start New Work
                                                        </button>
                                                        <button className="buttonBotTimerAllWorks" onClick={() => setModalTimer(false)}>
                                                            Add Recent Work
                                                        </button>
                                                    </div>
                                                    :
                                                    <div>
                                                        {/*<div className="divButtonBotTimer">*/}
                                                        {/*    <div className="circleButtonMini" onClick={() => {setNotificationTime('15'); setTimer(false)}} style={{backgroundColor: notificationTime == '15' ? "green" : "teal"}}>15</div>*/}
                                                        {/*    <div className="circleButtonMini" onClick={() => {setNotificationTime('30'); setTimer(false)}} style={{backgroundColor: notificationTime == '30' ? "green" : "teal"}}>30</div>*/}
                                                        {/*    <div className="circleButtonMini" onClick={() => {setNotificationTime('45'); setTimer(false)}} style={{backgroundColor: notificationTime == '45' ? "green" : "teal"}}>45</div>*/}
                                                        {/*    <div className="circleButtonMini" onClick={() => {setNotificationTime('60'); setTimer(false)}} style={{backgroundColor: notificationTime == '60' ? "green" : "teal"}}>60</div>*/}
                                                        {/*</div>*/}
                                                        <div className="divButtonBotTimer">
                                                            <div className="divButtonBotTimer" style={{marginTop: "130px"}}><button className="buttonBotTimer circleButton" style={{ boxShadow: time == 0 ? '4px 4px 8px 0px rgba(34, 60, 80, 0.2)' : '2px 2px 10px 0px rgba(7, 159, 0, 0.2)'}} onClick={() => {
                                                                if(time == 0){
                                                                    handleStart(); sendDataTimer(Date.now()); setTimer(false);
                                                                }else{
                                                                    handleStop(); updateDataTimer();

                                                                }
                                                            }}>{time == 0 ? "Start" : formatTime(time)}</button></div>
                                                        </div>
                                                        <div>
                                                            <Select
                                                                size='large'
                                                                placeholder="Choose Work"
                                                                onChange={(value) => {
                                                                    setMessage(selectOptions[value-1].label)
                                                                }}
                                                                style={{
                                                                    width: 200,
                                                                    marginTop: 20,
                                                                    marginBottom: 20,
                                                                }}
                                                                options={selectOptions}
                                                            />
                                                        </div>
                                                        {/*<div className="divButtonBotTimer">{price}€</div>*/}
                                                        <div className="divButtonBotTimer">
                                                        </div>
                                                        <div className="divButtonBotTimer"><button className="buttonBotTimerAllWorks" onClick={() => setNewModal(true)}>Go Back</button></div>
                                                    </div>

                                            }
                                        </div>
                                        :

                                        <div>

                                            <div className="divButtonBotTimer" style={{textAlign: 'center', marginTop: '80px'}}>Add Recent Work Form
                                            </div>

                                            <div className="divButtonBotTimer">
                                                <DatePicker
                                                    size='large'
                                                    selected={fieldValue}
                                                    style={{
                                                        width: 200,
                                                        marginTop: 10,
                                                        marginBottom: 5,
                                                    }}
                                                    onClick={() => setCont('Add')}
                                                    onChange={(e) => {
                                                        setFieldValue(e);
                                                        setCurrentDate(new Date(e).getDate() + '.' + (new Date(e).getMonth() + 1) + '.' + new Date(e).getFullYear())

                                                    }}
                                                    dateFormat="MM.dd.yyyy"
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="divButtonBotTimer">
                                                <Select
                                                    size='large'
                                                    placeholder="Choose Work"
                                                    onChange={(value) => {
                                                        setMessage(selectOptions[value-1].label)
                                                    }}
                                                    style={{
                                                        width: 200,
                                                        marginTop: 5,
                                                        marginBottom: 10,
                                                    }}
                                                    options={selectOptions}
                                                    onClick={() => setCont('Add')}
                                                />
                                            </div>
                                            <div className="divButtonBotTimer2">
                                                <div className="divButtonBotTimer" style={{maxWidth: '150px'}}>
                                                    <LocalizationProvider dateFormats={"dd"} dateAdapter={AdapterDayjs}>
                                                        <MobileTimePicker className="mobileTimePick" ampm={false} onClick={() => setCont('Add')} onChange={(e) => {setCont('Add'); setTimeStart((parseInt(e["$H"]) < 10 ? '0' + e["$H"] : e["$H"]) + ":" + (parseInt(e["$m"]) < 10 ? '0' + e["$m"] : e["$m"]))}} defaultValue={dayjs('00:00', 'HH:mm')} />
                                                    </LocalizationProvider>
                                                </div>
                                                -
                                                <div className="divButtonBotTimer" style={{maxWidth: '150px'}}>
                                                    <LocalizationProvider dateFormats={"dd"} dateAdapter={AdapterDayjs}>
                                                        <MobileTimePicker className="mobileTimePick" ampm={false} minTime={dayjs().set('hour', parseInt(timeStart.split(':')[0]))} onChange={(e) => {setCont('Add'); setTimeEnd((parseInt(e["$H"]) < 10 ? '0' + e["$H"] : e["$H"]) + ":" + (parseInt(e["$m"]) < 10 ? '0' + e["$m"] : e["$m"]))}} defaultValue={dayjs('00:00', 'HH:mm')} />
                                                    </LocalizationProvider>
                                                </div>

                                                {/*<TimePicker autoFocus={true} autoComplete={true}  style={{marginRight: '30px'}} defaultValue={dayjs('00:00', 'HH:mm')} format='HH:mm' onChange={(e) => setTimeStart((parseInt(e["$H"]) < 10 ? '0' + e["$H"] : e["$H"]) + ":" + (parseInt(e["$m"]) < 10 ? '0' + e["$m"] : e["$m"]))} placeholder='Example: 13:00' />*/}
                                            </div>
                                            <div className="divButtonBotTimer2">

                                                {/*<TimePicker autoFocus={true} autoComplete={true} style={{marginRight: '30px'}} disabledHours={() => { Array.from({length: parseInt(timeStart.split(':')[0])}, (_, index) => index + 1)}} defaultValue={dayjs('00:00', 'HH:mm')} format='HH:mm' onChange={(e) => setTimeEnd((parseInt(e["$H"]) < 10 ? '0' + e["$H"] : e["$H"]) + ":" + (parseInt(e["$m"]) < 10 ? '0' + e["$m"] : e["$m"]))} placeholder='Example: 13:00' />*/}
                                            </div>
                                            <div className="divButtonBotTimer"><button style={{fontSize: '20px'}} className="buttonBotTimer" onClick={() => {if(message != '' && timeStart != '' && timeEnd != ''){setCont('Okey!'); sendData()}else{setCont('Error, add more info!')}}}>{cont}</button>
                                                <div className="divButtonBotTimer"><button style={{marginTop: "30px"}} className="buttonBotTimerAllWorks" onClick={() => setModalTimer(true)}>Go Back</button></div>
                                            </div>
                                            {/*<div className="divButtonBotTimer">Price: {price}€</div>*/}
                                        </div>

                                }


                            </div>
                    }
                    </div>

            }

        </div>
    );
};

export default BotTimerAdmin;