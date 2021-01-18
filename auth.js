import {put,call} from 'redux-saga/effects';
//import * as actionTypes from '../actions/actionType';
import * as actions from '../actions/index';
import {delay} from 'redux-saga/effects';
import axios from 'axios';

export function* logoutSaga(action){
    yield call([localStorage,'removeItem'],"token");
   //call function to run below sync code and we dont need to wait for it and adv is CALL makes GENERATOR TESTABLE, coz we can easily mock this and not really execute this code, whilst we always need to execute it down there.
//    yield localStorage.removeItem('token');  //yield coz this is not a normal function and in generator we should prefix PREPEND.
      yield call([localStorage,'removeItem'],"expirationDate"); 
      yield call([localStorage,'removeItem'],"userId");   
      
   
//    yield put({
//         type:actionTypes.AUTH_LOGOUT  //for this to work import actionTypes
//     })
   yield put(actions.logoutSucceed());

}  //it is not a function but just a kind of function and * after function is imp as it turns this FUNCTION into so-called GENERATOR, and logout is a name from auth.js/actions as it is just handling sync code so it is seperated here and handled by SAGAs and not by ACTION as actions handle ASYnc code.
//yield means if we were in an asynchronous action, it wouldnt continue before the step is done.
//put will dispatch action.

export function* checkAuthTimeoutSaga(action){
    yield delay(action.expirationTime*1000);
    yield put(actions.logout());  //dispatch(logout()); this is for actions and for sagas it is convert using PUT
}

export function* authUserSaga(action){
   yield put(actions.authStart());  //this is how we dispatch in SAGAs the below code is to dispatch in ACTIONS
   //dispatch(authStart()); 
   const authData={
       email:action.email,
       password:action.password,
       returnSecureToken:true
   };
   let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAWV7xJi7o1TTpWzB8nDJsI_sdRjqzszTU';
   if(!action.isSignup){
       url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAWV7xJi7o1TTpWzB8nDJsI_sdRjqzszTU';
   }
   
   //try is used like if else statement
   try {
   const response= yield axios.post(url,authData)    
      // .then(response=>{
      const expirationDate= yield new Date(new Date().getTime()+response.data.expiresIn*1000)  //wrap all in new Date again to turn it into date, as new Date() wout argument gives us the current date, and new Date(arg) gives us the date with the date we passed as an argument
      yield localStorage.setItem('token',response.data.idToken);   //setItem to store an item in local storage, token as 1st arg which is just a key by which we can fetch it. and local storage is built in JS. && the second arg is the ACTUAL ITEM (response.data.idToken), rxtracted from our response as we did bfore
          //but the TOKEN alone will not be useful if we fetch it in future, we also need to know when it expires.
          //now we could store expiresIn but that is just the amount of seconds until it is invalid, that wont tell us much the next time we fetch this from local storage coz the number WONT UPDATE, so we will store expirationdate and we need to calculate it as above.
      yield localStorage.setItem('expirationDate',expirationDate); //2nd expirationDate is const we created above
      yield localStorage.setItem('userId',response.data.localId);

      yield put(actions.authSuccess(response.data.idToken,response.data.localId));
      yield put(actions.checkAuthTimeout(response.data.expiresIn));
      //  })
   } catch (error){
      yield put(actions.authFail(error.response.data.error));  //axios wraps responsein this error object so err.response.data.error(object) in place of err
   }
     
}

export function* authCheckStateSaga(action){
      const token= yield localStorage.getItem("token");
      if (!token){
          yield put(actions.logout());
      } else{
        const expirationDate= yield new Date(localStorage.getItem('expirationDate')); //it will be a string but wuth new Date() we can convert it into a date object 
               if (action.expirationDate<=new Date()){
               yield put(actions.logout());
               } else{
                   const userId=yield localStorage.getItem('userId');
                   yield put(actions.authSuccess(token,userId));
                   yield put(actions.checkAuthTimeout((expirationDate.getTime()-new Date().getTime()) /1000));//to get expiration time from date.
                   } //getTime is in miliseconds which we need to use in place of getSeconds
           }
   }
