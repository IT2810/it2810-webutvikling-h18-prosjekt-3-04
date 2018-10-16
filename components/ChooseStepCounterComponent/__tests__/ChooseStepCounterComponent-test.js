import React from 'react';
import ChooseStepCounterComponent from '../ChooseStepCounterComponent';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow'

let updateStepsText = jest.fn();

test('renders correctly', () => {
    const tree = renderer.create(<ChooseStepCounterComponent updateStepsText={updateStepsText}/>).toJSON();
    expect(tree).toMatchSnapshot();
});

test('updating text should call updateStepsText function', () => {
    const shallow = new ShallowRenderer();
    shallow.render(<ChooseStepCounterComponent updateStepsText={updateStepsText}/>);
    const result = shallow.getRenderOutput();
    result.props.onChangeText('1234');
    expect(updateStepsText).toBeCalledWith('1234');
    expect(updateStepsText).not.toBeCalledWith('ostepop');
});
