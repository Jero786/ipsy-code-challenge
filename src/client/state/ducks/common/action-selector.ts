// Libs
import {get} from 'lodash/object';

// Utils
import {FormatterField, formatterItem} from "../../utils/content-utils";

// Contracts
import {AlbumResponse} from "../catalog/d.contracts";

const PAGINATION_FORMATTER:FormatterField[] = [
    {name: 'limit'},
    {name: 'offset'},
    {name: 'total'},
    {name: 'href'},
    {name: 'next'},
    {name: 'previous'},
];

export const getPagination = (action:AlbumResponse, attr:string) => {
    const pagination = get(action, attr, {});
    return formatterItem(pagination, PAGINATION_FORMATTER);
};
