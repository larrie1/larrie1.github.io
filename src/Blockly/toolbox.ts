export const toolboxCategories = (leafs: any[]) => {
    var blockList = []
    for (var leaf of leafs) {
        blockList.push({
            kind: "block",
            type: "text",
        })
    }

    return {
        kind: "flyoutToolbox",
        contents: [
            {
                kind: "block",
                type: "math_number",
            },
            {
                kind: "block",
                type: "logic_boolean",
            },
            {
                kind: "block",
                type: "text",
            },
            {
                kind: "block",
                type: "node",
            },
        ],
    };
}