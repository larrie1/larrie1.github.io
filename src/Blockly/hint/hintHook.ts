import _ from "lodash"
import { useState, useEffect } from "react"
import { NODE_TYPES, gain } from "../ID3/decision-tree"

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
    }, [selectedFeature, selectedFeatureVal])

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
                data: data.filter((dataRow: any) => dataRow[json.value].toString() === selectedFeatureVal),
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
