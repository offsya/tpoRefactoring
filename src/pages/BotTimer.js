import React, {useEffect, useMemo, useState, useRef} from 'react';
import "react-datepicker/dist/react-datepicker.css";
import "../BotTimer.css"
import axios from "axios";
import dayjs from 'dayjs';
import {Button, Input, Select, DatePicker, Checkbox} from 'antd';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { BsArrowLeft } from 'react-icons/bs';
import { AiOutlinePause } from 'react-icons/ai';
import { VscDebugStart } from 'react-icons/vsc';

const tg = window.Telegram.WebApp;

// try{
//     window.parent.postMessage(JSON.stringify({'web_app_setup_closing_behavior': {need_confirmation: true}}))
//
// }catch (e){
//
// }

// try{
//     window.parent.postMessage('web_app_setup_closing_behavior', {
//         need_confirmation: true,
//     });
// }catch (e){
//
// }


var usr = tg.initDataUnsafe?.user;
// usr = {id: 129315419, //6160795668 Sasha
//     first_name: 'Yury',
//     last_name: 'Chyrko',
//     username: 'offsya111168',
//     language_code: 'ru'
// }
// var queryId = tg.initDataUnsafe?.user.id;



const BotTimer = () => {
    tg.isClosingConfirmationEnabled = true
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
    const [modalPass, setModalPass] = useState(false);
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
    const [separateDeal, setSeparateDeal] = useState(false);
    const [selectOptions, setSelectOptions] = useState([
        {value: '1', label: "Support picking PLM", time: '240'},
        {value: '2', label: "Facturas de venta", time: '60'},
        {value: '3', label: "Facturas de compra", time: '60'},
        {value: '4', label: "Create catalogs", time: '90'},
        {value: '5', label: "Change of prices", time: '90'},
        {value: '6', label: "Technical work with systems", time: '120'},
        {value: '7', label: "Daily (Extra) Delivery", time: '180'},
        {value: '8', label: "Picking AMB", time: '240'},
        {value: '9', label: "Picking ALP", time: '180'},
        {value: '10', label: "Zumos Producción ALP", time: '240'},
        {value: '11', label: "Compras diarias", time: '60'},
        {value: '12', label: "Сreación de textos", time: '90'},
        {value: '13', label: "Advertise & targeting", time: '90'},
        {value: '14', label: "Inventarios de almacén", time: '180'},
        {value: '15', label: "Traducción de los textos", time: '60'},
        {value: '16', label: "HR it dept", time: '60'},
        {value: '17', label: "Trabajo administradores grupos", time: '120'},
        {value: '18', label: "Modelos de negocio", time: '120'},
        {value: '19', label: "Daily Rate", time: '0'},
        {value: '20', label: "Separate Deal", time: '0'},
        {value: '21', label: "Create Telegram account", time: '30'},
        {value: '22', label: "Creating a promo concept", time: '120'},
        {value: '23', label: "Inventarios de almacén", time: '0'}
    ]);

    const [selectOptionsDisable, setSelectOptionsDisable] = useState([
        {value: '1', label: "Coming soon", time: '2'},
        {value: '2', label: "Coming soon", time: '4'},
        {value: '3', label: "Coming soon", time: '6'},
        {value: '4', label: "Coming soon", time: '8'},
        {value: '5', label: "Coming soon", time: '10'},
        {value: '6', label: "Coming soon", time: '12'}
    ]);
    const inputRef = useRef(null);


    const [howMuch, setHowMuch] = useState('');
    const [howMuchInfo,setHowMuchInfo] = useState('');


    const handleInputClick = () => {
        inputRef.current.blur();
    }

    const [checkBox, setCheckBox] = useState(false)

    const onChange = (e) => {
        setCheckBox(e.target.checked)
    };

    const [pause, setPause] = useState(false);
    const [pauseArray, setPauseArray] = useState([]);
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
            setAllWorksPerson(response.data);
        })
            .catch(function (error) {
                console.log(error);
            });

        //
        // axios.get('https://tpomobi.shop/getAllWorks').then(function (response) {
        //     console.log()
        //     let all = response.data.filter(elem => elem.idUser == 129315419)
        //     all.forEach(qwe => parseFloat(qwe.total) != parseFloat(qwe.payment) && console.log(qwe.howMuch + ' | ' + qwe.payment + ' = ' + qwe.total + ' mondayId = ' + qwe.mondayId + ' ' + qwe.date))
        // })

        //
        // axios.get('https://tpomobi.shop/getAllWorks').then(function (response) {
        //     setAllWorks(response.data)
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });
        // axios.get('https://tpomobi.shop/getAllPersons').then(function (response) {
        //     setAllPersons(response.data)
        // })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
    }, [effectUpdate, recentWork])

    useEffect(() => {
        axios.post('https://tpomobi.shop/findCurrentWork', {
            "user": usr// usr
        }).then(function (response) {
            setCurrentWork(response.data);
            setPauseArray(response.data.pauseArray)
            if(response.data.timeNow){
                setTime(Date.now() - response.data.timeNow)
            }
        })
            .catch(function (error) {
                console.log(error);
            });
    }, [effectUpdate])

    useEffect(() => {
        if(time != 0 && pause){
            handleStart();
        }
    }, [time])


    useEffect(() => {
        if(Math.floor((time/10)) == parseInt(currentWork.notifyTime) * 60 * 100){
            handleStop()
        }
    }, [time, currentWork])

    const pauseTime = useMemo(() => {
        let array = pauseArray;
        if(array) {
            let even = [], odd = [];
            for (let i = 0; i < array.length; i++) {
                if (i % 2 === 0) {
                    even.push(array[i]);
                } else {
                    odd.push(array[i]);
                }
            }

// Считаем время между каждой парой элементов
            const timeDiffs = [];
            for (let i = 0; i < Math.min(even.length, odd.length); i++) {
                const timeDiff = Math.abs(odd[i] - even[i]);
                timeDiffs.push(timeDiff);
            }

            return timeDiffs.reduce(function(sum, elem) {
                return sum + elem;
            }, 0);
        }else{
            return 0
        }
    }, [pauseArray])

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
        if(usr && (timeEnd || timeStart) || (howMuch)){
            axios.post('https://tpomobi.shop/addStats', {
                "stats": {
                    "date": currentDate,
                    "start": timeStart,
                    "end": timeEnd,
                    "price": price,
                    "idUser": usr.id,
                    "total": totalForSend,
                    "payment": "0",
                    "pay": "0",
                    "message": message,
                    "timeNow": '',
                    "notifyTime": '',
                    "current": '0',
                    "howMuch": howMuch,
                    "howMuchInfo": howMuchInfo,
                    "usrData": usr
                }
            }).then(function (response) {
                setTimeStart('');
                setHowMuchInfo('');
                setHowMuch('');
                setAllWorksPerson(response.data);
                setEffectUpdate((prev) => !prev);
            })
                .catch(function (error) {
                    console.log(error);
            });
        }else{
            setCont("Change Time")
        }
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
            axios.post('https://tpomobi.shop/addStatsTimer', {
                "stats": {
                    "date": currentDate,
                    "startMS": (Date.now()),
                    "start": (new Date(dateNow).getHours() < 10 ? '0'+new Date(dateNow).getHours() : new Date(dateNow).getHours()) + ':' + (new Date(dateNow).getMinutes() < 10 ? '0'+new Date(dateNow).getMinutes() : new Date(dateNow).getMinutes()),
                    "end": '',
                    "price": price,
                    "idUser": usr.id,
                    "total": totalForSend,
                    "pay": "0",
                    "message": message,
                    "timeNow": dateNow,
                    "notifyTime": notificationTime,
                    "notifyDate": (new Date(dateNow + notificationTime*60000).getHours() + ":" + new Date(dateNow + notificationTime*60000).getMinutes()),
                    "notifyDateMin": (new Date(dateNow + Math.floor(notificationTime*0.663)*60000).getHours() + ":" + new Date(dateNow +Math.floor(notificationTime*0.663)*60000).getMinutes()),
                    "current": '1',
                    "cronInfo": '',
                    "cronInfo1": '',
                    "pauseArray": [],
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
            axios.post('https://tpomobi.shop/updateDataTimer', {
                "stats": {
                    "date": currentDate,
                    "start": '',
                    "end": (new Date().getHours() < 10 ? '0'+new Date().getHours() : new Date().getHours()) + ':' + (new Date().getMinutes() < 10 ? '0'+new Date().getMinutes() : new Date().getMinutes()),
                    "price": price,
                    "idUser": usr.id,
                    "total": totalForSend,
                    "pay": "0",
                    "message": currentWork.message,
                    "timeNow": '',
                    "current": '0',
                    "_id": currentWork._id,
                    "notifyTime": notificationTime,
                    "cronInfo": currentWork.cronInfo,
                    "cronInfo1": currentWork.cronInfo1,
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

            axios.post('https://tpomobi.shop/updatePrice', { //tpomobi.shop
                "stats": {
                    "price": updateNewCurrentPrice,
                    "id": currentElementForUpdateCurrentPrice.id
                }
            }).then(function (response) {
                console.log(response.data);
                setEffectUpdate((prev) => !prev)
            })
                .catch(function (error) {
                    console.log(error);
                });

    }



    const updatePauseArray = (array) => {

        axios.post('http://localhost:2222/updatePauseArray', { //tpomobi.shop
            "stats": {
                "pauseArray": array,
                "_id": currentWork._id,
            }
        }).then(function (response) {
            console.log(response.data);
        })
            .catch(function (error) {
                console.log(error);
            });

    }

    // const [fixedValueBuff, setFixedValueBuff] = useState(0);
    //
    // useEffect(() => {
    //     try{
    //         if(allPersons.find(e => e.id == usr.id).pay){
    //             console.log(allPersons.find(e => e.id == usr.id).pay)
    //             setFixedValueBuff( parseFloat(allPersons.find(e => e.id == usr.id).pay));
    //         }
    //     }catch (e) {
    //
    //     }
    // }, [allPersons])
    //
    // function checkTask(task, fixedValue) {
    //     try{
    //         if (parseFloat(task) <= parseFloat(fixedValue)) {
    //             setFixedValueBuff((prev) => prev - parseFloat(task));
    //             return true;
    //         } else {
    //             return false;
    //         }
    //     }catch (e) {
    //         return false
    //     }
    // }

    console.log(allWorks)

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
                            if((parseFloat(e.total) ? parseFloat(e.total) : 0) + (parseFloat(e.howMuch.replace(',', '.')) ? parseFloat(e.howMuch.replace(',', '.')) : 0)  > parseFloat(e.payment)){
                                if(e.howMuch && e.total){
                                    let time = ((parseFloat(e.price)/60) * ((parseInt(e.end.split(':')[0]) * 60 + parseInt(e.end.split(':')[1])) - (parseInt(e.start.split(':')[0]) * 60 + parseInt(e.start.split(':')[1])))).toFixed(2);
                                    console.log(time);
                                    console.log(e);
                                    return <tr className="divButtonBotTimerRecent" style={{textAlign: 'center', fontSize: '16px'}}><td>{e.message}</td> <td>{(e.date).split(".").map((s, i) => i === 2 ? s.slice(-2) : s.padStart(2, "0")).join(".")}</td> <td>{e.start} - {e.end} ({e.howMuchInfo})</td> <td>{e.total}€ ({parseFloat(e.howMuch.replace(',', '.'))}€)</td></tr>
                                }else if(e.howMuch){
                                    return <tr className="divButtonBotTimerRecent" style={{textAlign: 'center', fontSize: '16px'}}><td>{e.message}</td> <td>{(e.date).split(".").map((s, i) => i === 2 ? s.slice(-2) : s.padStart(2, "0")).join(".")}</td> <td>{e.howMuchInfo}</td> <td>{parseFloat(e.howMuch.replace(',', '.'))}€</td></tr>
                                }else{
                                    return <tr className="divButtonBotTimerRecent" style={{textAlign: 'center', fontSize: '16px'}}><td>{e.message}</td> <td>{(e.date).split(".").map((s, i) => i === 2 ? s.slice(-2) : s.padStart(2, "0")).join(".")}</td> <td>{e.start} - {e.end}</td> <td>{e.total}€</td></tr>
                                }
                            }
                        })}
                        </table>
                    </div>
                    <div className="divButtonBotTimer">

                        <button className="buttonBotTimerAllWorks" onClick={() => setRecentWork(false)}><BsArrowLeft/></button>
                        <div className="seePersonWorksFlex">

                            <div style={{fontSize: '14px'}}>
                                Payment:
                                {parseFloat(allPersonWorks.map(e => {
                                    if(e.payment) {
                                        return parseFloat(e.payment)
                                    }else{
                                        return 0
                                    }
                                }).reduce(function(sum, elem) {
                                    return parseFloat(sum) + parseFloat(elem);
                                }, 0)).toFixed(2)}
                                €

                            </div>
                            <div style={{marginLeft: '10px',fontSize: '14px'}}>
                                Balance:
                                {(( allPersonWorks.map((e, index) => {
                                    if(e.howMuch && e.total){
                                        let timePay = parseFloat(e.total)
                                        let howMuchPay = parseFloat(e.howMuch.replace(',', '.'));
                                        return (timePay + howMuchPay).toFixed(2);
                                    }else if(e.howMuch){
                                        return parseFloat(e.howMuch.replace(',', '.')).toFixed(2);
                                    }else{

                                        return parseFloat(e.total).toFixed(2)

                                    }
                                }).reduce(function(sum, elem) {
                                    return parseFloat(sum) + parseFloat(elem);
                                }, 0)) - parseFloat(allPersonWorks.map(e => {if(e.payment){return parseFloat(e.payment)}else{return 0}}).reduce(function(sum, elem) {
                                    return sum + elem;
                                }, 0))).toFixed(2)}
                                €

                            </div>
                            <div style={{marginLeft: '10px',fontSize: '14px'}}>
                                Total:
                                {
                                    allPersonWorks.map((e, index) => {
                                        if(e.howMuch && (e.end || e.start)){
                                            let timePay = parseFloat(e.total)
                                            let howMuchPay = parseFloat(e.howMuch.replace(',', '.'));
                                            return (timePay + howMuchPay).toFixed(2);
                                        }else if(e.howMuch){
                                            return parseFloat(e.howMuch.replace(',', '.'));
                                        }else{

                                            return parseFloat(e.total).toFixed(2)

                                        }


                                    }).reduce(function(sum, elem) {
                                        return parseFloat(sum) + parseFloat(elem);
                                    }, 0).toFixed(2)

                                }
                                €

                            </div>


                        </div>
                    </div>
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
                                                                <MobileTimePicker className="mobileTimePick" ampm={false} onChange={(e) => setUpdateEnd((parseInt(e["$H"]) < 10 ? '0' + e["$H"] : e["$H"]) + ":" + (parseInt(e["$m"]) < 10 ? '0' + e["$m"] : e["$m"]))} defaultValue={dayjs('00:00', 'HH:mm')} />
                                                            </LocalizationProvider>
                                                        </div>

                                                        {/*<TimePicker autoFocus={true} autoComplete={true} style={{marginRight: '30px', marginLeft: '30px', marginBottom: '15px'}} defaultValue={dayjs('00:00', 'HH:mm')} disabledHours={["11","12","13"]} format='HH:mm' onChange={(e) => setUpdateEnd((parseInt(e["$H"]) < 10 ? '0' + e["$H"] : e["$H"]) + ":" + (parseInt(e["$m"]) < 10 ? '0' + e["$m"] : e["$m"]))} placeholder='Example: 13:00' />*/}
                                                        <hr/>
                                                            <div className="divButtonBotTimer" style={{fontSize: '28px'}}>Price</div>
                                                            <input className='inputBotTimer' type="text" onChange={(e) => setUpdatePrice(e.target.value)} placeholder="new Price"/>
                                                        <div className="divButtonBotTimer" style={{fontSize: '28px'}}>Payment</div>
                                                        <input className='inputBotTimer' type="text" onChange={(e) => setPayment(e.target.value)} placeholder="Payment"/>
                                                        <div className="divButtonBotTimer" style={{marginTop: '-30px'}}><button className="buttonBotTimer" onClick={() => updateData()}>Send New Data</button><button className="buttonBotTimer" onClick={() => {setUpdateModal(false); setUpdatePrice(''); setUpdateDate(''); setUpdateEnd(''); setUpdateStart(''); setPayment('')}}><BsArrowLeft/></button></div>
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
                                                                            <input className='inputBotTimer' type="text" onChange={(e) => setUpdateNewCurrentPrice(e.target.value)} placeholder="new Price"/>
                                                                            <div className="divButtonBotTimer"><button className="buttonBotTimer" onClick={() => updatePriceNew() }>Add New Price</button><button className="buttonBotTimer" onClick={() => setUpdateCurrentPrice(false)}><BsArrowLeft/></button></div>

                                                                        </div>
                                                                        :
                                                                        <div>
                                                                            <div  className="divButtonBotTimer" style={{fontSize: '28px', textAlign: 'center'}}><div>Scroll Bottom && Tap To Change</div></div>
                                                                            <div className="divButtonBotTimer"><input className='inputBotTimer' style={{width: '150px'}} onChange={(e) => setSearch(e.target.value)} placeholder="Name Search" type="text"/></div>
                                                                            <div className="allWorksBotTimer">
                                                                                <table className="table" cellSpacing="0">
                                                                                    <tr>
                                                                                        <th>name</th>
                                                                                        <th>username</th>
                                                                                        <th>price</th>
                                                                                        <th>last</th>
                                                                                        <th>total</th>
                                                                                    </tr>
                                                                                {
                                                                                    allPersons.filter((e) => {if(e.first_name.toLowerCase().includes(search.toLowerCase()) || e.username.toLowerCase().includes(search.toLowerCase())){return e}}).map((e, index) => {
                                                                                        return <tr onClick={() => {setUpdateCurrentPrice(true); setCurrentElementForUpdateCurrentPrice(e)}} className="divButtonBotTimerRecent"><td>{index + 1}.{e.first_name}</td><td>({e.username})</td><td>{e.price}€</td></tr>
                                                                                    })
                                                                                }
                                                                                </table>
                                                                            </div>
                                                                            <div className="divButtonBotTimer"><button className="buttonBotTimerAllWorks" onClick={() => setChangePriceModal(false)}><BsArrowLeft/></button></div>


                                                                        </div>


                                                                }
                                                            </div>
                                                            :
                                                            <div>

                                                                <div  className="divButtonBotTimer" style={{fontSize: '28px', textAlign: 'center'}}><div>Scroll Bottom && Tap To Change</div></div>
                                                                <div className="divButtonBotTimer"><input className='inputBotTimer' style={{width: '150px'}} onChange={(e) => setSearch(e.target.value)} placeholder="Name Search" type="text"/></div>
                                                                <hr/>
                                                                <div className="allWorksBotTimer">
                                                                    <table className="table" cellSpacing="0">
                                                                        <tr>
                                                                            <th>{changeName ? "name" : "username"}</th>
                                                                            <th>date</th>
                                                                            <th>time</th>
                                                                            <th>price</th>
                                                                            <th>pay</th>
                                                                        </tr>
                                                                    {
                                                                        allWorks.filter((e) => {if(e.usrData.first_name.toLowerCase().includes(search.toLowerCase()) || e.usrData.username.toLowerCase().includes(search.toLowerCase())  || e.date.includes(search)){return e}}).map((e, index) => {
                                                                            return <tr onClick={() => {setCurrentElementForUpdate(e); setUpdateDate(e.date); setUpdateStart(e.start); setUpdateEnd(e.end); setUpdatePrice(e.price); setPayment(e.pay)}} className="divButtonBotTimerRecent"><td onClick={() => setChangeName((prev) => !prev)}>{changeName ? ((index + 1) + "." + e.usrData.first_name) : (index + 1) + "." +(e.usrData.username)}</td><td onClick={() => setUpdateModal(true)}>{e.date}</td> <td onClick={() => setUpdateModal(true)}>{e.start} - {e.end}</td> <td onClick={() => setUpdateModal(true)}>{e.price}€</td><td onClick={() => setUpdateModal(true)}>{parseFloat(e.total) - parseFloat(e.pay) ? parseFloat(e.total) - parseFloat(e.pay) : e.total}€</td></tr>
                                                                        })
                                                                    }
                                                                    </table>
                                                                </div>
                                                                <hr/>
                                                                <div className="divButtonBotTimer"><button className="buttonBotTimerAllWorks" onClick={() => setModalPass(false)}><BsArrowLeft/></button><button className="buttonBotTimerAllWorks" onClick={() => setChangePriceModal(true) }>Change Current Price</button></div>


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
                                            <div className="divButtonBotTimer"><button className="buttonBotTimerAllWorks" onClick={() => setModalPass(false)}><BsArrowLeft/></button></div>
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
                                                        <button className="buttonBotTimerAllWorks" onClick={() => setRecentWork(true)}>
                                                            My balance⚖️
                                                        </button>
                                                        <button className="buttonBotTimerAllWorks" style={{color: 'green'}} onClick={() => setNewModal(false)}>
                                                            Start New Work
                                                        </button>
                                                        <button className="buttonBotTimerAllWorks" onClick={() => {setModalTimer(false); setSeparateDeal(false)}}>
                                                            Add my work👩‍💻
                                                        </button>
                                                        <button className="buttonBotTimerAllWorks" onClick={() => {
                                                            setModalTimer(false);
                                                            setMessage("Separate Deal");
                                                            setNotificationTime("0");
                                                            setSeparateDeal(true);
                                                        }
                                                        }>
                                                            Spent my💰
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
                                                            <div disable className="divButtonBotTimer" style={{marginTop: "100px"}}><button disabled={true} className="buttonBotTimer circleButton" style={{ boxShadow: time == 0 ? '4px 4px 8px 0px rgba(34, 60, 80, 0.2)' : pause ? '2px 2px 10px 0px rgba(7, 159, 0, 0.2)' : '2px 2px 10px 0px rgba(240, 0, 32, 0.2)'}} onClick={() => {
                                                                    if(time == 0 && notificationTime != ''){
                                                                        setPause(true);
                                                                        handleStart(); sendDataTimer(Date.now()); setTimer(false);
                                                                    }else{
                                                                        if(Math.floor((time/10)) == parseInt(currentWork.notifyTime) * 60 * 100){
                                                                            handleStart();
                                                                        }else{
                                                                            handleStop(); updateDataTimer();
                                                                        }

                                                                    }
                                                            }}>{time == 0 ? notificationTime == '' ? 'Choose Work' : "Start" : formatTime(time)}</button>
                                                                <div
                                                                    style={{ boxShadow: time == 0 ? '4px 4px 8px 0px rgba(34, 60, 80, 0.2)' : pause ? '2px 2px 10px 0px rgba(7, 159, 0, 0.2)' : '2px 2px 10px 0px rgba(240, 0, 32, 0.2)'}}
                                                                    onClick={() => {
                                                                    setPause((prev) => !prev)
                                                                    updatePauseArray([...pauseArray, Date.now()])
                                                                    setPauseArray([...pauseArray, Date.now()])

                                                                        setRunning(false);
                                                                        handleStop()

                                                                    if(!pause){
                                                                        setRunning(true);
                                                                        handleStart()
                                                                    }


                                                                }} className='circleButtonPause'>
                                                                    {
                                                                        !pause && time != 0 ?
                                                                            <VscDebugStart/>
                                                                            :
                                                                            <AiOutlinePause/>

                                                                    }
                                                                </div>
                                                            </div>

                                                        </div>

                                                        <div>
                                                            <Select
                                                                size='large'
                                                                placeholder="Choose Work"
                                                                onChange={(value) => {
                                                                    //setMessage(selectOptions[value-1].label)
                                                                    //setNotificationTime(selectOptions[value-1].time)
                                                                }}
                                                                style={{
                                                                    width: 200,
                                                                    marginTop: 20,
                                                                    marginBottom: 20,
                                                                }}
                                                                options={selectOptionsDisable}
                                                            />
                                                        </div>
                                                        {notificationTime && <div className="averageTime">average time {notificationTime} min</div>}
                                                        <div className="divButtonBotTimer"><button className="buttonBotTimerAllWorks" onClick={() => {setNewModal(true); setNotificationTime('')}}><BsArrowLeft/></button>

                                                            <button className="buttonBotTimerAllWorks" style={{marginTop: "5px", fontSize: '16px'}} onClick={() => {setModalTimer(false); setNotificationTime(''); setNewModal(true);}}>
                                                                Add Recent Work
                                                            </button>
                                                        </div>

                                                    </div>

                                            }
                                        </div>
                                        :

                                        <div>

                                            <div className="divButtonBotTimer" style={{textAlign: 'center', marginTop: '15px', fontSize: '20px'}}>Add Work Form
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
                                                    ref={inputRef}
                                                    onClick={() => {setCont('Add'); handleInputClick()}}
                                                    onChange={(e) => {
                                                        setFieldValue(e);
                                                        setCurrentDate(new Date(e).getDate() + '.' + (new Date(e).getMonth() + 1) + '.' + new Date(e).getFullYear())

                                                    }}
                                                    dateFormat="MM.dd.yyyy"
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="divButtonBotTimer">
                                                {!separateDeal && <Select
                                                    showSearch={selectOptions}
                                                    onFocus=""
                                                    size='large'
                                                    placeholder="Choose Work"
                                                    onChange={(value) => {
                                                        setMessage(selectOptions[value - 1].label)
                                                        setNotificationTime(selectOptions[value - 1].time)
                                                    }}
                                                    filterOption={(inputValue, option) =>
                                                        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
                                                    }
                                                    style={{
                                                        width: 200,
                                                        marginTop: 5,
                                                        marginBottom: 10,
                                                    }}
                                                    options={selectOptions}
                                                    onClick={() => setCont('Add')}
                                                />
                                                }
                                            </div>
                                            <div className="divButtonBotTimer" style={{textAlign: 'center', marginTop: '0px', marginBottom: '5px', fontSize: '20px'}}>Estimated Time {notificationTime / 60} hours</div>
                                            <div className="divButtonBotTimer2" style={{display: (message.includes('Daily Rate') || message.includes('Separate Deal')) ? 'none' : 'flex'}}>
                                                <div className="divButtonBotTimer" style={{maxWidth: '150px'}}>
                                                    <LocalizationProvider dateFormats={"dd"} dateAdapter={AdapterDayjs}>
                                                        <MobileTimePicker className="mobileTimePick" ampm={false} step={1} onClick={() => setCont('Add')} onChange={(e) => {setCont('Add'); setTimeStart((parseInt(e["$H"]) < 10 ? '0' + e["$H"] : e["$H"]) + ":" + (parseInt(e["$m"]) < 10 ? '0' + e["$m"] : e["$m"]))}} defaultValue={dayjs('00:00', 'HH:mm')} />
                                                    </LocalizationProvider>
                                                </div>
                                                -
                                                <div className="divButtonBotTimer" style={{maxWidth: '150px'}}>
                                                    <LocalizationProvider dateFormats={"dd"} dateAdapter={AdapterDayjs}>
                                                        <MobileTimePicker className="mobileTimePick" ampm={false} step={1} minTime={dayjs().set('hour', parseInt(timeStart.split(':')[0]) - 1)} onClick={() => setCont('Add')} onChange={(e) => {setCont('Add'); setTimeEnd((parseInt(e["$H"]) < 10 ? '0' + e["$H"] : e["$H"]) + ":" + (parseInt(e["$m"]) < 10 ? '0' + e["$m"] : e["$m"]))}} defaultValue={dayjs('00:00', 'HH:mm')} />
                                                    </LocalizationProvider>
                                                </div>

                                                {/*<TimePicker autoFocus={true} autoComplete={true}  style={{marginRight: '30px'}} defaultValue={dayjs('00:00', 'HH:mm')} format='HH:mm' onChange={(e) => setTimeStart((parseInt(e["$H"]) < 10 ? '0' + e["$H"] : e["$H"]) + ":" + (parseInt(e["$m"]) < 10 ? '0' + e["$m"] : e["$m"]))} placeholder='Example: 13:00' />*/}
                                            </div>
                                            <div className="divButtonBotTimer2" style={{marginTop: '15px', width: '175px', display: (!message.includes('Daily Rate') && !message.includes('Separate Deal')) ? 'flex' : 'none', flexDirection: 'column',  marginLeft: '80px'}}>
                                                <Checkbox value={1} size='large' style={{transform: 'scale(1.3)', marginLeft: '0px', height: '20px', flexWrap: 'nowrap', width: 'auto'}} onChange={onChange}>I've spent my money</Checkbox>
                                           </div>
                                            <div style={{display: checkBox && (!message.includes('Daily Rate') && !message.includes('Separate Deal'))? 'block' : 'none'}}>
                                                <div className="divButtonBotTimer2">
                                                    <input className='inputBotTimer' type="number" style={{display: 'block',
                                                        boxSizing: 'border-box',
                                                        marginBottom: "20px",
                                                        padding: '4px',
                                                        height: "32px",
                                                        border: "none",
                                                        width: "auto",
                                                        borderBottom: "1px solid #AAA",
                                                        fontWeight: "400",
                                                        fontSize: "15px",
                                                        transition: "0.2s ease",
                                                        textAlign: "center",
                                                        marginTop: '50px',
                                                    }} onChange={(e) => {setHowMuch(e.target.value)}} placeholder='How much money?'/>
                                                </div>
                                                <div className="divButtonBotTimer2">
                                                    <input className='inputBotTimer'type="text" style={{display: 'block',
                                                        boxSizing: 'border-box',
                                                        marginBottom: "20px",
                                                        padding: '4px',
                                                        height: "32px",
                                                        border: "none",
                                                        width: "auto",
                                                        borderBottom: "1px solid #AAA",
                                                        fontWeight: "400",
                                                        fontSize: "15px",
                                                        transition: "0.2s ease",
                                                        textAlign: "center",
                                                        marginTop: '10px',
                                                    }} onChange={(e) => {setHowMuchInfo(e.target.value)}} placeholder='Info?'/>
                                                </div>
                                            </div>
                                            <div style={{display: message.includes('Daily Rate') || message.includes('Separate Deal') ? 'block' : 'none'}}>
                                                <div className="divButtonBotTimer2">
                                                    <input className='inputBotTimer'type="number"  style={{display: 'block',
                                                        boxSizing: 'border-box',
                                                        marginBottom: "20px",
                                                        padding: '4px',
                                                        height: "32px",
                                                        border: "none",
                                                        width: "auto",
                                                        borderBottom: "1px solid #AAA",
                                                        fontWeight: "400",
                                                        fontSize: "15px",
                                                        transition: "0.2s ease",
                                                        textAlign: "center",
                                                        marginTop: '10px',
                                                    }} onChange={(e) => {setHowMuch(e.target.value)}} placeholder='How much money?'/>
                                                </div>
                                                <div className="divButtonBotTimer2">
                                                    <input className='inputBotTimer'type="text"
                                                           style={{display: 'block',
                                                               boxSizing: 'border-box',
                                                               marginBottom: "20px",
                                                               padding: '4px',
                                                               height: "32px",
                                                               border: "none",
                                                               width: "auto",
                                                               borderBottom: "1px solid #AAA",
                                                               fontWeight: "400",
                                                               fontSize: "15px",
                                                               transition: "0.2s ease",
                                                               textAlign: "center",
                                                               marginTop: '10px',
                                                           }} onChange={(e) => {setHowMuchInfo(e.target.value)}} placeholder='Info?'/>
                                                </div>
                                            </div>
                                            <div className="divButtonBotTimer">

                                                <div className="divButtonBotTimer"><button style={{marginTop: "30px"}} className="buttonBotTimerAllWorks" onClick={() => {setModalTimer(true)
                                                    setTimeStart('');
                                                    setTimeEnd('');
                                                    setMessage('');
                                                    setHowMuchInfo('');
                                                    setHowMuch('');
                                                }}><BsArrowLeft/></button></div>

                                                <button style={{fontSize: '20px'}} className="buttonBotTimer" onClick={() => {
                                                    if((message != '' && timeStart != '' && timeEnd != '') || ((howMuch || howMuchInfo) && (message.includes('Daily Rate') || message.includes('Separate Deal')))){
                                                        setCont('Added!');
                                                        sendData();
                                                    }else if((message.includes('Daily Rate') || message.includes('Separate Deal'))){
                                                        setCont('Change info!')
                                                    }else{
                                                        setCont(timeStart == '' ? 'Change Time' : 'Add more info!')
                                                    }
                                                }
                                                }>{cont}</button>
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

export default BotTimer;