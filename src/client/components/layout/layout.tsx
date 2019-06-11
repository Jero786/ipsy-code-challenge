// Resources
import '../../style/commons.scss';
import '../../style/reset.scss';
import './layout.scss';

// Libs
import Head from 'next/head';
import * as React from 'react';

interface Props {
    title: string;
    description: string;
}

class Layout extends React.PureComponent<Props, {}> {
    render() {
        const { title, children, description } = this.props;
        const someDescription = description || title;
        return (
            <div className="bys-layout">
                <Head>
                    <title>{title}</title>
                    <meta charSet="utf-8" />
                    <meta name="Description" content={someDescription} />
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                    <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-blue.min.css" />
                </Head>
                {children}
                <script defer src="https://code.getmdl.io/1.3.0/material.min.js"></script>
            </div>
        );
    }
}

export default Layout;
