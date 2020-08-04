import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';
configure({adapter: new Adapter()});

describe('<NavigationItems />', ()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper = shallow(<NavigationItems />);
    })
    it('should render the navigationItems for burger builde and /auth', ()=>{
         expect(wrapper.find(NavigationItem)).toHaveLength(2);

    });
    it('should render the navigationItems with length 3', ()=>{
        //wrapper = shallow(<NavigationItems isAuth />);
        wrapper.setProps({isAuth: true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3);

    });
    it('should render the navigationItems with length 3', ()=>{
      wrapper.setProps({isAuth: true})
      expect(wrapper.contains(<NavigationItem link="/logout">Log out</NavigationItem>)).toEqual(true)
    });
})

