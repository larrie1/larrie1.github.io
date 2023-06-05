import _ from "lodash";
import { createTree, entropy, gain } from "../ID3/decision-tree";

/**
 * 
 * @param props 
 * @returns 
 */
export function useAnalyse(
    props: {
        data: any,
        target: string,
        features: string[],
        blockJson: any,
    }
) {
    var dt = createTree(props.data, props.target, props.features);
    let gains = concatGains(
        setBlockGain(props.data, props.features, props.blockJson, props.target)
            .map(
                (ele: any) => {
                    return {
                        name: ele.name,
                        actual_gain: ele.gain,
                        actual_entropy: ele.entropy
                    }
                }
            ),
        setBlockGain(props.data, props.features, dt, props.target).map(
            (ele: any) => {
                return {
                    name: ele.name,
                    expected_gain: ele.gain,
                    expected_entropy: ele.entropy
                }
            }
        )
    )
    let blockSplits = getSplits(props.blockJson)
    let id3Splits = getSplits(dt)
    let splits = [{
        name: props.target,
        actual_splits: blockSplits,
        expected_splits: id3Splits
    }]

    return {
        gains: gains,
        splits: splits
    }
}

/**
 * 
 * @param tree 
 * @returns 
 */
const getSplits = (tree: any) => _.partition(tree, ['type', 'decision'])[0].length + 1

/**
 * 
 * @param data 
 * @param features 
 * @param json 
 * @param target 
 * @returns 
 */
function setBlockGain(data: any, features: string[], json: any, target: string) {
    if (json.type === 'decision') {
        let gains = []
        let feature = json.value
        let featureGain = gain(data, target, feature)
        let remainingFeatures = _.without(features, feature)
        let possibleValues = _.uniq(_.map(data, feature))
        let setSize = _.size(data);
        let entpy = (data.length / setSize) * entropy(_.map(data, target))

        gains.push({
            name: feature,
            gain: featureGain,
            entropy: entpy
        })

        _.forEach(possibleValues, (featureVal: any) => {
            const featureValDataSample = data.filter((dataRow: any) => dataRow[feature] === featureVal)

            if (json[featureVal].type === 'decision') {
                gains.push(setBlockGain(featureValDataSample, remainingFeatures, json[featureVal], target))
            }
        })

        return _.flatMapDeep(gains)
    } else {
        return []
    }
}

/**
 * 
 * @param arr1 
 * @param arr2 
 * @returns 
 */
function concatGains(arr1: any[], arr2: any[]) {
    let result: any[] = []
    arr1.forEach(element => {
        let obj = _.find(arr2, { name: element.name })
        result.push({
            name: element.name,
            actual_gain: element.actual_gain,
            expected_gain: obj ? obj.expected_gain : 0,
            actual_entropy: element.actual_entropy,
            expected_entropy: obj ? obj.expected_entropy : 0
        })
    }
    )
    return result
}