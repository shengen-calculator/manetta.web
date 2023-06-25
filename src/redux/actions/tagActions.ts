import {types} from "./types";

export type GetTagsAction = {
    type: types.GET_TAGS_REQUEST
}

export type CreateTagAction = {
    type: types.CREATE_TAG_REQUEST
    params: string
}

export type DeleteTagAction = {
    type: types.DELETE_TAG_REQUEST
    params: string
}

export function getTagsRequest(): GetTagsAction {
    return {type: types.GET_TAGS_REQUEST}
}

export function createTagRequest(params: string): CreateTagAction {
    return {type: types.CREATE_TAG_REQUEST, params}
}

export function deleteTagRequest(params: string): DeleteTagAction {
    return {type: types.DELETE_TAG_REQUEST, params}
}
