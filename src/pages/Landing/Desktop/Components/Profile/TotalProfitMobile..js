import React from 'react';
import "./TotalProfitMobile.scss"

const TotalProfitMobile = () => {
    return (
        <div>
            <div className="TotalProfitMobile">
                <div className="TotalProfitMobileText">
                    <span className="TextTotalProfitMobile">Total profit</span>
                </div>
                <div className="ProfitBox">
                    <div className="CalculatingProfit">
                        For all the time saved
                    </div>
                    <div className="TotalSaveMoney">
                            9999€
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TotalProfitMobile;