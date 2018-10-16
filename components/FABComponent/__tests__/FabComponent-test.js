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

    expect(navigate).toHaveBeenCalledTimes(0);
    expect(navigate).not.toHaveBeenCalledTimes(1);
    result.props.children[0].props.onPress(navigate);
    expect(navigate).toHaveBeenCalledTimes(1);
    result.props.children[1].props.onPress(navigate);
    expect(navigate).toHaveBeenCalledTimes(2);
    result.props.children[2].props.onPress(navigate);
    expect(navigate).toHaveBeenCalledTimes(3);
    expect(navigate).not.toHaveBeenCalledTimes(4);

});