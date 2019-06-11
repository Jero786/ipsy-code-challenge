import * as types from './types';

export const requestSearch = text => ({
    type: types.REQUEST_SEARCH,
    meta: {
        async: true,
        path: `/search?text="${text}"`,
        method: 'GET',
    },
});

export const requestSearchCompleted = () => ({ type: types.REQUEST_SEARCH_COMPLETED });
export const requestSearchFailed = () => ({ type: types.REQUEST_SEARCH_FAILED });
