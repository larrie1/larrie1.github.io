import _ from "lodash"
import { useState, useEffect } from "react"
import { NODE_TYPES, gain } from "../ID3/decision-tree"

/**
 * This Method creates a custom Hook for the Hint. It will serve all the needed Information for the 
 * Hint to display it. The Information Gain for the remaining features will be calculated.
 * 
 *  @param data: Table which holds the Records
 *  @param target: The Decision to make
 *  @param features: Features that influence the decision
 *  @param blockJson: JSON object holding the actual programm progress
 * @returns JSON state object with the information
 */
export function useHint(
    data: any,
    features: string[],
    target: string,
    blockJson: any
) {
    const [selectedFeature, setFeature] = useState("")
    const [selectedFeatureVal, setFeatureVal] = useState("")
    const [gains, setGains] = useState<any[]>([])

    const selectFeature = (feature: string) => () => {
        setFeatureVal("")
        setFeature(feature ? feature.toString() : "")
    }
    const unSelectFeature = () => {
        setFeature("")
        setFeatureVal("")
    }

    const selectFeatureVal = (featureVal: string) => () => setFeatureVal(featureVal ? featureVal.toString() : "")
    const unSelectFeatureVal = () => setFeatureVal("")

    const [possibleValues, setPossibleValues] = useState<string[]>([])

    useEffect(() => {
        if (selectedFeature === "") setPossibleValues([])
        else setPossibleValues(_.uniq(_.map(data, selectedFeature)))

        if (selectedFeature && selectedFeatureVal) {
            setGains(calcGains(
                blockJson,
                features,
                data,
                target,
                selectedFeature, 
                selectedFeatureVal
            ))
        }
    }, [selectedFeature, selectedFeatureVal, blockJson, data, features, target])

    useEffect(() => {
        setFeature("")
        setFeatureVal("")
    }, [features])

    return {
        selectedFeature: selectedFeature,
        selectedFeatureVal: selectedFeatureVal,
        selectFeature: selectFeature,
        selectFeatureVal: selectFeatureVal,
        unSelectFeature: unSelectFeature,
        unSelectFeatureVal: unSelectFeatureVal,
        possibleValues: possibleValues,
        gains: gains
    }
}

/**
 * This Method calculates the remainingdata in relation to the complete programm and the selected Feature 
 * and Feature Value.
 * 
 * @param json JSON object containing the whole Tree of the user
 * @param features All possible Features
 * @param data The Data of this level
 * @param selectedFeature The Feature selected by the user
 * @param selectedFeatureVal The Value of the Feature that got selected
 * @returns Remaining Data after the selected Feature with all the taken features earlier
 */
function calcData(
    json: any,
    features: string[],
    data: any,
    selectedFeature: string,
    selectedFeatureVal: string,
) {
    if (json && json.type === NODE_TYPES.DECISION && json.value) {
        let remainingFeatures = _.without(features, json.value)
        let vals = _.uniq(_.map(data, json.value))
        if (json.value === selectedFeature) {
            return {
                data: data.filter((dataRow: any) => (dataRow[json.value] !== undefined && dataRow[json.value] !== null ? dataRow[json.value].toString() : "") === selectedFeatureVal),
                features: remainingFeatures
            }
        } else {
            vals.forEach(
                (val: any) => {
                    calcData(
                        json[val],
                        remainingFeatures,
                        data.filter((dataRow: any) => dataRow[json.value] === val),
                        selectedFeature,
                        selectedFeatureVal
                    )
                }
            )
        }
    }
}

/**
 * This Method calculates the Information Gain for the remaining Features after the selected Feature
 * and after the previous Features where made.
 * 
 * @param json JSON object containing the whole Tree of the user
 * @param features All possible Features
 * @param data The Data of this level
 * @param target The Decision to make
 * @param selectedFeature The Feature selected by the user
 * @param selectedFeatureVal The Value of the Feature that got selected
 * @returns Information Gain for the remaining Features
 */
function calcGains(
    blockJson: any,
    features: string[],
    data: any,
    target: string,
    selectedFeature: string,
    selectedFeatureVal: string,
) {
    let remainingData = calcData(
        blockJson,
        features,
        data,
        selectedFeature,
        selectedFeatureVal
    )
    let gains: { name: string; gain: number }[] = []

    remainingData?.features.forEach(
        (feature: string) => {
            gains.push({
                name: feature,
                gain: gain(remainingData?.data, target, feature)
            })
        }
    )

    return gains
}
