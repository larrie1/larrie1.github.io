import './Tree.css'
import _ from 'lodash'
import { entropy, log2, NODE_TYPES } from "../ID3/decision-tree"
import { Card, Box, Link, Typography } from "@mui/material"
import { localizedStrings } from '../../Res'
import { scaleInVerCenter } from '../../Utils/animations'

/**
 *  This Method creates a Container with a Tree Graph inside. The Tree styling
 *  was inspired by https://thecodeplayer.com/walkthrough/css3-family-tree. The Tree itself
 *  is build by <ul>, <li> and <Link>.
 * 
 *  @param data         Json Object with the block Information
 *  @param blockJson    JSON object holding the builded tree by the user
 *  @param target       Target string, the question to decide
 *  @param features     Number of Features
 *  @returns            UI representation of a Tree Graph including the Box around it
 */
export function Tree(
    props: {
        data: any,
        blockJson: any,
        target: string,
        features: number,
    }) {
    return (
        <Card
            sx={{
                animation: `${scaleInVerCenter} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
                p: 3,
                display: 'flex',
                justifyContent: 'center',
                textAlign: 'center',
                height: '100%',
                width: '100%',
                maxHeight: '50vh',
                overflow: 'auto',
            }}
        >
            <Box className={'tree'} sx={{overflow: 'auto'}}>
                <Typography variant='h5' color='primary.main'>{props.target}</Typography>
                <ul style={{
                    whiteSpace: 'nowrap',
                    overflow: 'auto'
                }}>
                    {listItems(props.blockJson, props.data, props.target, props.features)}
                </ul>
            </Box>
        </Card>
    )
}

/**
 * This Method creates the Tree by recursively walking over it and collecting the information
 * to map it to the tree structure. 
 * 
 * @param children  JSON object holding the builded tree by the user
 * @param data      Data which is getting filtered
 * @param target    Target string, the question to decide
 * @param features  Number of Features
 * @returns         UI representation of the Tree graph
 */
function listItems(children: any, data: any, target: string, features: number) {
    let setSize = _.size(data)
    let entpy = (data.length / setSize) * entropy(_.map(data, target)) / log2(features)

    if (children && children.value) {
        if (children.type === NODE_TYPES.DECISION) {
            let possibleValues = _.uniq(_.map(data, children.value))
            let hasChildren: Boolean = _.includes(_.map(possibleValues, (val: any) => children[val] !== undefined), true)
            return (
                <li>
                    <Link>
                        {children.value}
                        <br />
                        <Typography
                            variant='body2'
                            sx={{
                                color: 'secondary.dark',
                                textAlign: 'start',
                            }}>
                            {localizedStrings.entropy + ': ' + entpy}
                        </Typography>
                    </Link>
                    {
                        hasChildren &&
                        <ul>
                            {
                                _.map(
                                    _.filter(
                                        possibleValues,
                                        function (val: any) {
                                            return children[val]
                                        }
                                    ),
                                    function (featureVal: any) {
                                        let subset = data.filter(function (x: any) {
                                            return x[children.value] === featureVal
                                        });

                                        return (
                                            <li key={Math.random()}>
                                                <Link className='featureVal'>
                                                    {featureVal.toString()}
                                                </Link>
                                                <ul>
                                                    {listItems(children[featureVal], subset, target, features)}
                                                </ul>
                                            </li>
                                        )
                                    }
                                )
                            }
                        </ul>
                    }
                </li>
            )
        } else {
            return (
                <li>
                    <Link className='leaf'>
                        {children.value}
                        <br />
                        <Typography
                            variant='body2'
                            sx={{
                                color: 'secondary.dark',
                                textAlign: 'start',
                            }}>
                            {localizedStrings.entropy + ': ' + entpy}
                        </Typography>
                    </Link>
                </li>
            )
        }
    }
}
