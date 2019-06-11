// Libs
import React, { memo } from 'react';

function Loading() {
    return <div className="bys-loading mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active"></div>;
}

Loading.propTypes = {};
Loading.defaultProps = {};

export default memo(Loading);
