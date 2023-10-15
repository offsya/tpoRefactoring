import React, {useState} from 'react';
import '../BodyComponents/ProfileBar.scss'
import ItemComponent from "../../../Mobile/Components/Profile/ProfileComponents/ItemComponent";
import {useSelector} from "react-redux";

const HistoryOrdersProfile = () => {
    const userAcc = useSelector((state) => state.userAcc.userAcc)
    const allOrders = useSelector((state) => state.allOrders.allOrders)
    const [viewOrders, setViewOrders]= useState("All")

    //     || (currentElem.type == 'telegram' && currentElem?.userAcc?.phone == userAcc.phone) || (currentElem.type == 'whatsapp' && currentElem?.msg?._data?.from.split('@')[0] == userAcc.phone)

    console.log(allOrders)
    return (
        <div className='HistoryOfOrdersProfile'>
            <div className='titleText'>Orders</div>
            <div className="OrdersButtonsList">

                <div className="OrderButtonItemAll" onClick={() => setViewOrders("All") } style={{background: viewOrders== "All" ? "#5FC56E":"#E8E8E8", color: viewOrders== "All" ? "#FFF":"#4C4C4C"}}> All orders</div>
                <div className="OrderButtonItemCurrent" onClick={() => setViewOrders("Current") } style={{background: viewOrders== "Current" ? "#5FC56E":"#E8E8E8", color: viewOrders== "Current" ? "#FFF":"#4C4C4C"}}>Current orders</div>
                <div className="OrderButtonItemHistory" onClick={() => setViewOrders("Finish") } style={{background: viewOrders== "Finish" ? "#5FC56E":"#E8E8E8", color: viewOrders== "Finish" ? "#FFF":"#4C4C4C"}}>Finish orders</div>


            </div>
            <div className="ItemsComponents">
                {allOrders.map(currentElem => {
                if (viewOrders=="All"){
                if((currentElem.type == 'browser' && currentElem?.userAcc?.phone == userAcc.phone)){
                   return <ItemComponent elem={currentElem} id={currentElem._id} products={currentElem.items} date={currentElem.date} orderNumber={currentElem._id} elem={currentElem?.userAcc}/>
                }}
                if (viewOrders=="Current"){
                    if (currentElem?.status?.name != "Facturado" && currentElem?.status?.name != "Cancelado" && currentElem?.status?.name != undefined){
                        if((currentElem.type == 'browser' && currentElem?.userAcc?.phone == userAcc.phone)){
                            return <ItemComponent products={currentElem.items} date={currentElem.date} orderNumber={currentElem._id} elem={currentElem?.userAcc}/>
                        }
                    }
                }
                if (viewOrders=="Finish"){
                    if (currentElem?.status?.name == "Facturado" && currentElem?.status?.name != undefined){
                        if((currentElem.type == 'browser' && currentElem?.userAcc?.phone == userAcc.phone)){
                            return <ItemComponent products={currentElem.items} date={currentElem.date} orderNumber={currentElem._id} elem={currentElem?.userAcc}/>
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

export default HistoryOrdersProfile;