//import * as actionTypes from '../actions/actionType';
import * as actions from '../actions/index';
import axios from '../../axios-orders';
import { put } from 'redux-saga/effects';

export function* initIngredientsSaga(action){  
       try{
           const response=yield axios.get('https://react-burger-builder-10b6a.firebaseio.com/ingredients.json')
        // .then(response=>{
           yield put(actions.setIngredients(response.data));
         }catch(error){
            yield put(actions.fetchIngredientFailed());
         }           
};
