import React from 'react';
import classes from'./Burger.css';
import BurgerIngredients from'./BurgerIngredients/BurgerIngredients';


const burger=(props)=>{
    //console.log(props);
    let transformedIngredients= Object.keys(props.ingredients)
      .map(igKey=>{
          return[...Array(props.ingredients[igKey])].map((_, i)=>{
              return <BurgerIngredients key={igKey+i} type={igKey} />
          });
      })
        .reduce((arr, el)=>{                    //to flatten the array
            return arr.concat(el)
        },[]);  //logic to convert ingredients to ARRAY of ingredients

        if(transformedIngredients.length ===0){
           transformedIngredients=<p>Please start adding ingredients</p>;
         }
      //console.log(transformedIngredients);
    return(
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top"/>
            {/* <BurgerIngredients type="cheese"/>
            <BurgerIngredients type="salad"/>
            <BurgerIngredients type="potato"/> */}
            {transformedIngredients}
            <BurgerIngredients type="bread-bottom"/>
        </div>
    ); 
};

export default burger;