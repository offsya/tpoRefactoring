import React, {useEffect, useState} from 'react';
import {BsCheckLg, BsCheck} from "react-icons/bs";

const Item = ({itemLang, setMinDay, item, onAdd, onShowItem, onDelete, addQuantity}) => {

    const [but, setBut] = useState(true);
    const [total, setTotal] = useState(parseInt(localStorage.getItem(item.id)) ? parseInt(localStorage.getItem(item.id)) : 0);

    useEffect(() => {
        setTotal(parseInt(localStorage.getItem(item.id)))
        if(total < 1 || localStorage.getItem(item.id) < 1){
            localStorage.removeItem(item.id);
            setBut(true)
        }else{
            setBut(false)
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
        <div className='item'>
            <img alt={item.title} src={item.img} onClick={() => onShowItem(item)}/>
            <h4>{item[itemLang]}</h4>
            <p>{item.desc}</p>
            <div className='price_and_check'>
                <b>{parseFloat(item.price).toFixed(2)}€</b>
                {
                    item.dia == 0 ?
                        <BsCheckLg className='price_and_check_bsGreen'/>
                        :
                        <div className='price_and_check_bsGold'>
                            <BsCheckLg className='price_and_check_bsGold_Check'/>
                        </div>
                }
            </div>
                {but ?
                    <div className='add-to-cart-box'>
                        {/*<div className='add-to-cart' onClick={() => {setBut(false); setTotal(1)}}>Add</div>*/}
                        <button className='button' onClick={() => {setBut(false); setTotal(1); localStorage.setItem(item.id, 1); onAdd(item, total)}}>
                            <span className='text'>Add</span>
                        </button>
                    </div>
                    :
                    <div className='add-to-cart-box'>
                        <button className='button minus' onClick={() => {totalMinusHandler(); butHandler(item)}}>-</button>
                        <span className='button'>{total}</span>
                        <button className='button plus' onClick={() => {totalPlusHandler(); onAdd(item)}}>+</button>
                    </div>
                }
        </div>
    );
};

export default Item;