import React from 'react';
import CheckboxComponent from '../CheckboxComponent';
import renderer from 'react-test-renderer';


test('renders correctly', () => {
    const treeFalse = renderer.create(<CheckboxComponent checked={false} />).toJSON();
    expect(treeFalse).toMatchSnapshot();
    const treeTrue = renderer.create(<CheckboxComponent checked={true} />).toJSON();
    expect(treeTrue).toMatchSnapshot();
});

test("default Checkstate is false", ()=>{
    const checkBox = <CheckboxComponent checked={false}/>;
    expect(checkBox.props.checked).toBe(false);
    expect(checkBox.props.checked).not.toBe(true);
});