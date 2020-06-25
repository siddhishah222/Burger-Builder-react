import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
//import * as actionTypes from '../store/actions/actionType';
import * as actions from '../../store/actions/index';

// const INGREDIENT_PRICES={           //7
//     salad: 0.5,
//     onion: 0.65,
//     cheese: 0.55,
//     potato: 1.3
// }


export class BurgerBuilder extends Component{
    // constructor(props){
    //     super(props);
    //     this.state={...}
    // }
    state= {
       //ingredients:null, //null coz we fetch data from server using axios.get
       //totalPrice: 4,           //6
       //purchasable:false ,      //33
       purchasing:false,
    //    loading:false,
    //    error:false
    }

    componentDidMount() {
       
        this.props.onInitIngredients();
        // axios.get('https://react-burger-builder-10b6a.firebaseio.com/ingredients.json')
        // .then(response=>{
        //     this.setState({ingredients: response.data});
        // })
        // .catch(error=>{
        //     this.setState({error:true})
        // })
       
    }

    updatePurchaseState(ingredients){   //34
    //  const ingredients={ 
    //      ...this.state.ingredients
    //  };
     const sum=Object.keys(ingredients)
     .map(igKey=>{
        return ingredients[igKey];
      })
     .reduce((sum,el)=>{    //38   to turn into a single number
         return sum+el;     //39
     }, 0); 
    //this.setState({purchasable: sum>0}) ;     //40
    return sum>0
}

// addIngredientHandler=(type)=>{              //1
//       const oldCount=this.state.ingredients[type];          //2
//       const updatedCount=oldCount+1;                //3
//       const updatedIngredients={                     
//           ...this.state.ingredients                   //4
//       };

//       updatedIngredients[type]=updatedCount;            //5
//       const PriceAddition=INGREDIENT_PRICES[type];          //8
//       const oldPrice=this.state.totalPrice;         //9
//       const newPrice=oldPrice+PriceAddition;            //10
//       this.setState({totalPrice:newPrice, ingredients:updatedIngredients});     //11
//       this.updatePurchaseState(updatedIngredients);
// }

// removeIngredientHandler=(type)=>{           //1
    
//     const oldCount=this.state.ingredients[type]; //13 
//     if (oldCount<=0){      //18
//         return;
//     }        
//       const updatedCount=oldCount-1;                
//       const updatedIngredients={                     
//           ...this.state.ingredients                   
//       };

//       updatedIngredients[type]=updatedCount;            
//       const PriceSubtract=INGREDIENT_PRICES[type];          
//       const oldPrice=this.state.totalPrice;         
//       const newPrice=oldPrice-PriceSubtract;            
//       this.setState({totalPrice:newPrice, ingredients:updatedIngredients}); 
//       this.updatePurchaseState(updatedIngredients); 
// }

purchaseHandler=()=> {
    if(this.props.isAuthenticated){
        this.setState({purchasing:true});
    }else{
        this.props.onSetAuthRedirectPath('/checkout');
        this.props.history.push('/auth');
    }
}
     

purchaseCancelHandler=()=>{
    this.setState({purchasing:false});
}

purchaseContinueHandler=()=>{
// this.setState({loading:true});
//    const order={
//        ingredients:this.state.ingredients,
//        price:this.state.totalPrice,
//        customer:{
//            name:'siddhi',
//            address: {
//                street:'Padmavati',
//                zipode: 388540,
//                country:'India'
//            },
//            email:'sid@shah.com'
//        },
//        deliveryMethod:'fastest'
//    }
//     //alert('You Continue');
//     axios.post('/orders.json',order)
//     .then(response=>{
//         this.setState({loading:false, purchasing:false});
//         //console.log(response)
//     })
//     .catch(error=>{
//         this.setState({loading:false, purchasing:false});
//         //console.log('error');
//     });

//   const queryParams=[];    // To ENCODE ingredients in search query
//   for(let i in this.state.ingredients){
//       queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
//   }
  
//   queryParams.push('price=' + this.state.totalPrice);

//   const queryString=queryParams.join('&');
//   this.props.history.push({
//       pathname: '/checkout',
//       search:'?'+ queryString
//   });

this.props.onInitPurchase();
this.props.history.push('/checkout');
}

render(){
    const disabledInfo={                    //21
        //...this.state.ingredients              // simply is object of state which is copied here in immutable way.
        ...this.props.ings
    };
     for(let key in disabledInfo){                  //22 key is the value of ingredients
        disabledInfo[key]=disabledInfo[key]<=0          //23
     } 
    
    let orderSummary= null; 
    let burger=this.props.error? <p>Ingredients cant be loaded</p>:<Spinner/>;
    
    if(this.props.ings){
        burger=(
            <Aux>
              <Burger ingredients={this.props.ings}/>
              <BuildControls   
            //    ingredientsAdded={this.addIngredientHandler}
            //    ingredientsSubtracted={this.removeIngredientHandler}
            ingredientsAdded={this.props.onIngredientAdded}
            ingredientsSubtracted={this.props.onIngredientRemoved}
               disabled={disabledInfo}          //24
               //purchasable={this.state.purchasable}
               purchasable={this.updatePurchaseState(this.props.ings)}
               //price={this.state.totalPrice}        //28
               price={this.props.pric}
               ordered={this.purchaseHandler}
               isAuth={this.props.isAuthenticated}
               />  
            </Aux>
        );
        orderSummary=  
            <OrderSummary 
                ingredients={this.props.ings}
                purchaseContinued={this.purchaseContinueHandler}
                purchaseCancelled={this.purchaseCancelHandler}
                price={this.props.pric}/>
    }
    
    // if(this.state.loading){
    //                 orderSummary= <Spinner/>;
    //              }
    
    
    return(
        <Aux>
            <Modal show={this.state.purchasing} 
                   modalClosed={this.purchaseCancelHandler}>
               {orderSummary}
            </Modal>
           {burger}
        </Aux>
       
    );
}

}

const mapStateToProps= state=> {
    return{
        ings:state.burgerBuilder.ingredients ,           //DEFINE WHICH PROPERTY SHOULD HOLD WHICH SLICE OF THE STATE
        pric:state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated:state.auth.token!==null
    };
}

// const mapDispatchToProps= dispatch=>{
//     return{
//       onIngredientAdded:(ingName)=>dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName:ingName}),
//       onIngredientRemoved:(ingName)=>dispatch({type:actionTypes.REMOVE_INGREDIENT, ingredientName:ingName}),
//     }
// }

const mapDispatchToProps= dispatch=>{
     return{
       onIngredientAdded:(ingName)=>dispatch(actions.addIngredient(ingName)),
       onIngredientRemoved:(ingName)=>dispatch(actions.removeIngredient(ingName)),
       onInitIngredients:()=>dispatch(actions.initIngredients()),
       onInitPurchase:()=>dispatch(actions.purchasedInit()),
       onSetAuthRedirectPath:(path)=>dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));

















