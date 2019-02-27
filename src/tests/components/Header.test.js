import React from 'react';
import { shallow } from 'enzyme';
//import toJSON from 'enzyme-to-json';
import { Header } from '../../components/Header';

// react-test-renderer is a react library that allows us to render our components inside of regular js code for testing purposes

test('should render Header correctly', () => {
    //const renderer = new ReactShallowRenderer();

    // use renderer to render my Header component
    //renderer.render(<Header />);

    //* use snapshots to track changes to data over time
    // i can create a snapshot of my Header at a current point in time, and then be notified if that ever changes
    //expect(renderer.getRenderOutput()).toMatchSnapshot();

    // console.log(renderer.getRenderOutput());
    // ! the above code is all commented out. it was used before Andrew refactored to use enzyme

    const wrapper = shallow(<Header startLogout={() => {}} />);

    //* pass things into .find(), just like document.querySelector('#blahblah')
    //expect(wrapper.find('h1').text()).toBe('Expensify');

    //* create a snapshot based off the enzyme wrapper
    // to make enzyme work with the snapshot testing functionality, we need to install a utility library called enzyme-to-json. I then added this library to the jest.config.json file, so it doesn't have to be imported into every single test file
    //! after adding toJSON to the config file, i can refactor this -> expect(toJSON(wrapper)).toMatchSnapshot();
    //* to this:
    expect(wrapper).toMatchSnapshot();
});

test('should call start logout on button click', () => {
    const startLogoutSpy = jest.fn();

    const wrapper = shallow(<Header startLogout={startLogoutSpy} />);

    wrapper.find('button').simulate('click');
    expect(startLogoutSpy).toHaveBeenCalled();
});
