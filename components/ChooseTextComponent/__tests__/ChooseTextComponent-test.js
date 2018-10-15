import React from 'react';
import ChooseTextComponent from '../ChooseTextComponent';
import TaskContainerComponent from '../../TaskContainerComponent/TaskContainerComponent';

import renderer from 'react-test-renderer';


test('renders correctly', () => {
    const temptask = <TaskContainerComponent data={null}/>;
    const tree = renderer.create(<ChooseTextComponent currentTask={temptask}/>).toJSON();
    expect(tree).toMatchSnapshot();

});
