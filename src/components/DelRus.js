import React from 'react';

const DelRus = () => {
    return (
        <div>
            <div style={{fontSize: '18px'}}><b>УСЛОВИЯ ДОСТАВКИ:</b></div>
            <br/>
            Мин. заказ - <b>29€ после учета всех скидок</b>

            <br/>ДНИ доставки: <b>ПН-СБ</b> (кроме воскресенья)
            <br/><br/>
            <b style={{color: 'darkgreen'}}>Зеленая галочка</b> в товаре - доставка возможна <b>в этот же день</b>, после 15:00, <b>при условии заказа до 10:00 утра</b>
            <br/><br/>
            <b style={{color: 'goldenrod'}}>Желтые галочки</b> в корзине - заказ будет доставлен в зависимости от максимального <b>количества дней в описании товара</b>
            <br/><br/>
            <b>Все товары с 🎅🏻 </b>-  для доставки только на <b>29-31.12.22 до 16:00</b>
            (заказы на эти товары -до 27.12.22 до 22.00)
            <br/><br/>
            Для доставки в <b>субботу</b>, заказ должен быть сделан <b>в пятницу до 10:00</b>
            <br/><br/>
        </div>
    );
};

export default DelRus;