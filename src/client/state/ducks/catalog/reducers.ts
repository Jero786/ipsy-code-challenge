// Libs
import {combineReducers} from 'redux-immutable';
import {fromJS} from 'immutable';
import * as types from './types';
import {createReducer} from '../../utils';
import {getTracks} from './action-selectors';
import {CommonActionSelectors} from '../common';

const initialState = fromJS({
    isRequesting: false,
});

const catalogSearchResult = createReducer(initialState)({
    [types.REQUEST_SEARCH]: state => state.merge({isRequesting: true}),
    [types.REQUEST_SEARCH_COMPLETED]: onSearchCompleted,
    [types.REQUEST_SEARCH_FAILED]: state => state.merge({isRequesting: false}),
});

function onSearchCompleted(state, action) {
    const tracks = getTracks(action);
    const tracksPagination = CommonActionSelectors.getPagination(action, 'payload.tracks');

    return state.merge({
        isRequesting: false,
        tracks,
        tracksPagination
    });
}

export default combineReducers({
   catalogSearchResult
});
