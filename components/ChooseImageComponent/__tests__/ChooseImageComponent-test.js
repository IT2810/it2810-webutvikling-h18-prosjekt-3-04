import React from 'react';
import ChooseImageComponent from '../ChooseImageComponent';
import TaskContainerComponent from '../../TaskContainerComponent/TaskContainerComponent';

import renderer from 'react-test-renderer';


test('renders correctly', () => {
    const temptaskNotNull = {
        data: 'data:image/jpeg;base64,testestestestestestestest',
    };

    const treeNotNull = renderer.create(<ChooseImageComponent currentTask={temptaskNotNull}/>).toJSON();
    expect(treeNotNull).toMatchSnapshot();

    const temptaskNull = {
        data: null,
    };
    const treeNull = renderer.create(<ChooseImageComponent currentTask={temptaskNull}/>).toJSON();
    expect(treeNull).toMatchSnapshot();
});
