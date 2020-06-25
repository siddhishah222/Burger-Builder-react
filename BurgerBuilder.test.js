import {BurgerBuilder} from './BurgerBuilder';
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()}); //with 2 import and configure function enzyme is connected for rendering this tiny components independent of entire app

describe('<BurgerBuilder />', () => {
  let wrapper;

  beforeEach(()=>{
      wrapper=shallow(<BurgerBuilder onInitIngredients={()=>{}}/>);    //onIniIngredients coz in componentDidMount we called this.props.onIniIngredients
  });

  it('should render <BuildControls/> when receiving ingredients', ()=>{
      wrapper.setProps({ings:{salad:0}});
      expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
  it('should render <BuildControls/> when receiving ingredients', ()=>{
    wrapper.setProps({ings:{potato:0}});
    expect(wrapper.find(BuildControls)).toHaveLength(1);
   });
   it('should render <BuildControls/> when receiving ingredients',()=>{
      wrapper.setProps({ings:{onion:0}});
      expect(wrapper.find(BuildControls)).toHaveLength(1);
   });
   it('should render <BuildControls/> when receiving ingredients',()=>{
    wrapper.setProps({ings:{cheese:0}});
    expect(wrapper.find(BuildControls)).toHaveLength(1);
 });
});