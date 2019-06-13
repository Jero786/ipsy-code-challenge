// Resources
import './login.scss';

// Libs
import * as React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { initDefaultPropsFromContext } from '../state/utils/context-utils';

// Component
import Layout from '../components/layout/layout';

export class LoginPage extends React.PureComponent<{}, {}> {
    static getInitialProps() {
        return initDefaultPropsFromContext();
    }

    render() {
        return (
            <Layout title="Be your self" description="Some description useful for SEO">
                <div className="bys-login">
                    <form className="bys-login__form" action="#">
                        <h1 className="bys-login__title">Login</h1>
                        <div className="bys-login__form-row bys-login__form-username mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input className="mdl-textfield__input" type="text" id="user-name-field" />
                            <label className="mdl-textfield__label" htmlFor="user-name-field">
                                Username
                            </label>
                        </div>

                        <div className="bys-login__form-row bys-login__form-password mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input className="mdl-textfield__input" type="text" id="password-field" />
                            <label className="mdl-textfield__label" htmlFor="password-field">
                                Password
                            </label>
                        </div>
                        <br></br>
                        <Link href="/api/v1/refresh-token">
                            <button
                                type="submit"
                                className="bys-login__form-submit mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                            >
                                Login
                            </button>
                        </Link>
                    </form>
                </div>
            </Layout>
        );
    }
}

export default connect()(LoginPage);
