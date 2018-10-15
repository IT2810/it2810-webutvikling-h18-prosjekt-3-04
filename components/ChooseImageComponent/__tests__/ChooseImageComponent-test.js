import React from 'react';
import ChooseImageComponent from '../ChooseImageComponent';
import TaskContainerComponent from '../../TaskContainerComponent/TaskContainerComponent';

import renderer from 'react-test-renderer';


test('renders correctly', () => {
    const temptask = <TaskContainerComponent data={null}/>;
    const tree = renderer.create(<ChooseImageComponent currentTask={temptask}/>).toJSON();
    expect(tree).toMatchSnapshot();

});
