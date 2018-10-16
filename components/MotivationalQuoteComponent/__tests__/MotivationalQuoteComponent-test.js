import React from 'react';
import MotivationalQuoteComponent from '../MotivationalQuoteComponent';
import renderer from 'react-test-renderer';


test('renders correctly', () => {
    const testCreateTaskViewComponent = <MotivationalQuoteComponent/>;
    const tree = renderer.create(testCreateTaskViewComponent).toJSON();
    expect(tree).toMatchSnapshot();
});
