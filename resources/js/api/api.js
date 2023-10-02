import { ApiBase } from "./apiBase";
import { CommentGroup } from "./methodGroups/commentGroup";

class Api extends ApiBase {}

function applyMixins(derivedCtor, baseCtors) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
                if (name !== 'constructor') {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            }
        });
    }); 
}

applyMixins(Api, [CommentGroup]);

export { Api };