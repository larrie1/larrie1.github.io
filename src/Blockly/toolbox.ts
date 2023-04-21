import { createLeaf } from "./blocks/node";

const _ = require('lodash');

/**
 * This Method creates a ToolBox based on the Input it gets, to be able to create dynamic ToolBoxes
 * 
 * @param data      Table that holds all the data of the Level
 * @param target    Decision which should be targeted, needed to filter and assign the possible Decisions
 * @returns         JSON containing the type of ToolBox and the containing Blocks
 */
export const createToolBox = (data: any[], target: string) => {
    const blocks = []
    const leafs = _.uniq(_.flatten(_.map(data, target)).filter((leaf: any) => leaf !== undefined))

    blocks.push({
        'kind': 'block',
        'type': 'node',
    })

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
