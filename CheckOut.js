import React, {Component} from 'react';
import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData.js' ;
import {connect} from 'react-redux';
//import * as actions from '../../store/actions/index';

class CheckOut extends Component{
    // state={
    //     ingredients:null,
    //     price: 0
    // }

    // componentWillMount(){
    //      const query=new URLSearchParams(this.props.location.search);
    //      const ingredients={};
    //      let price=0;
    //      for (let param of query.entries()){
    //         //['salad','1']
    //         if (param[0]==='price'){
    //          price= param[1];
    //         } 
    //         else{
    //         ingredients[param[0]] = +param[1];
    //         }
    //     }  
    //         this.setState({ingredients:ingredients, totalPrice: price});
       
    // }
    

    checkoutContinuedHandler=()=>{
       this.props.history.replace('/checkout/contact-data');
    }

    checkoutCancelledHandler=()=>{
         this.props.history.goBack('/');
    }
  render(){
    let summary=<Redirect to="/"/>
    if (this.props.ings){
      const purchasedRedirect= this.props.purchased ? <Redirect to="/"/>: null;
      summary=(
        <div>
          {purchasedRedirect}
          <CheckOutSummary 
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}/>
          <Route path={this.props.match.path + '/contact-data'} 
              component={ContactData}/>
        </div>
      );
    }

    return summary;
  
  }
}

const mapStateToProps=state=>{
    return{
      ings: state.burgerBuilder.ingredients,
      pric: state.burgerBuilder.totalPrice,
      purchased: state.order.purchased
    }
}



export default connect (mapStateToProps)(CheckOut);
//export default connect (null,mapDispatchToProps)(CheckOut);
// if we dont have mapStateToProps and just have to pass mapDispatchToProps, we need to pass (null,mapDispatchToProps) because mapDispatchToProps should always be passed as a second argument.


















