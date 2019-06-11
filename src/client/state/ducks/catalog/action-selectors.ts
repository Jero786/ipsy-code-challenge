// Libs
import {get} from 'lodash/object';
import {map} from 'lodash/collection';

import {FormatterField, formatterItem} from "../../utils/content-utils";

// Typescript types
import {Track} from "./d.contracts";

const ALBUM_FIELDS:FormatterField[] = [
    {name: 'album_type'},
    {name: 'href'},
    {name: 'type'},
    {name: 'images'},
    {name: 'name'},
    {name: 'release_date'},
    {name: 'release_date_precision'},
    {name: 'total_tracks'},
];

const TRACK_FIELDS:FormatterField[] = [
    {name: 'album', innerFields: ALBUM_FIELDS},
    {name: 'type'},
    {name: 'href'},
    {name: 'id'},
    {name: 'name'},
    {name: 'popularity'},
    {name: 'preview_url'},
    {name: 'track_number'}
];

export const getTracks = (action):Track[] => {
    const tracks = get(action, 'payload.tracks.items', {}, []) as Track[];
    return map(tracks, track => formatterItem(track, TRACK_FIELDS));
};


