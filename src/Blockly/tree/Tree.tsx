import _ from "lodash"
import { ResponsiveContainer } from "recharts"
import { Tree as NpmTree } from 'react-tree-graph'

const getChildren = (val: any, data: any) =>
    _.compact(
        _.uniq(
            _.map(data, val.value)
        ).map(
            (ele: any) => val[ele]
        )
    )

/**
 * 
 * @param data 
 * @returns 
 */
export function Tree(data: any) {
    return (
        <ResponsiveContainer width='100%' height={500}>
            <NpmTree
                height={400}
                width={400}
                data={data}
                animated={true}
                labelProp={"value"}
                keyProp={"name"}
                getChildren={getChildren}
                svgProps={{
                    className: 'custom'
                }} />
        </ResponsiveContainer>
    )
}