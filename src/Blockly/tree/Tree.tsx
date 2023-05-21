import { ResponsiveContainer } from "recharts"
import { Tree as NpmTree } from 'react-tree-graph'

const _ = require('lodash');

/**
 *  This Method creates a Container with a Tree Graph inside. The Tree
 *  comes from a Module.
 * 
 *  @param data  Json Object with the block Information
 *  @returns     UI representation of a Tree Graph
 */
export function Tree(
    props: {
        data: any,
        blockJson: any,
    }) {

    /**
    * 
    *   @param val 
    *   @param data 
    *   @returns 
    */
    const getChildren = (val: any) => _.compact(
            _.uniq(
                _.map(props.data, val.value)
            ).map(
                (ele: any) => {
                    let obj = val[ele]
                    if (obj) {
                        obj["id"] = Math.random()
                    }
                    return obj
                }
            )
        )
    
    let json = props.blockJson
    json["id"] = Math.random()

    return (
        <ResponsiveContainer
            width='100%'
            height={500}
        >
            <NpmTree
                key={"tree"}
                height={500}
                width={1000}
                data={json}
                animated={true}
                labelProp={"value"}
                keyProp={"id"}
                getChildren={getChildren}
                svgProps={{
                    className: 'custom'
                }} />
        </ResponsiveContainer>
    )
}