import React, {useState} from 'react';
import {AiOutlineCheck} from "react-icons/ai";
import './form.module.css'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import DelRus from './DelRus';
import DelEs from "./DelEs";
import DelCat from "./DelCat";
import DelUkr from "./DelUkr";
import DelFr from "./DelFr";
import DelIta from "./DelIta";
import DelRom from "./DelRom";
import DelEng from "./DelEng";

const Form = ({itemLang, delAgree, agree, setAgree, del, setDel, nameLang, sendOrder, showForm, setShowForm, minDay = 0}) => {
    const today = new Date()


    const [inputPay, setInputPay] = useState(false);

    const [inputPayCheck, setInputPayCheck] = useState(0);

    const [inputPayPlaceHolder, setInputPayPlaceHolder] = useState('Dinos si necesitas el cambio aquí');
    const [inputValue, setInputValue] = useState('');



    const [values, setValues] = useState(1);

    const [fieldValue, setFieldValue] = useState(minDay == 777 ? new Date(2022, 11, 29) : new Date(today.getTime() + (24 * 60 * 60 * 1000 * minDay)));
    const [fieldTouched, setFieldTouched] = useState('');

    const [number ,setNumber] = useState();
    const [address, setAddress] = useState('');
    const [message, setMessage] = useState('-')
    const [al ,setAl] = useState(nameLang[10]);
    const [alPay ,setAlPay] = useState('Apunta el método del pago');


    const [SSend, setSSend] = useState(true)

    const send = () => {
        console.log(fieldValue)
        if(number != '' && address != ''){
            setDel(true)
          //sendOrder(number, address, message, fieldValue)
        }else{
            setAl(nameLang[11])
        }
    }

    const sendPay = () => {
        console.log(fieldValue)
        let pay;
        if(inputPayCheck == 1){
            pay = inputValue
            if(inputValue == ''){
                pay = '-'
            }
            sendOrder(number, address, message, fieldValue, pay)
        }else if(inputPayCheck == 2){
            pay = 'Терминалом при доставке'
            sendOrder(number, address, message, fieldValue, pay)
        }else if(inputPayCheck == 3){
            pay = 'Оплата картой онлайн'
            sendOrder(number, address, message, fieldValue, pay)
        }
    }

    let agr;

    if(itemLang == 'сatalan'){
        agr = <DelCat/>
    }else if(itemLang == 'español'){
        agr = <DelEs/>
    }else if(itemLang == 'russian'){
        agr = <DelRus/>
    }else if(itemLang == 'ucranian'){
        agr = <DelUkr/>
    }else if(itemLang == 'french'){
        agr = <DelFr/>
    }else if(itemLang == 'italian'){
        agr = <DelIta/>
    }else if(itemLang == 'romanian'){
        agr = <DelRom/>
    }else if(itemLang == 'english'){
        agr = <DelEng/>
    }



    const isWeekday = (date) => {
        const day = date.getDay();
        return day !== 0;
    };

    return (
        <div className='full-form' onClick={() => setShowForm(false)}>
            <div onClick={e => e.stopPropagation()}>
                <div id="login-box">

                    <div className="left">
                        {
                            !agree ?
                                <div style={{textAlign: 'center', width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                                    {agr}
                                    <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '-90px'}}>
                                        <input className='inputFormBotOn formInputOrange' style={{height: '35px', background: '#ff8428', width: '100px', color: '#FFFFFF', fontWeight: '600'}} onClick={() => {setAgree(true)}} type="submit" name="signup_submit" value="AGREE?"/>

                                    </div>
                                    <a href="https://t.me/Botonbcn" style={{width: '100%', textAlign: 'center', marginTop: '120px', marginBottom: '-80px', textDecoration: 'none', fontWeight: '600', color: 'grey '}}>Hay preguntas? O te falta algún producto? <span style={{textDecoration: 'underline', color: '#0000FF'}}>Escríbenos</span></a>


                                </div>


                                :
                                <div style={{textAlign: 'center', width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                                    <h1 style={{marginTop: '10px'}}>{SSend ? nameLang[10] : nameLang[11]}</h1>
                                    <input className='inputFormBotOn' style={{display: 'block',
                                        boxSizing: 'border-box',
                                        marginBottom: "20px",
                                        padding: '4px',
                                        height: "32px",
                                        border: "none",
                                        width: "100%",
                                        borderBottom: "1px solid #AAA",
                                        fontWeight: "400",
                                        fontSize: "15px",
                                        transition: "0.2s ease",
                                        textAlign: "center",
                                    }} onClick={() => setSSend(true)} onChange={(e) => setNumber(e.target.value)} type="text" name="number" placeholder={nameLang[7]}/>
                                    <input className='inputFormBotOn' style={{display: 'block',
                                        boxSizing: 'border-box',
                                        marginBottom: "20px",
                                        padding: '4px',
                                        height: "32px",
                                        border: "none",
                                        width: "100%",
                                        borderBottom: "1px solid #AAA",
                                        fontWeight: "400",
                                        fontSize: "15px",
                                        transition: "0.2s ease",
                                        textAlign: "center",
                                    }} onClick={() => setSSend(true)} onChange={(e) => setAddress(e.target.value)} type="text" name="address" placeholder={nameLang[8]}/>
                                    <input className='inputFormBotOn' style={{display: 'block',
                                        boxSizing: 'border-box',
                                        marginBottom: "20px",
                                        padding: '4px',
                                        height: "32px",
                                        border: "none",
                                        width: "100%",
                                        borderBottom: "1px solid #AAA",
                                        fontWeight: "400",
                                        fontSize: "15px",
                                        transition: "0.2s ease",
                                        textAlign: "center",
                                    }} onChange={(e) => setMessage(e.target.value)} type="text" name="message" placeholder={nameLang[9]}/>

                                    <h1 style={{fontSize: '18px', marginBottom: '10px'}}>{nameLang[12]}</h1>
                                    <div style={{display: 'flex', justifyContent:'space-around',
                                        boxSizing: 'border-box',
                                        marginBottom: "20px",
                                        padding: '4px',
                                        height: "32px",
                                        border: "none",
                                        width: "100%",
                                        borderBottom: "1px solid #AAA",
                                        fontWeight: "400",
                                        fontSize: "15px",
                                        transition: "0.2s ease",
                                        textAlign: "center",
                                    }}>
                                        <DatePicker

                                            selected={fieldValue}
                                            onChange={(e) => {
                                                setFieldValue(e);
                                            }}
                                            showTimeSelect
                                            timeFormat="HH:mm"
                                            timeIntervals={60}
                                            minTime={new Date().setHours(12)}
                                            maxTime={new Date().setHours(19)}
                                            dateFormat="MMMM d, yyyy HH:mm"
                                            filterDate={isWeekday}

                                            className="form-control"
                                            minDate={minDay == 777 ? new Date(2022, 11, 29) : new Date(today.getTime() + (24 * 60 * 60 * 1000 * minDay))}
                                            maxDate={minDay == 777 ? new Date(2022, 11, 31) : ''}
                                        />
                                    </div>

                                    {del &&
                                        <div className='pay-cont'>
                                            <h1 style={{marginTop: '50px'}}>{nameLang[14]}</h1>
                                            <div className='lang-left pay-left' style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                                                <div className='pay-button'><AiOutlineCheck style={{color: 'darkgreen', paddingTop: '15px', opacity: inputPayCheck == 1 ? '1' : '0'}}/>
                                                    <button className="custom-btn btn-16 btnPay" onClick={() => {setInputPay(true); setInputPayCheck(1)}}>💶 {nameLang[15]} </button>
                                                </div>
                                                {inputPay && <input className='inputFormBotOn' style={{display: 'block',
                                                    boxSizing: 'border-box',
                                                    marginBottom: "20px",
                                                    padding: '4px',
                                                    height: "32px",
                                                    border: "none",
                                                    borderBottom: "1px solid #AAA",
                                                    fontWeight: "400",
                                                    fontSize: "15px",
                                                    transition: "0.2s ease",
                                                    textAlign: "center",
                                                    width: '275px', marginLeft: '20px',
                                                }} type="text" onChange={(e) => setInputValue(e.target.value)} placeholder={nameLang[18]}/>}
                                                <div className='pay-button'><AiOutlineCheck style={{color: 'darkgreen', paddingTop: '15px', opacity: inputPayCheck == 2 ? '1' : '0'}}/>
                                                    <button className="custom-btn btn-16 btnPay" onClick={() => {setInputPay(false); setInputPayCheck(2)}}>🎮 {nameLang[16]} </button>
                                                </div>
                                                <div className='pay-button' style={{opacity: '1'}}><AiOutlineCheck style={{color: 'darkgreen', paddingTop: '15px', opacity: inputPayCheck == 3 ? '1' : '0'}}/>
                                                    <button disabled={false} className="custom-btn btn-16 btnPay" onClick={() => {setInputPay(false); setInputPayCheck(3)}}>💳 {nameLang[17]}</button>
                                                </div>
                                                <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
                                                    <input className='inputFormBotOn' style={{height: '35px', background: '#ff8428', width: '100px', color: '#FFFFFF', fontWeight: '600'}} onClick={() => {sendPay(); setDel(true)}} type="submit" name="signup_submit" value="Send"/>

                                                </div>
                                                <a href="https://t.me/Botonbcn" style={{width: '100%', textAlign: 'center', marginTop: '20px', marginBottom: '-50px', textDecoration: 'none', fontWeight: '600', color: 'grey '}}>Hay preguntas? O te falta algún producto? <span style={{textDecoration: 'underline', color: '#0000FF'}}>Escríbenos</span></a>
                                            </div>


                                        </div>
                                    }

                                    {!del &&
                                        <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                                            <input className='inputFormBotOn' style={{height: '35px', background: '#ff8428', width: '100px', color: '#FFFFFF', fontWeight: '600'}} onClick={() => {send(); setSSend(false);}} type="submit" name="signup_submit" value="Send"/>
                                        </div>

                                    }
                                    <a href="https://t.me/Botonbcn" style={{width: '100%', textAlign: 'center', marginTop: '20px', marginBottom: '-60px', textDecoration: 'none', fontWeight: '600', color: 'grey '}}>Hay preguntas? O te falta algún producto? <span style={{textDecoration: 'underline', color: '#0000FF'}}>Escríbenos</span></a>
                                </div>

                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Form;