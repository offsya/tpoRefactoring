import React from 'react';
import './DeliveryForm.scss'


const PaymentModalWindow = ({active,setActive,children}) => {
    return(
        <div className={active ? "PaymentModalWindow active" : "PaymentModalWindow"} onClick={()=>setActive(false)}>
            <div className={active ? "ModalWindow_content active" :"ModalWindow_content"} onClick={e=>e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default PaymentModalWindow;