import React from 'react';
import FabComponent from '../FABComponent';
import renderer from 'react-test-renderer';
import ShallowRenderer from "react-test-renderer/shallow";

let getParam = jest.fn();
let navigate = jest.fn();
let navigation = {
    navigate: navigate,
    getParam: getParam,
};

test('renders correctly', () => {
    const tree = renderer.create(<FabComponent navigation={navigation}/>).toJSON();
    expect(tree).toMatchSnapshot();
});

test("test child onPress() functions",()=> {
    const shallow = new ShallowRenderer();
    shallow.render(<FabComponent navigation={navigation}/>);
    const result = shallow.getRenderOutput();

    // Navigate should not be called initially
    expect(navigate).toHaveBeenCalledTimes(0);
    expect(navigate).not.toHaveBeenCalledTimes(1);

    // Test that steps task button calls correct navigate-function
    result.props.children[0].props.onPress(navigate);
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toBeCalledWith('NewTask', { type: 'steps' });

    // Test that image task button calls correct navigate-function
    result.props.children[1].props.onPress(navigate);
    expect(navigate).toHaveBeenCalledTimes(2);
    expect(navigate).toBeCalledWith('NewTask', { type: 'image' });

    // Test that text task button calls correct navigate-function
    result.props.children[2].props.onPress(navigate);
    expect(navigate).toHaveBeenCalledTimes(3);
    expect(navigate).not.toHaveBeenCalledTimes(4);
    expect(navigate).toBeCalledWith('NewTask', { type: 'text' });
});