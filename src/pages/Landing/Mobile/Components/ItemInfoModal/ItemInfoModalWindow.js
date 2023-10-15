import React from 'react';
import "./ItemInfoModalWindow.scss"
import imager from "../../../../../assets/Notification.svg";
const ItemInfoModalWindow = ({active,setActive}) => {
    return(
        <div className={active ? "DeliveryInfoModalWindow active" : "DeliveryInfoModalWindow"} onClick={()=>setActive(false)}>
            <div className={active ? "DeliveryInfoModalWindow_content active" :"DeliveryInfoModalWindow_content"} onClick={e=>e.stopPropagation()}>

                <div className="mainInfoContent">
                    <div className="DeliveryInfoBlock">
                        <div className="UpdatedStockOrNotMobile" style={{width:'75px'}}><span>Stock ✔</span></div>
                        <div className="DeliveryInfoText">- Available in stock now</div>
                    </div>
                    <div className="DeliveryInfoBlock">
                        <div className="UpdatedStockOrNotMobile"
                             style={{background: '#F5F4F2', border: '1px solid #FF725E', width:'75px'}}><span
                            style={{color: '#FF725E'}}>Stock ×</span></div>
                        <div className="DeliveryInfoText" style={{whiteSpace: 'nowrap'}}>- Not available in stock</div>
                    </div>
                    <div className="DeliveryInfoBlock">
                        <div className="UpdatedTBC" style={{width:'75px'}}><span>TBC</span></div>
                        <div className="DeliveryInfoText">- To Be Confirmed</div>
                    </div>
                    <div className="DeliveryInfoBlock">
                        <div className="UpdatedDaysLeft" style={{width:'75px'}}><span>2 days</span></div>
                        <div className="DeliveryInfoText">- Days for production</div>
                    </div>
                    <div className="DeliveryInfoBlock">
                        <div style={{marginRight: '8px', background: '#E8E8E8', width: '30px', height: '30px', borderRadius: '30px', justifyContent: 'center', alignItems: 'center', display: 'flex', transform: 'rotate(45deg)'}}>
                            <img style={{width: '16px', height: '20px'}} src={imager} alt=""/>
                        </div>
                        <div className="DeliveryInfoText"> - Subscribe for notification<br/>
                        </div>
                    </div>
                    <div className="DeliveryInfoBlock">
                        <div className="WeightImg">
                            <span>⚖</span>
                        </div>
                        <div className="DeliveryInfoText">Weight needed goods</div>
                    </div>
                    <div className="DeliveryInfoBlock">
                        <div className="SPOImg">
                            <span>SPO</span>
                        </div>
                        <div className="DeliveryInfoText">Show only Special<br/> Offers (SPO)</div>
                    </div>

                </div>
                <div className="closeButtonX" onClick={() => setActive(false)}>✖</div>
            </div>
        </div>
    )
};

export default ItemInfoModalWindow;