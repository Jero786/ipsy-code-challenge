// Resources
import './welcome-page.scss';

// Libs
import * as React from 'react';
import { connect } from 'react-redux';
import { initDefaultPropsFromContext } from '../../state/utils/context-utils';

// Component
import Layout from '../../components/layout/layout';
import IconCard from '../../components/icon-card/icon-card';

const OPTION_CARD_MODEL = [
    {
        id: 1,
        title: 'My Music',
        imgSrc: 'https://ik.imagekit.io/cdnstorage786/music-white_48dp_MgczToEGF.png',
        description: 'Search your music by Spotify',
        link: '/music',
    },
    {
        id: 2,
        title: 'My Books',
        imgSrc: 'https://ik.imagekit.io/cdnstorage786/baseline_library_books_white_48dp_27ku5NNu3.png',
        description: 'Read your favorite books',
        isDisable: true,
    },
    {
        id: 3,
        title: 'My Movies',
        imgSrc: 'https://ik.imagekit.io/cdnstorage786/baseline_movie_filter_white_48dp_-Z6QPSaWw.png',
        description: 'Watch your favorite video and series',
        isDisable: true,
    },
];

export class WelcomePage extends React.PureComponent<{}, {}> {
    static getInitialProps() {
        return initDefaultPropsFromContext();
    }

    render() {
        const cardsEl = OPTION_CARD_MODEL.map(cardModel => {
            return (
                <IconCard
                    key={`id-image-${cardModel.id}`}
                    title={cardModel.title}
                    description={cardModel.description}
                    imgSrc={cardModel.imgSrc}
                    link={cardModel.link}
                />
            );
        });

        return (
            <Layout title="Be your self" description="Some description useful for SEO">
                <div className="bys-welcome-page">
                    <div className="bys-welcome-page__box">
                        <h1 className="bys-welcome-page__box-title">Be Your Self</h1>
                        <div className="bys-welcome-page__cards">{cardsEl}</div>
                    </div>
                    <p className="bys-welcome-page__description">
                        Have you ever imagine a single platform which contain all you needed?
                    </p>
                    <p className="bys-welcome-page__description bys-welcome-page__description--long">
                        Be Your Self is a SaaS platform that give you in seconds, your favorite content! such as your
                        favorite Musica, your favorite Books, your favorites Movies!
                    </p>
                    <p className="bys-welcome-page__description bys-welcome-page__description--long">
                        The more we know about you.. better will be the content that will give you!
                    </p>
                </div>
            </Layout>
        );
    }
}

export default connect()(WelcomePage);
