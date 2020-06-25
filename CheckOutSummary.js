import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckOutSummary.css';

const checkOutSummary=(props)=>{
    return(
      <div className={classes.CheckOutSummary}>
          <h1>Hope you will love it!</h1>
          <div style={{width: '100%', margin:'auto'}}>
                <Burger ingredients={props.ingredients}/>
          </div>
          <Button 
             btnType="Danger"
             clicked={props.checkoutCancelled}> CANCEL </Button>
          <Button 
              btnType="Success"
              clicked={props.checkoutContinued}> CONTINUE </Button>
      </div>
    )
}

export default checkOutSummary;