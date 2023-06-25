import {httpsCallable} from "firebase/functions";
import {functions} from "./database";

class TagApi {

    static getTags()  {
        const func = httpsCallable(functions, 'tag-getAllTags');
        return func();
    }

    static deleteTag(params: string){
        const func = httpsCallable(functions, 'tag-deleteTag');
        return func(params);
    }

    static createTag(params: string) {
        const func = httpsCallable(functions, 'tag-createTag');
        return func(params);
    }
}

export default TagApi;
