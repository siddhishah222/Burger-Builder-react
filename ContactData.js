import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import {updateObject} from '../../../shared/utility';
import {checkValidity} from '../../../shared/checkValidity';

class ContactData extends Component{
  state={
    orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
        
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },

            zipode: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'ZipCode'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:5
                },
                valid:false,
                touched:false
               
            },

            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },

            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'E-Mail'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail: true
                },
                valid:false,
                touched:false
            },

            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                   options:[
                       {value:'fastest', displayValue:'Fastest'},
                       {value:'cheapest', displayValue:'Cheapest'}
                    ]
                },
                value:'fastest',
                validation:{},   //empty if it dont need validation 
                valid:true
            },
       },
        formIsValid: false
        // loading:false
    }
    
    orderHandler=(event)=>{
      event.preventDefault();  //dont send request automatically else it will reload the page

      //console.log(this.props.ingredients)
    //   this.setState({loading:true});

       const formData={};
        for (let formElementIdentifier in this.state.orderForm ){
            formData[formElementIdentifier]=this.state.orderForm[formElementIdentifier].value;
        }
       
       const order={    //stored in firebase
       ingredients:this.props.ings,
       price:this.props.pric,
       orderData: formData,
       userId:this.props.userId
       }

       this.props.onOrderBurger(order,this.props.token);
    //alert('You Continue');
    // axios.post('/orders.json',order)
    // .then(response=>{
    //     this.setState({loading:false});
    //     //console.log(response)
    //     this.props.history.push('/');
    // })
    // .catch(error=>{
    //     this.setState({loading:false});
    //     //console.log('error');
    // });
}

// checkValidity(value,rules){
//     let isValid=true;

//      if(!rules){
//         return true;  //for checking validation results if no valudation rules is defined ex in dropdown list. 0R TO manage the flow.
//     }

//     if (rules.required){
//         isValid= value.trim() !== '' && isValid;  //value.trim to remve whitespace at begin or end
//     }
    
//     if (rules.minLength){
//         isValid=value.length>=rules.minLength && isValid;
//     }

//     if (rules.maxLength){
//         isValid=value.length<=rules.maxLength && isValid;
//     }
//     if (rules.isEmail) {
//         const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
//         isValid = pattern.test(value) && isValid
//     }

//     if (rules.isNumeric) {
//         const pattern = /^\d+$/;
//         isValid = pattern.test(value) && isValid
//     }


//     return isValid;
// }

inputChangedHandler=(event, inputIdentifier)=>{
   //console.log(event.target.value);  //to check if it is working

  const updatedFormElement=updateObject(this.state.orderForm[inputIdentifier],{
      value: event.target.value ,
      valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation) ,
      touched:true
  }); 
     //const updatedFormElement=
    //...updatedOrderForm[inputIdentifier]
    //};
  
//   updatedFormElement.value=event.target.value;
//   updatedFormElement.valid=this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
//   updatedFormElement.touched=true; 
//in place of above 6 lines, it is modified to short by updating using utility.js and updateObject

    // const updatedOrderForm={
    //     ...this.state.orderForm 
    // };
   // updatedOrderForm[inputIdentifier]=updatedFormElement;
    const updatedOrderForm=updateObject(this.state.orderForm,{
       [inputIdentifier]: updatedFormElement
    });
  
  let formIsValid=true;
  for(let inputIdentifier in updatedOrderForm){
      formIsValid=updatedOrderForm[inputIdentifier].valid && formIsValid;
  }
   //console.log(formIsValid);
  //console.log(updatedFormElement);
  this.setState({orderForm:updatedOrderForm, formIsValid: formIsValid });
   
}
    render(){
        const formElementsArray=[];
        for (let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config: this.state.orderForm[key]
            });
        }
        let form=(
          <form onSubmit={this.orderHandler}>
            {formElementsArray.map(formElement=>(
                <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    inValid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event)=>this.inputChangedHandler(event, formElement.id)}/>
            ))}  
            {/* created <Input/> dynamically  */}
            <Button btnType="Success" disabled={!this.state.formIsValid} >ORDER</Button>
          </form>
        );

        if (this.props.loading){
            form=<Spinner/>;   
        }

        return(
          <div className={classes.ContactData}>
              <h4>Enter your Contact Data</h4>
             {form}   
          </div>
        );
    }
}

const mapStateToProps=state=>{
    return{
    ings:state.burgerBuilder.ingredients,
    pric:state.burgerBuilder.totalPrice,
    loading:state.order.loading,
    token:state.auth.token,
    userId:state.auth.userId
    }   
};
const mapDispatchToProps= dispatch=> {
    return{
      onOrderBurger:(orderData,token)=> dispatch (actions.purchaseBurger(orderData,token))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));











