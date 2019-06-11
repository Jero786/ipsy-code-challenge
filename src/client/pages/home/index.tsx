// Resources
import './home-page.scss';

// Libs
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get } from 'lodash/object';
import { initDefaultPropsFromContext } from '../../state/utils/context-utils';

// Component
import Layout from '../../../client/components/layout/layout';
import Card from '../../components/card/card';
import Loading from '../../components/loading/loading';

// Actions
import { catalogOperation, stateSelectors } from '../../state/ducks/catalog';

interface Props {
    requestSearch: (string) => void;
    isRequesting: boolean;
    tracks: [];
}

interface State {
    valueSearch: string;
}

class HomePage extends React.PureComponent<Props, State> {
    state = {
        valueSearch: '',
    };

    static getInitialProps() {
        return initDefaultPropsFromContext();
    }

    ['handleOnSearch'] = evt => {
        evt.preventDefault();
        const { valueSearch } = this.state;
        const { requestSearch } = this.props;

        requestSearch(valueSearch);
    };

    render() {
        const { valueSearch } = this.state;
        const { isRequesting, tracks } = this.props;

        let catalogsEl;
        let loadingEl;
        let emptyMessageEl;

        if (isRequesting) {
            loadingEl = <Loading />;
        }

        if (!isRequesting && tracks) {
            catalogsEl = tracks.map(track => {
                return (
                    <Card
                        key={`track-id-${get(track, 'id')}`}
                        description={get(track, 'name', '')}
                        title={get(track, 'name', '')}
                        imgSrc={get(track, 'album.images.0.url')}
                        link={get(track, 'preview_url')}
                    />
                );
            });
        }

        if (!isRequesting && (!tracks || tracks.length === 0)) {
            emptyMessageEl = <h2>Search your music now!</h2>;
        }

        return (
            <Layout title="Be your self" description="Some description useful for SEO">
                <div className="bys-home-page">
                    <div className="bys-home-page__header">
                        <form action="" onSubmit={this.handleOnSearch}>
                            <div className="bys-home-page__header-search mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                <label
                                    htmlFor="input-2"
                                    className="bys-home-page__header-search-label mdl-textfield__label"
                                >
                                    Search
                                </label>

                                <input
                                    className="mdl-textfield__input"
                                    defaultValue={valueSearch}
                                    id="input-2"
                                    type="text"
                                    onChange={evt => this.setState({ valueSearch: evt.target.value })}
                                />

                                <i
                                    role="button"
                                    onClick={this.handleOnSearch}
                                    tabIndex={0}
                                    onKeyPress={() => {}}
                                    className="bys-home-page__header-search-icon material-icons"
                                >
                                    search
                                </i>
                            </div>
                        </form>
                    </div>
                    <div className="bys-home-page__body">
                        <div className={`bys-home-page__body-catalogs ${isRequesting ? ' is-loading' : ''}`}>
                            {catalogsEl}
                            {loadingEl}
                            {emptyMessageEl}
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        requestSearch: bindActionCreators(catalogOperation.requestSearch, dispatch),
    };
};

const mapStateToProps = state => {
    const catalog = state.get('catalog');
    return {
        isRequesting: stateSelectors.isRequesting(catalog),
        tracks: stateSelectors.getTracks(catalog),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(HomePage);
