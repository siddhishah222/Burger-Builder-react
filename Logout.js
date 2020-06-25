import React, {Component} from 'react';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

class Logout extends Component{
    componentDidMount(){
        //this.props.onLogout(this.props.history);//to redirect from logout to burgerbuilder page,one method to forward props of this comp which will be loaded via ROUTER using HISTORY, and on HISTORY object we would have PUSH method
        this.props.onLogout();   //2nd method is redirect declaratively
    }
    render(){
        return(
          <Redirect to="/"/>  
        );
    
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onLogout:()=>dispatch(actions.logout())
    }
}
export default connect(null,mapDispatchToProps)(Logout);