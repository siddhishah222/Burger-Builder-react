import {put} from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from '../../axios-orders';


export function* purchaseBurgerSaga(action){
 
    yield put(actions.purchaseBurgerStart());
    try{
        const response= yield axios.post('/orders.json?auth='+action.token,action.orderData)
            yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData));
   }catch(error){
            yield put(actions.purchaseBurgerFail(error));
            }
};

export function* fetchOrdersSaga(action){
        yield put(actions.fetchOrdersStart());   //to show spinner when we load a page
        const queryParams='?auth='+ action.token+'&orderBy="userId"&equalTo="'+ action.userId +'"';
        //axios.get('/orders.json?auth='+ token)  //pass ? queryparams and auth= + token for authenticated users to have access to orders.
        try{
        const response= yield axios.get('/orders.json'+ queryParams)  
          const fetchedOrders=[];
           for (let key in response.data){
               fetchedOrders.push({
                   ...response.data[key],
                   id:key
                });   //converting Orders from object to array
           }
           yield put(actions.fetchOrdersSuccess(fetchedOrders));
          // this.setState({loading:false, orders:fetchedOrders});
    }catch(error){
            yield put(actions.fetchOrdersFail(error))
           //this.setState({loading:false});
        }
}
