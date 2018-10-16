import React from 'react';
import TaskContainerComponent from '../TaskContainerComponent';

import renderer from 'react-test-renderer';


it('renders correctly', () => {
    const tree = renderer.create(<TaskContainerComponent/>).toJSON();
    expect(tree).toMatchSnapshot();
});
