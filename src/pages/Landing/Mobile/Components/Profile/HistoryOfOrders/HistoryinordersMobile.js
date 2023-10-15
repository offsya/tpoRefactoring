import React, {useState} from 'react';
import "./HistoryinordersMobile.scss"
import {useSelector} from "react-redux";
import ItemComponentMobile from "../../../../Desktop/Components/Profile/ItemComponentMobile";
import BackArrow from "../../../../components/Profile/Arrow.svg"
import ItemComponent from "../ProfileComponents/ItemComponent";
const HistoryinordersMobile = () => {
    const userAcc = useSelector((state) => state.userAcc.userAcc)
    const allOrders = useSelector((state) => state.allOrders.allOrders)
    const [viewOrders, setViewOrders]= useState("All")
    return (
        <div className="HistoryofordersMobile">
            <div className="HistoryofordersText">
                <span className="TextHistoryoforders">Orders</span>
            </div>
            <div className="OrdersButtonsListMobile">

                <div className="OrderButtonItemAllMobile" onClick={() => setViewOrders("All") } style={{background: viewOrders== "All" ? "#5FC56E":"#E8E8E8", color: viewOrders== "All" ? "#FFF":"#4C4C4C"}}> All orders</div>
                <div className="OrderButtonItemCurrentMobile" onClick={() => setViewOrders("Current") } style={{background: viewOrders== "Current" ? "#5FC56E":"#E8E8E8", color: viewOrders== "Current" ? "#FFF":"#4C4C4C"}}>Current orders</div>
                <div className="OrderButtonItemHistoryMobile" onClick={() => setViewOrders("Finish") } style={{background: viewOrders== "Finish" ? "#5FC56E":"#E8E8E8", color: viewOrders== "Finish" ? "#FFF":"#4C4C4C"}}>Finish orders</div>


            </div>
            <div className="HistoryItemList">
                {allOrders.map(currentElem => {
                    if (viewOrders=="All"){
                        if(currentElem.type == 'browser' && currentElem?.userAcc?.phone == userAcc.phone){
                            return <ItemComponentMobile products={currentElem.items} date={currentElem.date} orderNumber={currentElem._id} elem={currentElem?.userAcc}/>
                        }}
                    if (viewOrders=="Current"){
                        if (currentElem?.status?.name != "Facturado" && currentElem?.status?.name != "Cancelado" && currentElem?.status?.name != undefined){
                            if(currentElem.type == 'browser' && currentElem?.userAcc?.phone == userAcc.phone){
                                return <ItemComponentMobile products={currentElem.items} date={currentElem.date} orderNumber={currentElem._id} elem={currentElem?.userAcc}/>
                            }
                        }
                    }
                    if (viewOrders=="Finish"){
                        if (currentElem?.status?.name == "Facturado" && currentElem?.status?.name != undefined){
                            if(currentElem.type == 'browser' && currentElem?.userAcc?.phone == userAcc.phone){
                                return <ItemComponentMobile products={currentElem.items} date={currentElem.date} orderNumber={currentElem._id} elem={currentElem?.userAcc}/>
                            }
                        }
                    }
                    // else if(currentElem.type == 'telegram' && currentElem.tg.user.first_name == userAcc.email){
                    //     return <ItemComponent elem={currentElem.tg.user.first_name}/>
                    // }else if(currentElem.type == 'whatsapp' && currentElem.msg._data.notifyName){
                    //     return <ItemComponent elem={currentElem.msg._data}/>
                    // }
                })}

            </div>
        </div>
    );
};

export default HistoryinordersMobile;