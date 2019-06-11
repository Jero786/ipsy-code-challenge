// Resources
import './card.scss';

// Libs
import React, { memo } from 'react';

interface CardProps {
    title: string;
    description: string;
    imgSrc: string;
    link?: string;
}

function Card({ title, description, imgSrc, link }: CardProps) {
    return (
        <div className="bys-card">
            <div className="demo-card-wide mdl-card mdl-shadow--2dp card__image">
                <div style={imgSrc ? { background: `url(${imgSrc})` } : {}} className="bys-card__title mdl-card__title">
                    <h2 className="card__title mdl-card__title-text">{title}</h2>
                </div>
                <div className="bys-card__description card__description mdl-card__supporting-text">{description}</div>
                <div className="mdl-card__menu">
                    <a
                        href={link}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"
                    >
                        <i className="material-icons">volume_up</i>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default memo(Card);
