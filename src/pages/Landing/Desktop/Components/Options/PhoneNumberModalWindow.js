import React from 'react';
import "./PhoneNumberModalWindow.scss"
import {Input, Select} from "antd";
import spainflag from "../../../components/Profile/spainflag.svg";
const tg = window.Telegram.WebApp


const { Option } = Select;
const handleChange = (value) => {
    console.log(`selected ${value}`);
};
const PhoneNumberModalWindow = ({active,setActive}) => {
    return (
        <div className={active ? "PhoneNumberModalWindow active" : "PhoneNumberModalWindow"} onClick={()=>setActive(false)}>
            <div className={active ? "PhoneNumberModalWindow_content active" :"PhoneNumberModalWindow_content"} onClick={e=>e.stopPropagation()}>
                <div style={{
                    marginTop:19,
                    marginLeft:"20px",
                    color: "#393939",
                    fontFamily: "Roboto",
                    fontSize: "24px",
                    fontStyle: "normal",
                    fontWeight: "500",
                    lineHeight: "normal",
                    letterSpacing: "2.4px"}}> Link a phone number</div>
                <div style={{marginTop:15,
                    color: "#9D9D9D",
                    marginLeft:"20px",
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "normal",
                    letterSpacing: "1.4px"}}>Confirm a phone number so that we can contact you</div>
                <div style={{marginTop:"20px",
                    color: "#9D9D9D",
                    marginLeft:"20px",
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: "500",
                    lineHeight: "normal",
                    letterSpacing: "1.4px"}}>Phone number</div>
                <div style={{marginLeft:"20px"}} className="InputAndSelect">
                    <Select
                        size="middle"
                        onChange={handleChange}
                        defaultValue={"spain"}
                        style={{
                            marginTop : 10,
                            width : 150,
                            padding:0,
                        }}>
                        <Option value="spain" label="spain" size={'middle'}>
                            <img src={spainflag} />
                            +34
                        </Option>
                    </Select>
                    <Input
                        style={{
                            width: '222px',
                            height: '40px',
                            borderRadius: '7px',
                            border: '1px solid #C1C1C1',
                            background: '#FFF',
                            marginTop: '10px',
                            borderBottomLeftRadius:'0px',
                            borderTopLeftRadius:'0px',
                            borderLeft:"none"
                        }}
                        placeholder="12 345 678"



                    >

                    </Input>
                    <div className="seeOptionsCard-mobile">Confirm</div>
                </div>
            </div>
        </div>
    );
};

export default PhoneNumberModalWindow;