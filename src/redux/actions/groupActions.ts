import {types} from "./types";

export type GetGroupsAction = {
    type: types.GET_GROUPS_REQUEST
}

export type CreateGroupAction = {
    type: types.CREATE_GROUP_REQUEST
    params: CreateGroupParams
}

export type UpdateGroupAction = {
    type: types.UPDATE_GROUP_REQUEST
    params: UpdateGroupParams
}

export type DeleteGroupAction = {
    type: types.DELETE_GROUP_REQUEST
    params: DeleteGroupParams
}

export function getGroupsRequest(): GetGroupsAction {
    return {type: types.GET_GROUPS_REQUEST}
}

export function createGroupRequest(params: CreateGroupParams): CreateGroupAction {
    return {type: types.CREATE_GROUP_REQUEST, params}
}

export function updateGroupRequest(params: UpdateGroupParams): UpdateGroupAction {
    return {type: types.UPDATE_GROUP_REQUEST, params}
}

export function deleteGroupRequest(params: DeleteGroupParams): DeleteGroupAction {
    return {type: types.DELETE_GROUP_REQUEST, params}
}


