import React from 'react';
import burgerLogo from '../assets/images/pfclogo.jpg';
import classes from './Logo.css';

const logo=(props)=>(
    <div className={classes.Logo} style={{height:props.height}}>
        <img src={burgerLogo} alt="Padmavati"/>
    </div>
);
export default logo;