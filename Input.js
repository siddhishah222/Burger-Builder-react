import React from 'react';
import classes from './Input.css';

const input=(props)=>{
  let inputElement=null;
  const inputClasses=[classes.InputElement];
     
    if (props.inValid && props.shouldValidate && props.touched){
      inputClasses.push(classes.Invalid);
    }   //	Now inputClasses also needs to receive the invalid property if the i/p is invalid. and check independent of the typr of i/p so only need to check once at beginning

    switch (props.elementType){
        case('input'):
          inputElement= <input 
                            className={inputClasses.join(' ')} 
                            {...props.elementConfig} 
                            value={props.value}
                            onChange={props.changed}/>;
          break;
        case('textarea'):
          inputElement=<textarea 
                            className={inputClasses.join(' ')} 
                            {...props.elementConfig} 
                            value={props.value}
                            onChange={props.changed}/>;
          break;// <textare/> is a SELF-CLOSING element in REACT
        case('select'):
          inputElement=(
                        <select
                            className={inputClasses.join(' ')}
                            value={props.value}
                            onChange={props.changed}>
                              
                            {props.elementConfig.options.map(option=>(
                              <option key={option.value} 
                                      value={option.value}>
                                {option.displayValue}
                              </option>
                            ))}
                        </select>
                        );
            break;
        default:
            inputElement=<input 
                            className={inputClasses.join(' ')} 
                            {...props.elementConfig} 
                            value={props.value}
                            onChange={props.changed}/>;
    }

    return(
    <div className={classes.Input}>
       <label className={classes.Label}>{props.label}</label>
       {inputElement}   
    </div>
    );
};

export default input;