// Resources
import './card.scss';

// Libs
import React, { memo } from 'react';

interface CardProps {
    title: string;
    description: string;
    imgSrc: string;
    link?: string;
    icon: string;
    imgCustomStyle: object;
}

function Card({ title, description, imgSrc, link, icon, imgCustomStyle }: CardProps) {
    const iconEl = icon ? <i className="material-icons">{icon}</i> : null;
    let bodyWithImageEl;

    if (imgSrc) {
        if (imgCustomStyle) {
            bodyWithImageEl = (
                <>
                    <img src={imgSrc} style={{ ...imgCustomStyle }} alt="some alt" />
                    <div className="bys-card__title mdl-card__title">
                        <h2 className="card__title mdl-card__title-text">{title}</h2>
                    </div>
                </>
            );
        } else {
            bodyWithImageEl = (
                <div className="bys-card__title mdl-card__title" style={imgSrc ? { background: `url(${imgSrc})` } : {}}>
                    <h2 className="card__title mdl-card__title-text">{title}</h2>
                </div>
            );
        }
    } else {
        bodyWithImageEl = (
            <div className="bys-card__title mdl-card__title">
                <h2 className="card__title mdl-card__title-text">{title}</h2>
            </div>
        );
    }

    return (
        <div className="bys-card">
            <div className="demo-card-wide mdl-card mdl-shadow--2dp card__image">
                {bodyWithImageEl}
                <div className="bys-card__description card__description mdl-card__supporting-text">{description}</div>
                <div className="mdl-card__menu">
                    <a
                        href={link}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"
                    >
                        {iconEl}
                    </a>
                </div>
            </div>
        </div>
    );
}

export default memo(Card);
