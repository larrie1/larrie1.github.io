import {Node} from "./node";

export class Tree {
    constructor(
        private _root: Node,
    ) {}

    get root() {
        return this._root
    }

    toJSON = () => this._root.toJSON()
}