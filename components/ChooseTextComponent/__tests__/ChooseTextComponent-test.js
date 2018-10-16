import React from 'react';
import ChooseTextComponent from '../ChooseTextComponent';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow'

let updateText = jest.fn();

test('renders correctly', () => {
    const tree = renderer.create(<ChooseTextComponent updateText={updateText}/>).toJSON();
    expect(tree).toMatchSnapshot();
});

test('updating text should call updateText function', () => {
    const shallow = new ShallowRenderer();
    shallow.render(<ChooseTextComponent updateText={updateText}/>);
    const result = shallow.getRenderOutput();
    result.props.onChangeText('test');
    expect(updateText).toBeCalled();
});
