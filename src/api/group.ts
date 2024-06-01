import {functions} from './database';
import { httpsCallable } from "firebase/functions";

class GroupApi {

    static getGroups()  {
        const func = httpsCallable(functions, 'group-getAllGroups');
        return func();
    }

    static deleteGroup(params: DeleteGroupParams){
        const func = httpsCallable(functions, 'group-deleteGroup');
        return func(params);
    }

    static createGroup(params: CreateGroupParams) {
        const func = httpsCallable(functions, 'group-saveGroup');
        return func(params);
    }

    static updateGroup(params: UpdateGroupParams) {
        const func = httpsCallable(functions, 'group-saveGroup');
        return func(params);
    }
}

export default GroupApi;
