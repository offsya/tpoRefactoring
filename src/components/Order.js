import React, {useEffect, useState} from 'react';
import {FaTrash} from "react-icons/fa";


const Order = ({itemLang, nameLang, item, onDelete, onAdd, addQuantity, setMinDay}) => {

    const [but, setBut] = useState(true);
    const [total, setTotal] = useState(parseInt(localStorage.getItem(item.id)) ? parseInt(localStorage.getItem(item.id)) : 0);

    useEffect(() => {
        setTotal(parseInt(localStorage.getItem(item.id)))
    }, [localStorage.getItem(item.id)])

    const butHandler = (item) => {
        if(total <= 1){
            setBut(true)
            onDelete(item.id)
            setMinDay(0)
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
        <div className='item'>
            <img alt={item.title} src={item.img}/>
            <h2>{item[itemLang]}</h2>
            <div className='price_and_check_order'>
                <b>{parseFloat(item.price).toFixed(2)}€</b>
                {
                   item.dia == 0 ?
                       <div className='price_and_check_bsGreen_order'>
                           <b style={{color: 'darkgreen', fontSize: '16px'}}>{nameLang[3]}</b>
                       </div>
                                               :
                        <div className='price_and_check_bsGold_order'>
                            {item.dia == 777 ? <div className='onlyDecLink'>{nameLang[13]}</div> : <b style={{color: "goldenrod"}}>{nameLang[4] + ' ' + item.dia + ' ' + nameLang[5]}</b>}
                        </div>
                }
            </div>
            <div className='add-to-cart-box add-to-cart-box-orders'>
                <button className='button minus button-orders ' onClick={() => {totalMinusHandler(); butHandler(item)}}>-</button>
                <span className='button button-orders'>{total}</span>
                <button className='button plus button-orders' onClick={() => {totalPlusHandler(); onAdd(item)}}>+</button>
                <FaTrash onClick={() => {onDelete(item.id); localStorage.setItem(item.id, 0); setMinDay(0)}} className='delete-icon'/>
            </div>
        </div>
    );
};

export default Order;