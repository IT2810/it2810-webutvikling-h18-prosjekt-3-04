import React from 'react';
import HomeViewComponent from '../HomeView';

import renderer from 'react-test-renderer';


test('renders correctly', () => {
    const tree = renderer.create(<HomeViewComponent  />).toJSON();
    expect(tree).toMatchSnapshot();
});
