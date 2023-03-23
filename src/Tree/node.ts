export class Node {
    constructor(
       public data: any = "empty",
       public top: Node | null = null,
       public bottom: Node | null = null,
       public parent: Node | null = null,
    ) {}

    toJSON = (): string => {
        if (this.top !== null && this.bottom !== null) {
            return '{\n    top: ' + this.top + '\n    data: ' + this.data + ',\n    bottom: ' + this.bottom + '\n},'
        } else if (this.top === null && this.bottom !== null) {
            return '{\n    data: ' + this.data + ',\n    bottom: ' + this.bottom + '\n},'
        } else if (this.bottom === null && this.top !== null) {
            return '{\n    top: ' + this.top + '\n    data: ' + this.data + ',\n},'
        }
        else {
            return this.data + ","
        }
    }

    isLeaf = () => this.top === null && this.bottom === null

    setParent = (parent: Node) => this.parent = parent
}