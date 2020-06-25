import * as actionTypes from '../actions/actionType';
import {updateObject} from '../../shared/utility';

const initialState={
    ingredients:null,
    totalPrice: 4,
    error: false,
    building:false
    //purchasable:0
};

const INGREDIENT_PRICES={           //7
    salad: 0.5,
    onion: 0.65,
    cheese: 0.55,
    potato: 1.3
}
const addIngredient=(state,action)=>{
    const updatedIngredient= {[action.ingredientName]: state.ingredients[action.ingredientName]+1}
    const updatedIngredients=updateObject(state.ingredients, updatedIngredient);
    const updatedState={
        ingredients: updatedIngredients,
        totalPrice:state.totalPrice+ INGREDIENT_PRICES[action.ingredientName],
        building:true
    }
 return updateObject(state,updatedState);
};

const removeIngredient=(state,action)=>{
    const updatedIng= {[action.ingredientName]: state.ingredients[action.ingredientName]-1}
    const updatedIngs=updateObject(state.ingredients, updatedIng);
    const updatedSt={
        ingredients: updatedIngs,
        totalPrice:state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building:true
    }
 return updateObject(state,updatedSt);
};

const setIngredients=(state,action)=>{
    return updateObject(state,{
        ingredients:{
            salad:action.fetching.salad,
            onion:action.fetching.onion,
            cheese: action.fetching.cheese,
            potato:action.fetching.potato
        },
        //set ingredients to action.fetching, we received this fetching by assigning ingredients (in ARGUMENT) in BURGERBUILDER.JS/ACTIONS where we have setIngredients.
        error:false,
        totalPrice:4,
        building:false //coz we just reloaded the page and starting from scratch
    } );
}

const fetchIngredientsFailed=(state, action)=>{
    return updateObject(state,{error:true})
};



const reducer=(state=initialState, action)=>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENT: return addIngredient(state,action);
        
        //     const updatedIngredient= {[action.ingredientName]: state.ingredients[action.ingredientName]+1}
        //     const updatedIngredients=updateObject(state.ingredients, updatedIngredient);
        //     const updatedState={
        //         ingredients: updatedIngredients,
        //         totalPrice:state.totalPrice+ INGREDIENT_PRICES[action.ingredientName]
        //     }
        //  return updateObject(state,updatedState);
//using utility function, reduce the above code
         //the code below is modified using utility function to short reducer code, it is optional though
        //     return{
        //         ...state,  //copy the entire old state, but it doesnt create deep clone object so in new state distribute all PROPERTIES of state ingredients
        //         ingredients:{    //new JS object. immutably, dont use the old one, create a new.
        //           ...state.ingredients, //distribute all PROPERTIES(potato..) of state ingredients. this is to really create a new OBJECT as just distributing STATE here wont work coz it doesnt create deep clone object, doesnt go into objects for these too,
        //              [action.ingredientName]: state.ingredients[action.ingredientName]+1 //this will receive a new value                  //in this overwrite the given ingredients which we need as a PAYLOAD of this action.
        //         },
        //         totalPrice:state.totalPrice+ INGREDIENT_PRICES[action.ingredientName]
        //    }

        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state,action);

        //     const updatedIng= {[action.ingredientName]: state.ingredients[action.ingredientName]-1}
        //     const updatedIngs=updateObject(state.ingredients, updatedIng);
        //     const updatedSt={
        //         ingredients: updatedIngs,
        //         totalPrice:state.totalPrice- INGREDIENT_PRICES[action.ingredientName]
        //     }
        //  return updateObject(state,updatedSt);
//using utility function, reduce the above code

            // return{
            //     ...state,
            //     ingredients:{
            //         ...state.ingredients,
            //         [action.ingredientName]: state.ingredients[action.ingredientName]-1
            //     },
            //     totalPrice:state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            // }

        case actionTypes.SET_INGREDIENTS: return setIngredients(state,action);
            // return updateObject(state,{
            //     ingredients:{
            //         salad:action.fetching.salad,
            //         onion:action.fetching.onion,
            //         cheese: action.fetching.cheese,
            //         potato:action.fetching.potato
            //     },
            //     //set ingredients to action.fetching, we received this fetching by assigning ingredients (in ARGUMENT) in BURGERBUILDER.JS/ACTIONS where we have setIngredients.
            //     error:false,
            //     totalPrice:4
            // } );
//using utility function, reduce the above code

            // return{
            //     ...state,
            //     //ingredients: action.fetching,
            //     ingredients:{
            //         salad:action.fetching.salad,
            //         onion:action.fetching.onion,
            //         cheese: action.fetching.cheese,
            //         potato:action.fetching.potato
            //     },
            //     //set ingredients to action.fetching, we received this fetching by assigning ingredients (in ARGUMENT) in BURGERBUILDER.JS/ACTIONS where we have setIngredients.
            //     error:false,
            //     totalPrice:4
            // };

        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state,action);

           // return updateObject(state,{error: true})


            // return{
            //     ...state,
            //     error: true
            // };

          default: return state;   //dont need BREAK statemnet bceause we return in each case.
    }
};

export default reducer;