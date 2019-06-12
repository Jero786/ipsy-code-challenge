// Resources
import './welcome-page.scss';

// Libs
import * as React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { initDefaultPropsFromContext } from '../state/utils/context-utils';

// Component
import Layout from '../components/layout/layout';

interface Props {
    requestLogin: () => void;
}

class WelcomePage extends React.PureComponent<Props, {}> {
    static getInitialProps() {
        return initDefaultPropsFromContext();
    }

    render() {
        return (
            <Layout title="Be your self" description="Some description useful for SEO">
                <div className="bys-welcome-page">
                    <div className="bys-welcome-page__box">
                        <h1 className="bys-welcome-page__box-title">Be Your Self</h1>
                        <Link href="/api/v1/refresh-token">
                            <button
                                type="button"
                                className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                            >
                                WELCOME
                            </button>
                        </Link>
                    </div>
                </div>
            </Layout>
        );
    }
}

export default connect()(WelcomePage);
