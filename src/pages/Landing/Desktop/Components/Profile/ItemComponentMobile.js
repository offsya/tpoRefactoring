import React, {useMemo} from 'react';
import "./ItemComponentMobile.scss"
const ItemComponentMobile = ({orderNumber, market, date, products}) => {
    const orderTotal = useMemo(() => {
        return products.map((items) => items.marketPriceCP != '' ? parseFloat(items.marketPriceCP*(items.quantity || 1)) : 0).reduce((acc, curr) => acc + curr, 0).toFixed(2) + '€'
    }, [])

    const orderProducts = useMemo(() => {
        return products.map((items) => items.name + ' ' + items.quantity + ' ' + items.unit)
    }, [])

    return (
        <div className="HistoryOfOrdersMainMobile">
            <div className="LeftPartMobile" >
                <span style={{background: '#5FC56E', border: '1px solid #5FC56E'}}>✔</span>
                {/*<span>✔</span>*/}
                {/*<span style={{background: 'goldenrod', border: '1px solid goldenrod'}}>⧖</span>*/}
            </div>
            <div  className="MiddlePartMobile">
                <div  className="upperrowMobile">
                    <div className="NorderMobile">
                        <span className="upperrowTextMobile">№order 12345</span>
                    </div>
                    <div className="marketMobile">
                        <span className="upperrowTextMobile">TPO Site</span>
                    </div>
                    <div className="dateMobile">
                        <span className="upperrowTextMobile">{new Date(date).getDate() + '.' + (new Date(date).getMonth() + 1) + '.' + new Date(date).getFullYear() + ' (' + (parseInt(new Date(date).getHours()) < 10 ? '0' + new Date(date).getHours() : new Date(date).getHours()) + ':' + (parseInt(new Date(date).getMinutes()) < 10 ? '0' + new Date(date).getMinutes() : new Date(date).getMinutes()) + ')'}</span>
                    </div>
                </div>
                <div className="middlerowMobile">
                    <div className="statusMobile">
                        {/*<span>Completed</span>*/}
                        <span>Status</span>
                    </div>
                    <div className="RightpartMobile">
                        <span className="priceMobile">{orderTotal}</span>
                    </div>
                </div>
                <div className="lowerrowMobile">
                    <div className="cartMobile">
                        <span>{orderProducts.join(',')}</span>
                    </div>
                </div>

            </div>
        </div>

    );
};

export default ItemComponentMobile;