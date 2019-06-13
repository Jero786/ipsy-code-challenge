// Libs
import { shallow } from 'enzyme';
import * as React from 'react';

// Card
import IconCard from './icon-card';

describe('IconCard', () => {
    it('should render properly with some title', () => {
        const wrapper = shallow(<IconCard title="some title" />);

        expect(wrapper.find('.bys-icon-card__title').text()).toBe('some title');
    });

    it('should render properly with some description', () => {
        const wrapper = shallow(<IconCard description="some description" />);

        expect(wrapper.find('.bys-icon-card__description').text()).toBe('some description');
    });

    it('should render properly with some image', () => {
        const wrapper = shallow(<IconCard imgSrc="/some/image.png" />);

        expect(wrapper.find('.bys-icon-card img').length).toBe(1);
    });
});
