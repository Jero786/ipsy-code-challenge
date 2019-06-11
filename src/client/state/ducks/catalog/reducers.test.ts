// Libs
import { fromJS } from 'immutable';

// Reducer
import reducer from './reducers';

// Types
import * as Types from './types';

// Selectors
import { getTracks, isRequesting } from './state-selectors';

describe('Catalog reducer', () => {
    it('should compute request action properly', () => {
        const action = { type: Types.REQUEST_SEARCH };
        const initialState = fromJS({});

        const result = reducer(initialState, action);

        expect(isRequesting(result)).toBe(true);
    });

    it('should compute request failed action properly', () => {
        const action = { type: Types.REQUEST_SEARCH_FAILED };
        const initialState = fromJS({});

        const result = reducer(initialState, action);

        expect(isRequesting(result)).toBe(false);
    });

    it('should compute request complete action properly', () => {
        const action = {
            type: Types.REQUEST_SEARCH_COMPLETED,
            payload: {
                tracks: { items: [{ name: 'track-1' }] },
            },
        };
        const initialState = fromJS({});

        const result = reducer(initialState, action);

        expect(isRequesting(result)).toBe(false);
        expect(getTracks(result).length).toBe(1);
        expect(getTracks(result)[0].name).toBe('track-1');
    });
});
