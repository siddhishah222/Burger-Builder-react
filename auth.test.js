import reducer from './auth';
import * as actionTypes from '../actions/actionType';

describe('auth reducer',()=>{
   it('should return the initial state',()=>{
     expect(reducer(undefined,{})).toEqual({
        token: null,
        userId:null,
        error:null,
        loading:false,
        authRedirectPath:'/' 
    });
   });
   

    it('should store the token upon login',()=>{
        expect(reducer ({
            token: null,
            userId:null,
            error:null,
            loading:false,
            authRedirectPath:'/' 
        },{
            type:actionTypes.AUTH_SUCCESS, //from auth/actions
            idToken:'some-token',
            userId:'some-user-id'
        })).toEqual({
            token: 'some-token',
            userId:'some-user-id',
            error:null,
            loading:false,
            authRedirectPath:'/' 
        });
    })

});

//undefined as the initial state when the app loads is not defined