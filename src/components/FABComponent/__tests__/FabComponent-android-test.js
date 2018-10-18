import React from 'react';
import FabComponent from '../FABComponent';
import renderer from 'react-test-renderer';

//Simulate Android platform since step-task should be unavailable here
jest.mock('Platform', () => {
    const Platform = require.requireActual('Platform');
    Platform.OS = 'android';
    return Platform;
});

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
