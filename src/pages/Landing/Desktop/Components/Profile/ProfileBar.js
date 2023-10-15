import React from 'react';
import '../BodyComponents/ProfileBar.scss'
import MenuProfileBar from "../Menu/MenuProfileBar"
import MainProfileBar from "./MainProfileBar";

const ProfileBar = ({setProfileOpen}) => {
    return (
        <div className='bodyBarProfile'>
            <div className='menuProfileDiv'>
                <MenuProfileBar setProfileOpen={setProfileOpen}/>
            </div>
            <div>
                <MainProfileBar/>
            </div>
        </div>
    );
};

export default ProfileBar;