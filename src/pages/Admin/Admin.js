import './Admin.scss';
import React, {useState} from 'react';
import Main from "./Components/Main/Main";
import Menu from "./Components/Menu/Menu";
import {changeStatusOne} from "./features/allOrders";
import axios from "axios";
const tg = window.Telegram.WebApp
function Admin() {
    tg.isClosingConfirmationEnabled = true

    const [newMenu, setNewMenu] = useState(1)
    return (
        <div className="AppAdmin">
            <div className='bodyApp'>
                {/*<Menu setNewMenu={setNewMenu}/>*/}
                <Main newMenu={newMenu}/>
            </div>
        </div>
    );
}

export default Admin;
