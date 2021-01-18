import * as actionTypes from './actionType';

export const purchaseBurgerSuccess=(id, orderData)=>{
    return{
      type: actionTypes.PURCHASE_BURGER_SUCCESS,
      orderId:id,
      orderData: orderData
    }
}   //sync actioncreators

export const purchaseBurgerFail=(error)=>{
    return{
      type: actionTypes.PURCHASE_BURGER_FAIL,
      error: error
    }
}  //sync actioncreators

export const purchaseBurgerStart =()=>{
  return{
      type:actionTypes.PURCHASE_BURGER_START
  };
};

export const purchaseBurger= (orderData,token)=>{
    return{
        type:actionTypes.PURCHASE_BURGER,
        orderData:orderData,
        token:token
    }
    // return dispatch=>{
    //     dispatch(purchaseBurgerStart());
    //     axios.post('/orders.json?auth='+token,orderData)
    //     .then(response=>{
           
    //         dispatch(purchaseBurgerSuccess(response.data.name, orderData));

    //         // this.setState({loading:false});
    //         //console.log(response)
    //         // this.props.history.push('/');
    //     })
    //     .catch(error=>{
    //         dispatch(purchaseBurgerFail(error));
    //         // this.setState({loading:false});
    //         //console.log('error');
    //     });
    // };
};

export const purchasedInit=()=>{
    return{
        type:actionTypes.PURCHASE_INIT
    };
};



export const fetchOrdersSuccess=(orders)=>{
    return{
      type: actionTypes.FETCH_ORDERS_SUCCESS,
      orders:orders,
    }
}   //sync actioncreators

export const fetchOrdersFail=(error)=>{
    return{
      type: actionTypes.FETCH_ORDERS_FAIL,
      error: error
    }
}  //sync actioncreators


export const fetchOrdersStart= ()=>{
    return{
        type:actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrders=(token,userId)=>{
   return{ type:actionTypes.FETCH_ORDERS,
    token:token,
    userId:userId
   }
    // return dispatch=>{
    //     dispatch (fetchOrdersStart());   //to show spinner when we load a page
    //     const queryParams='?auth='+ token+'&orderBy="userId"&equalTo="'+ userId +'"';
    //     //axios.get('/orders.json?auth='+ token)  //pass ? queryparams and auth= + token for authenticated users to have access to orders.
    //     axios.get('/orders.json'+ queryParams) 
    //     .then(res=>{
    //         const fetchedOrders=[];
    //        for (let key in res.data){
    //            fetchedOrders.push({
    //                ...res.data[key],
    //                id:key
    //             });   //converting Orders from object to array
    //        }
    //        dispatch(fetchOrdersSuccess(fetchedOrders));
    //       // this.setState({loading:false, orders:fetchedOrders});
    //     })
    //     .catch(err=>{
    //         dispatch(fetchOrdersFail(err))
    //        //this.setState({loading:false});
    //     })
        
    // };
}



