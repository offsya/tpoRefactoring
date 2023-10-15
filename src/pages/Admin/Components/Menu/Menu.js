import React, {useState} from 'react';
import './Menu.scss';
import MenuButton from "./MenuButtons/MenuButton";
const Menu = ({setNewMenu}) => {
    const [select, setSelect] = useState(false);
    return (
        <div className='menuClassAdmin'>
            <div className='menuClassCenter'>
                <div className="logoTextMenuAdmin">
                    <div>
                        Tu Producto <br/>Online <span>Admin</span>
                    </div>
                </div>
                <div className='menuButtonApps' style={{marginBottom: select ? '0px' : '84px'}}>
                    <MenuButton elem={{name: "Apps", id: 6}} setSelect={setSelect} select={select}/>
                    {
                        select &&
                        <div className='menuButtonsDifferentApps'>
                            <div className='menuButtonsDifferentAppsElem'>- TPO Site</div>
                            <div className='menuButtonsDifferentAppsElem'>- Work Timer</div>
                            <div className='menuButtonsDifferentAppsElem'>- DigiBarna</div>
                            <div className='menuButtonsDifferentAppsElem'>- BotOn</div>
                        </div>
                    }
                </div>

                <div className='menuButtonsConteiner'>
                    {
                        [{name: "Orders", id: 1}, {name: "Clients", id: 2}, {name: "Catalog", id: 3}, {name: "Messages", id: 4}, {name: "Settings", id: 5}].map(elem => {
                            return <MenuButton elem={elem} setNewMenu={setNewMenu}/>
                        })
                    }
                </div>
                <div className='menuButtonSignOut'>
                    <MenuButton elem={{name: "Sign Out", id: 7}}/>
                </div>
            </div>
        </div>
    );
};

export default Menu;