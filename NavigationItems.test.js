
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';
//import Logout from '../../../containers/Auth/Logout/Logout';

configure({adapter: new Adapter()}); //with 2 import and configure function enzyme is connected for rendering this tiny components independent of entire app

describe('<NavigationItems />', () => {
    let wrapper;
    beforeEach(()=>{
        wrapper=shallow(<NavigationItems/>);
    });

    it('should render two <NavigationItem /> elements if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2); //in expect define the thing we want to check
    });

    it('should render three <NavigationItem /> elements if authenticated', () => {
        // wrapper=shallow(<NavigationItems isAuthenticated/>);
        wrapper.setProps({isAuthenticated:true});  //setProps is a helper method from enzymes package
        expect(wrapper.find(NavigationItem)).toHaveLength(3); //in expect define the thing we want to check
    });

    it('should render one <NavigationItem /> element if authenticated', () => {
       //can use any of below 2
       wrapper.setProps({isAuthenticated: true});
       expect(wrapper.contains(<NavigationItem link="/logout"> Logout</NavigationItem>)).toEqual(true);
       
       // expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toHaveLength(1); //in expect define the thing we want to check
       
    });

    // it('should an exact logout button', () => {
    //     wrapper.setProps({isAuthenticated: true});
    //     expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    // });

});