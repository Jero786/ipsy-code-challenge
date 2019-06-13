// Libs
import { shallow } from 'enzyme';
import * as React from 'react';

// Card
import Loading from './loading';

describe('Loading', () => {
    it('should render properly', () => {
        const wrapper = shallow(<Loading />);

        expect(wrapper.find('.bys-loading').text()).toBe('Loading...');
    });
});
