import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls=[
  {label:'Salad', type:'salad'},
  {label:'Potato', type:'potato'},
  {label:'Onion', type:'onion'},
  {label:'Cheese', type:'cheese'},
];

const buildControls=(props)=>(

<div className={classes.BuildControls}>
<p>Current Price:<strong>{props.price.toFixed(2)}</strong></p>                      
       {controls.map(ctrl=>(
           <BuildControl 
              key={ctrl.label} 
              label={ctrl.label}
              //type={ctrl.type}
              added={()=>props.ingredientsAdded(ctrl.type)} 
              subtracted={()=>props.ingredientsSubtracted(ctrl.type)} 
              disabled={props.disabled[ctrl.type]} />              //25

              //added={props.ingredientAdded}  />
       ))}
       <button 
          className={classes.OrderButton}
          disabled={!props.purchasable}
          onClick={props.ordered}>  
                 {/* ORDER NOW        */}
                 {props.isAuth?'ORDER NOW': 'SIGN UP TO ORDER'}
       </button>  
</div>
);

export default buildControls;
