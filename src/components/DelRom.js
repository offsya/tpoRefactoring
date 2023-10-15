import React from 'react';

const DelRus = () => {
    return (
        <div>
                <div style={{fontSize: '18px'}}><b>CONDITII DE LIVRARE:</b></div>
                <br/>
                Comanda minimă - <b> 29€* (după toate reducerile)</b>

                <br/>Zile de livrare: <b>luni-sâmbătă</b> (cu excepția duminica)
                <br/><br/>
                <b style={{color: 'darkgreen'}}>Bifata verde</b> pe produs - livrarea va fi posibila  <b>in aceeasi zi, </b>dupa ora 15:00,<b>daca comanda era trimisa inainte de ora 10:00 dimineata</b>
                <br/><br/>
                <b style={{color: 'goldenrod'}}>Produse cu bifa galbena</b> comanda va fi livrata in functie de  <b>numarul maxim de zile din descrierea produsului</b>
                <br/><br/>
                <b>Toate produsele cu🎅🏻 </b>- se livrează doar<b>în zilele de 29-31.12.22, până la ora 16:00.</b>
                (primim comenzi - până la ora 22.00 pe 27.12.22)
                <br/><br/>
                Comenzile pentru  <b>sâmbătă</b>, trebuie plasate  <b>vineri înainte de ora 10:00</b>
                <br/><br/>
        </div>
    );
};

export default DelRus;