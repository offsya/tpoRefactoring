import React from 'react';
import "../../Landing.css";


const BodyLand = () => {
    return (
        <div className="bodyLand">
            <div className="leftSideBarLand">
                <div className="logoLand"></div>
                <div className="menuLand">
                    <div className="menuLandButton"><div className="iconHomeLand">213</div><span>Home</span></div>
                    <div className="menuLandButton"><div className="iconHomeLand">213</div><span>Catalog</span></div>
                    <div className="menuLandButton"><div className="iconHomeLand">213</div><span>Category</span></div>
                    <div className="menuLandButton"><div className="iconHomeLand">213</div><span>Language</span></div>
                </div>
            </div>
            <div className="rightSideBarLand">
                <div className="searchBarLand">
                    search
                </div>
                <div className="allItemsBarLand">
                    <div className="itemsBlockLand">Items</div>
                    <div className="cartBlockLand">Card</div>
                </div>
            </div>
        </div>
    );
};

export default BodyLand;