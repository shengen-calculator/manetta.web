import {httpsCallable} from "firebase/functions";
import {functions} from "./database";

class TagApi {

    static getTags()  {
        const func = httpsCallable(functions, 'tag-getAllTags');
        return func();
    }
}

export default TagApi;
