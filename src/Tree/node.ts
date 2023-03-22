export class Node {
    constructor(
       public data: any = "empty",
       public top: Node | null = null,
       public bottom: Node | null = null,
       public parent: Node | null = null,
    ) {}

    toJSON = () => {
        let whitespaces = this.getWhitespaces()
        if (this.isLeaf()) {
            return '{\n' + whitespaces + 'data: ' + this.data + '\n},'
        } else if (this.top === null) {
            return '{\n    data: ' + this.data + '\n     bottom: ' + this.bottom + '\n},'
        } else if (this.bottom === null) {
            return '{\n    top: ' + this.top + '\n    data: ' + this.data + '\n},'
        }
        else {
            return '{\n    top: ' + this.top + '\n    data: ' + this.data + '\n    bottom: ' + this.bottom + '\n},'
        }
    }

    isLeaf = () => this.top === null && this.bottom === null

    getWhitespaces = () => "    ".repeat(1);

    setParent = (parent: Node) => this.parent = parent
}