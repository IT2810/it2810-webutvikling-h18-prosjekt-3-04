import React from 'react';
import FabComponent from '../FABComponent';

import renderer from 'react-test-renderer';


test('renders correctly', () => {
    const tree = renderer.create(<FabComponent />).toJSON();
    expect(tree).toMatchSnapshot();
});
