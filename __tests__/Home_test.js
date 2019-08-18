import React from 'react';
import renderer from 'react-test-renderer';
import { Home } from '../components/Home';

jest.useFakeTimers();

describe('<Home />', () => {
    it('renders without crashing', () => {
        const rendered = renderer.create(<Home />).toJSON();
        expect(rendered).toBeTruthy();
    });
    test('renders correctly', () => {
        const tree = renderer.create(<Home />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
