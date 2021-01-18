import * as actionTypes from './actionType';


export const addIngredient=(name)=>{
    return{
        type:actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredient=(name)=>{
    return{
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const setIngredients=(ingredients)=>{
    return {
        type:actionTypes.SET_INGREDIENTS,
        fetching:ingredients
    };
};

export const fetchIngredientFailed=()=>{
   return {
       type:actionTypes.FETCH_INGREDIENTS_FAILED
   }
};

export const initIngredients=()=>{
    return{
        type:actionTypes.INIT_INGREDIENTS
    }
    // return dispatch=>{     //this synatx due to redux-thunk
    //     axios.get('https://react-burger-builder-10b6a.firebaseio.com/ingredients.json')
    //     .then(response=>{
    //        dispatch(setIngredients(response.data));
    //     })
    //     .catch(error=>{
    //         dispatch(fetchIngredientFailed());
    //     })
    // };
};

//ACTION CREATOR FILE