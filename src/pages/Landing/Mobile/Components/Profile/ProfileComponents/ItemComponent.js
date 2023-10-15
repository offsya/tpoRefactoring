import React, {useMemo} from 'react';
import "./ItemComponent.scss"
import {MdArrowForwardIos} from "react-icons/md";
const ItemComponent = ({market, date, products, elem}) => {
    //

    console.log(elem)
    const orderTotal = useMemo(() => {
        return products.map((items) => items.marketPriceCP != '' ? parseFloat(items.marketPriceCP*(items.quantity || 1)) : 0).reduce((acc, curr) => acc + curr, 0).toFixed(2) + '€'
    }, [])

    const orderProducts = useMemo(() => {
        return products.map((items) => items.name + ' ' + items.quantity + ' ' + items.unit)
    }, [])


    const orderNumber = () => {
        // try {
        //     const browserType = {
        //         "browser": "WW",
        //         "whatsapp": "WA",
        //         "telegram": "TG",
        //     }
        //     let orderNum = `${browserType[elem?.type] + (new Date(elem.date).getFullYear() % 100) + (new Date(elem.date).getMonth() + 1 <= 9 ? ("0" + (new Date(elem.date).getMonth() + 1)) : (new Date(elem.date).getMonth() + 1)) + (new Date(elem.date).getDate() <= 9 ? ("0" + new Date(elem.date).getDate()) : new Date(elem.date).getDate()) + (elem?.tradeName || "") + (elem.type == "whatsapp" ? "CP" : elem.order) + (elem._id.slice(-4))}`
        //     return orderNum
        // }
        // catch (e) {
        //     return ''
        // }
        return elem?._id && elem?._id.slice(-4)
    }

    console.log(products)

    return (
            <div className="ItemWithButtons" style={{borderBottom: "1px solid #F5F4F2"}}>
                <div className="HistoryOfOrdersMain">
                    <div className="LeftPart" >
                        <span style={{background: '#5FC56E', border: '1px solid #5FC56E'}}>✔</span>
                        {/*<span style={{background: 'goldenrod', border: '1px solid goldenrod'}}>⧖</span>*/}
                    </div>
                    <div  className="MiddlePart">
                        <div  className="upperrow">
                            <div className="Norder">
                                <span className="upperrowText">№order {orderNumber()}</span>
                            </div>
                            <div className="market">
                                <span className="upperrowText">TPO Site</span>
                            </div>
                            <div className="date">
                                <span className="upperrowText">{new Date(date).getDate() + '.' + (new Date(date).getMonth() + 1) + '.' + new Date(date).getFullYear() + ' (' + (parseInt(new Date(date).getHours()) < 10 ? '0' + new Date(date).getHours() : new Date(date).getHours()) + ':' + (parseInt(new Date(date).getMinutes()) < 10 ? '0' + new Date(date).getMinutes() : new Date(date).getMinutes()) + ')'}</span>
                            </div>
                        </div>
                        <div className="middlerow">
                            <div className="status">
                                {/*<span>Completed</span>*/}
                                <span>Status</span>
                            </div>
                        </div>
                        <div className="lowerrow">
                            <div className="cart">
                                <span>{orderProducts.join(',')}</span>
                            </div>
                        </div>

                    </div>
                    <div className="Rightpart">
                        <span className="price">{orderTotal}</span>
                    </div>

                </div>
                <div className="ButtonsUnderItems">
                    <div className="RepeatButton">Repeat order</div>
                    <div className="MoreDetailsButton">More details <MdArrowForwardIos/></div>
                </div>
            </div>
    );
};

export default ItemComponent;