import React from 'react';
import "../Landing.css"
import BodyLand from "./Land/bodyLand";


function Landing() {
    return (
        <div className="containerLand">
            {/*<div className="headerLand">*/}

            {/*</div>*/}
            <BodyLand/>
            <div className="footerLand">

            </div>
        </div>
    );
};

export default Landing;