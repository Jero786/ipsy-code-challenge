
import {CommonContracts} from '../common';

export interface AlbumImage {
    height:number,
    url:string,
    width:number
}

export interface Album {
    album_type:string,
    artists:[],
    href:string,
    images:AlbumImage[],
    name:string,
    release_date:string,
    release_date_precision:string,
    total_tracks:number
}

export interface Track {
    album:Album,
    type:string,
    href:string,
    id:string,
    name:string,
    popularity:number,
    preview_url:string,
    track_number:number
}

export interface AlbumResponse extends CommonContracts.Pagination {
    items:Track[]
}
