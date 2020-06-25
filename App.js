import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
//import CheckOut from './containers/CheckOut/CheckOut';
import {Route, Switch,withRouter,Redirect} from 'react-router-dom';
//import Orders from './containers/Orders/Orders';
//import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout=asyncComponent(()=>{
  return import('./containers/CheckOut/CheckOut');
});

const asyncOrders=asyncComponent(()=>{
  return import('./containers/Orders/Orders');
});

const asyncAuth=asyncComponent(()=>{
  return import('./containers/Auth/Auth');
});

 class App extends Component {
  // state={
  //   show:true
  // }

  // componentDidMount(){
  //   setTimeout(()=>{
  //     this.setState({show:false});
  //   },5000);
  // }

  componentDidMount(){
    this.props.onTryAutoSignup();
  }
  render() {
    let routes=(
      <Switch>
          <Route path="/auth" component={asyncAuth}/>
          <Route exact path="/" component={BurgerBuilder}/>
          <Redirect to='/'/>
      </Switch>
    );//unauthenticated routes

    if(this.props.isAuthenticated){
         routes=(
      <Switch>
          <Route path="/auth" component={asyncAuth}/>
          <Route path="/checkout" component={asyncCheckout}/>
          <Route path="/orders" component={asyncOrders}/>
          <Route path="/logout" component={Logout}/>
          <Route exact path="/" component={BurgerBuilder}/>
          <Redirect to='/'/>
      </Switch>
         );  //authenticated routes
    }

    return (
      <div >
        <Layout> 
             {routes}    
        </Layout>
      </div>
      
    );
  }
}

const mapStateToProps=state=>{
  return{
     isAuthenticated:state.auth.token!==null
  }
}
const mapDispatchToProps=dispatch=>{
  return{
    onTryAutoSignup:()=>dispatch(actions.authCheckState())
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
//{this.state.show? <BurgerBuilder/>:null}




