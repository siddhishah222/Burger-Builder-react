import * as actionTypes from './actionType';
//import axios from 'axios';

export const authStart=()=>{
    return{
     type:actionTypes.AUTH_START
    }
} //DONT need saga as it is action creator which just returns an Action. so it is pure ACTIONCREATOR,no SIDEEFFECTS

export const authSuccess=(token,userId)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        idToken:token,
        userId:userId
    }
} //DONT need saga as it is action creator which just returns an Action. so it is pure ACTIONCREATOR,no SIDEEFFECTS

export const authFail=(error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}//DONT need saga as it is action creator which just returns an Action. so it is pure ACTIONCREATOR,no SIDEEFFECTS

export const logout=()=>{
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('userId');   //copy this in auth.js/saga
   return{
       type:actionTypes.AUTH_INITIATE_LOGOUT
   }// to use this code wout "return" in saga we can use special function we get from redux-saga so "import {put} from 'redux-saga/effects'; " where PUT will dispatch a new ACTION 
} //synch action

export const logoutSucceed=()=>{
    return{
        type:actionTypes.AUTH_LOGOUT  //for this to work import actionTypes
    }
};

export const checkAuthTimeout=(expirationTime)=>{
    // return dispatch=>{
    //   setTimeout(()=>{
    //     dispatch(logout());
    //   },expirationTime*1000)
    // }; instead below code
    return{
        type:actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime
    }
} //Async actions

export const auth=(email,password,isSignup)=>{
    return{
        type:actionTypes.AUTH_USER_SAGA,
        email:email,
        password:password,
        isSignup:isSignup
    }
    // return dispatch=>{
    // dispatch(authStart()); 
    // const authData={
    //     email:email,
    //     password:password,
    //     returnSecureToken:true
    // };
    // let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAWV7xJi7o1TTpWzB8nDJsI_sdRjqzszTU';
    // if(!isSignup){
    //     url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAWV7xJi7o1TTpWzB8nDJsI_sdRjqzszTU';
    // }
    // axios.post(url,authData)    
    //    .then(response=>{

    //        const expirationDate=new Date(new Date().getTime()+response.data.expiresIn*1000)  //wrap all in new Date again to turn it into date, as new Date() wout argument gives us the current date, and new Date(arg) gives us the date with the date we passed as an argument
    //        localStorage.setItem('token',response.data.idToken);   //setItem to store an item in local storage, token as 1st arg which is just a key by which we can fetch it. and local storage is built in JS. && the second arg is the ACTUAL ITEM (response.data.idToken), rxtracted from our response as we did bfore
    //        //but the TOKEN alone will not be useful if we fetch it in future, we also need to know when it expires.
    //        //now we could store expiresIn but that is just the amount of seconds until it is invalid, that wont tell us much the next time we fetch this from local storage coz the number WONT UPDATE, so we will store expirationdate and we need to calculate it as above.
    //        localStorage.setItem('expirationDate',expirationDate); //2nd expirationDate is const we created above
    //        localStorage.setItem('userId',response.data.localId);

    //        dispatch(authSuccess(response.data.idToken,response.data.localId));
    //        dispatch(checkAuthTimeout(response.data.expiresIn));
    //     })
    //    .catch(err=>{
          
    //        dispatch(authFail(err.response.data.error));  //axios wraps responsein this error object so err.response.data.error(object) in place of err
   //    })
//  }
};

export const setAuthRedirectPath=(path)=>{
    return{
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    }
}

export const authCheckState=()=>{
    return{ 
        type:actionTypes.AUTH_CHECK_STATE,
     
    }
    // return dispatch=>{
    //    const token= localStorage.getItem('token');
    //    if (!token){
    //        dispatch(logout());
    //    } else{
    //      const expirationDate=new Date(localStorage.getItem('expirationDate')); //it will be a string but wuth new Date() we can convert it into a date object 
    //             if (expirationDate<=new Date()){
    //            dispatch(logout());
    //             }   else{
    //                 const userId=localStorage.getItem('userId');
    //                 dispatch(authSuccess(token,userId));
    //                 dispatch(checkAuthTimeout((expirationDate.getTime()-new Date().getTime()) /1000));//to get expiration time from date.
    //                 } //getTime is in miliseconds which we need to use in place of getSeconds
    //         }
    // }
}//dont run async code but still Dispatch multiple actions from within the actions