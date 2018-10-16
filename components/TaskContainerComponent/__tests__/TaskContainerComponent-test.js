import React from 'react';
import TaskContainerComponent from '../TaskContainerComponent';

import renderer from 'react-test-renderer';
import ShallowRenderer from "react-test-renderer/shallow";

let mockOnPress= jest.fn(x => 'test');

test('renders correctly with type = text', () => {
    const tree = renderer.create(<TaskContainerComponent type={'text'}/>).toJSON();
    expect(tree).toMatchSnapshot();
});

test('renders correctly with type = image', () => {
    const tree = renderer.create(<TaskContainerComponent type={'image'}/>).toJSON();
    expect(tree).toMatchSnapshot();
});

test('renders correctly with type = image', () => {
    const tree = renderer.create(<TaskContainerComponent type={'steps'} data={'0/0'}/>).toJSON();
    expect(tree).toMatchSnapshot();
});

test("test child onPress() functions",()=>{
    const shallow = new ShallowRenderer();
    shallow.render(<TaskContainerComponent type={"text"} onPress={mockOnPress}/>);
    const result = shallow.getRenderOutput();

    //TouchableHighlight.onPress()
    result.props.onPress();
    expect(mockOnPress).not.toHaveBeenCalledTimes(0);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
    expect(mockOnPress).not.toHaveBeenCalledTimes(2);

    //CheckBoxContainerComponent.onPress()
    result.props.children.props.children[1].props.children.props.onPress();
    expect(mockOnPress).toHaveBeenCalledTimes(2);
    expect(mockOnPress).not.toHaveBeenCalledTimes(3);

});