import React, {useEffect, useState} from 'react';


const ShowFullItem = ({itemLang, setMinDay, nameLang, item, onAdd, onShowItem, addQuantity, onDelete}) => {

    const [but, setBut] = useState(true);
    const [total, setTotal] = useState(parseInt(localStorage.getItem(item.id)) ? parseInt(localStorage.getItem(item.id)) : 0);

    useEffect(() => {
        setTotal(parseInt(localStorage.getItem(item.id)))
        if(total < 1 || localStorage.getItem(item.id) < 1){
            setTotal(0)
        }
    }, [localStorage.getItem(item.id)])


    const butHandler = (item) => {
        if(total <= 1){
            setBut(true)
            setMinDay(0)
            onDelete(item.id)
            setTotal(0)
        }else{
            setBut(false)
        }
    }
    const totalPlusHandler = () => {
        setTotal(total + 1)
        addQuantity(item, total + 1)
        localStorage.setItem(item.id, total + 1);
    }
    const totalMinusHandler = () => {
        setTotal(total - 1)
        addQuantity(item, total - 1)
        localStorage.setItem(item.id, total - 1);
    }


    return (
        <div className='full-item' onClick={onShowItem}>
            <div onClick={e => e.stopPropagation()}>
                <img alt={item.title} src={item.img} onClick={onShowItem}/>
                <h2>{item[itemLang]}</h2>
                <p>{item.desc}</p>
                <div className='price_and_check_order'>
                    <b>{parseFloat(item.price).toFixed(2)}€</b>
                    {
                        item.dia == 0 ?
                            <div className='price_and_check_bsGreen_show'>
                                <b>{nameLang[3]}</b>
                            </div>
                            :
                            <div className='price_and_check_bsGold_show'>
                                <b style={{color: 'goldenrod'}}>{item.dia == 777 ? <div className='onlyDecLink'>{nameLang[13]}</div> : nameLang[4] + ' ' + item.dia + ' ' + nameLang[5]}</b>
                            </div>
                    }
                </div>
                <b style={{color: 'black'}}>{item.weight}</b>
                <div className='add-to-cart-box add-to-cart-box-orders add-to-cart-box-show'>
                    <button className='button minus button-orders ' onClick={() => {totalMinusHandler(); butHandler(item)}}>-</button>
                    <span className='button button-orders'>{total}</span>
                    <button className='button plus button-orders' onClick={() => {totalPlusHandler(); onAdd(item)}}>+</button>
                </div>
            </div>
        </div>
    );
};

export default ShowFullItem;