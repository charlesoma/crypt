import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';

jest.useFakeTimers();

describe('<App />', () => {
    it('renders without crashing', () => {
        const rendered = renderer.create(<App />).toJSON();
        expect(rendered).toBeTruthy();
    });
    test('renders correctly', () => {
        const tree = renderer.create(<App />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
