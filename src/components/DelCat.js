import React from 'react';

const DelCat = () => {
    return (
        <div>
            <div style={{fontSize: '18px'}}><b>CONDICIONS DE L'ENTREGA:</b></div>
            <br/>
            El comandament mínim - <b>29€ * (després de tots els descomptes)</b>

            <br/>Dies de lliurament: <b>Dilluns a Dissabte</b> (excepte diumenge)
            <br/><br/>
            <b style={{color: 'darkgreen'}}>Tic verd</b>en el producte: el lliurament serà possible <b>el mateix dia</b>, a partir de les 15:00, <b>sempre i quan el comandament sigui demanat abans de les 10h</b>
            <br/><br/>
            <b style={{color: 'goldenrod'}}>Si hi han productes amb el Tic groc</b>  el comandament s’entregarà segons el <b>el número màxim dels dies en la descripció del producte</b>
            <br/><br/>
            <b>Tots els productes amb🎅🏻 </b>- lliurament<b>del 29/12 al 31/12 fins les 16h</b>
            (acceptem comandaments fins  les 22h del 27/12)
            <br/><br/>
            Els comandaments  pel <b>al dissabte</b>, han de realitzar-se <b>el divendres  abans de les 10:00</b>
            <br/><br/>
        </div>
    );
};

export default DelCat;