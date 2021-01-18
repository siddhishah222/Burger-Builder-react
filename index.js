import {logoutSaga,checkAuthTimeoutSaga,authUserSaga, authCheckStateSaga} from './auth';
import {takeEvery, all, takeLatest} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionType';
import { initIngredientsSaga } from './burgerBuilder';
import {purchaseBurgerSaga,fetchOrdersSaga} from './order';


export function* watchAuth(){
    yield all([
         takeEvery(actionTypes.AUTH_INITIATE_LOGOUT,logoutSaga),
         takeEvery(actionTypes.AUTH_CHECK_TIMEOUT,checkAuthTimeoutSaga),
         takeEvery(actionTypes.AUTH_USER_SAGA,authUserSaga),
         takeEvery(actionTypes.AUTH_CHECK_STATE,authCheckStateSaga),
         takeEvery(actionTypes.FETCH_ORDERS,fetchOrdersSaga),
    ])
    
}

export function* watchBurgerBuilder(){
    yield takeEvery(actionTypes.INIT_INGREDIENTS,initIngredientsSaga);
}

export function* watchOrder(){
    yield takeLatest(actionTypes.PURCHASE_BURGER ,purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS,fetchOrdersSaga);
}
//yield says execute this function and wait fro it to finish 
//to takeEvery( Pass the action we want to listen to)