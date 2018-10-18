import React from 'react';
import UploadImageModalComponent from '../UploadImageModalComponent';
import renderer from 'react-test-renderer';


test('renders correctly', () => {
    const testCreateTaskViewComponent = <UploadImageModalComponent/>;
    const tree = renderer.create(testCreateTaskViewComponent).toJSON();
    expect(tree).toMatchSnapshot();
});
