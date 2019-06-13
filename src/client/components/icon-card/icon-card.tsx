// Resources
import './icon-card.scss';

// Libs
import React, { memo } from 'react';

interface Props {
    title: string;
    imgSrc: string;
    description: string;
    link: string;
}

function IconCard({ title, imgSrc, description, link }: Props) {
    if (link) {
        return (
            <div className="bys-icon-card">
                <a href={link}>
                    <div className="bys-icon-card__title">{title}</div>
                    <img className="bys-icon-card__image" src={imgSrc} alt="card option" />
                    <p className="bys-icon-card__description">{description}</p>
                </a>
            </div>
        );
    }
    return (
        <div className="bys-icon-card">
            <div className="bys-icon-card__title">{title}</div>
            <img className="bys-icon-card__image" src={imgSrc} alt="card option" />
            <p className="bys-icon-card__description">{description}</p>
        </div>
    );
}

export default memo(IconCard);
