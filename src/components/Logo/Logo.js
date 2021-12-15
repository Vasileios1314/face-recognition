import React from "react";
import Tilt from 'react-tilt';
import pirate from './pirate.png'
import './Logo.css';

const Logo = () => {
    return (
       <div className="ma4 mt0">
        <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 250, width: 250 }} >
            <div className="Tilt-inner pa3">
                <img style={{paddingTop: '50px'}} alt= 'logo' src={pirate} />
            </div>
        </Tilt>
       </div>
    );  
}

export default Logo;