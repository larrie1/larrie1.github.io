import { createLeaf } from "./blocks/node";

const _ = require('lodash');

export const createToolBox = (data: any, target: string) => {
    const blocks = []
    blocks.push({
        'kind': 'block',
        'type': 'node',
    })
    const leafs = _.uniq(_.flatten(_.map(data, target)).filter((leaf: any) => leaf !== undefined))
    leafs.forEach((leaf: any, index: number) => {
        createLeaf(leaf, index)
        blocks.push({
            'kind': 'block',
            'type': 'leaf' + index,
        })
    })

    return {
        kind: "flyoutToolbox",
        contents: blocks,
    }
}