// Libs
import { shallow } from 'enzyme';
import * as React from 'react';

// Card
import Card from './card';

describe('Card', () => {
    it('should render properly', () => {
        const wrapper = shallow(<Card title="Card title" description="Some description" imgSrc="" />);

        expect(wrapper.find('.bys-card__title').text()).toBe('Card title');
        expect(wrapper.find('.bys-card__description').text()).toBe('Some description');
    });
});
