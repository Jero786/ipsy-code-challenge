// Libs
import { shallow } from 'enzyme';
import * as React from 'react';

// Component
import { LoginPage } from '../index';

describe('Login Page', () => {
    it('should show the title properly', () => {
        const wrapper = shallow(<LoginPage />);

        expect(wrapper.find('.bys-login__title').text()).toBe('Login');
    });

    it('should show the username label', () => {
        const wrapper = shallow(<LoginPage />);

        expect(wrapper.find('.bys-login__form-username label').text()).toBe('Username');
    });

    it('should show the password label', () => {
        const wrapper = shallow(<LoginPage />);

        expect(wrapper.find('.bys-login__form-password label').text()).toBe('Password');
    });

    it('should show the button login', () => {
        const wrapper = shallow(<LoginPage />);

        expect(wrapper.find('.bys-login__form-submit').text()).toBe('Login');
    });
});
