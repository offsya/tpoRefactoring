import React, {useEffect, useState} from 'react';


const ItemToCatalog = ({item, onAdd, onShowItem, onDelete, addQuantity}) => {

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
        <div className='item itemCt'>
            <img alt={item.title} src={item.img}/>
            <h4>{item.title}</h4>
        </div>
    );
};

export default ItemToCatalog;