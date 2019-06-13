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

    it('should render properly with some image', () => {
        const wrapper = shallow(<Card title="Card title" description="Some description" imgSrc="/some/image.png" />);
        expect(wrapper.find('.bys-card__description').text()).toBe('Some description');
    });

    it('should render properly with some image and custom style', () => {
        const wrapper = shallow(
            <Card
                title="Card title"
                imgCustomStyle={{ border: 'solid 1px black' }}
                description="Some description"
                imgSrc="/some/image.png"
            />,
        );
        expect(wrapper.find('img').length).toBe(1);
    });
});
