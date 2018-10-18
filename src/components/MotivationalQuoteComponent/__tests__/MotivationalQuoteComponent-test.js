import React from 'react';
import MotivationalQuoteComponent from '../MotivationalQuoteComponent';
import renderer from 'react-test-renderer';

// Mock random function to prevent randomization when matching with snapshot
Math.random = jest.fn().mockImplementation(() => 1);

test('renders correctly with no elemtents', () => {
    const tree = renderer.create(<MotivationalQuoteComponent numTodos={0}/>).toJSON();
    expect(tree).toMatchSnapshot();
});

test('renders correctly with several elemtents', () => {
    const tree = renderer.create(<MotivationalQuoteComponent numTodos={2}/>).toJSON();
    expect(tree).toMatchSnapshot();
});
