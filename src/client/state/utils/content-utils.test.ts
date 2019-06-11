/* eslint-env jest */

import { formatterItem, FormatterField } from './content-utils';

const ALBUM_FIELDS: FormatterField[] = [
    { name: 'albumType' },
    { name: 'href' },
    { name: 'type' },
    { name: 'images' },
    { name: 'name' },
    { name: 'releaseDate' },
    { name: 'releaseDatePrecision' },
    { name: 'total_tracks' },
];
const TRACK_FIELDS: FormatterField[] = [
    { name: 'album', innerFields: ALBUM_FIELDS },
    { name: 'type' },
    { name: 'href' },
    { name: 'id' },
    { name: 'name' },
    { name: 'popularity' },
    { name: 'previewUrl' },
    { name: 'trackNumber' },
];

describe('Utils', () => {
    it('should return a new object with specific fields defined', () => {
        const item = { type: 'track', name: 'brisa', propertyNonExist: 'I do not exist' };

        const result = formatterItem(item, ALBUM_FIELDS);

        expect(JSON.stringify(result)).toEqual('{"type":"track","name":"brisa"}');
    });

    it('should return a new object formatter properly with inner field', () => {
        const item = { type: 'track', name: 'brisa', propertyNonExist: 'I do not exist' };

        const result = formatterItem(item, ALBUM_FIELDS);

        expect(JSON.stringify(result)).toEqual('{"type":"track","name":"brisa"}');
    });

    it('should filter properly a list with nested fields', () => {
        const track = {
            name: 'emi',
            nonExistAttr: 'non exist',
            album: {
                name: 'los beatles',
                albumType: 'the best of the best',
                nonExistAttr: 'non exist',
            },
        };

        const result = formatterItem(track, TRACK_FIELDS);

        expect(JSON.stringify(result)).toEqual(
            JSON.stringify({
                album: {
                    albumType: 'the best of the best',
                    name: 'los beatles',
                },
                name: 'emi',
            }),
        );
    });
});
