import {types} from "./types";

export type GetTagsAction = {
    type: types.GET_TAGS_REQUEST
}

export function getTagsRequest(): GetTagsAction {
    return {type: types.GET_TAGS_REQUEST}
}
