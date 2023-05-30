import './Tree.css'
import { entropy, NODE_TYPES } from "../ID3/decision-tree"
import { Card, Box, Link, Typography } from "@mui/material";
import { localizedStrings } from '../../Res';
import { scaleInVerCenter } from '../../Utils/animations';

const _ = require('lodash');

/**
 *  This Method creates a Container with a Tree Graph inside. The Tree styling
 *  was inspired by https://thecodeplayer.com/walkthrough/css3-family-tree
 * 
 *  @param data  Json Object with the block Information
 *  @returns     UI representation of a Tree Graph
 */
export function Tree(
    props: {
        data: any,
        blockJson: any,
        target: string,
    }) {
    /**
     * 
     * @param children 
     * @returns 
     */
    function listItems(children: any, data: any) {
        let setSize = _.size(props.data);
        let entpy = (data.length / setSize) * entropy(_.map(data, props.target))

        if (children && children.value) {
            if (children.type === NODE_TYPES.DECISION) {
                let possibleValues = _.uniq(_.map(props.data, children.value))
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
                                {localizedStrings.entropy + entpy}
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
                                                        {listItems(children[featureVal], subset)}
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
                                {localizedStrings.entropy + entpy}
                            </Typography>
                        </Link>
                    </li>
                )
            }
        }
    }

    return (
        <Card
            sx={{
                animation: `${scaleInVerCenter} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
                flex: 1,
                display: 'flex',
                p: 3,
                justifyContent: 'center',
            }}
        >
            <Box className={'tree'} sx={{ maxHeight: '50vh', overflow: 'auto' }}>
                <ul>
                    {listItems(props.blockJson, props.data)}
                </ul>
            </Box>
        </Card>
    )
}