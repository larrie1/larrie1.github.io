import { useState, useEffect } from "react"
import { localizedStrings } from "../Res/localization"
import { createTable } from "../Utils/Table"

/**
 *  This Method validates the user Input from the Steps inside the Generator. It will
 *  also serve the Data to the Generator.
 *  
 *  @returns JSON Object containing the Data needed from the Generator.
 */
export function useGenerator() {
    const [target, setTarget] = useState("")
    const [features, setFeatures] = useState<string[]>(['', ''])
    const [data, setData] = useState<any[]>([{ [localizedStrings.result]: undefined }, { [localizedStrings.result]: undefined }])
    const [isDone, setDone] = useState(false)
    const [isValidData, setValidData] = useState(false)

    const handleClick = () => setDone(true)

    const setTable = (newData: any) => setData(newData)

    const validateFeatures = () => {
        for (let feature of features) {
            if (!feature) return false
        }
        return true
    }

    const validateData = () => {
        for (let row of data) {
            if (!row[target]) return false
            for (let feature of features) {
                if (!row[feature]) return false
            }
        }
        return true
    }

    const table = createTable(
        data,
        target,
        features,
        setTable,
    )

    useEffect(() => {
        setValidData(target !== '' && features.length > 1 && validateFeatures() && validateData())
    }, [target, features, data])

    let validateHints = [
        [!validateFeatures(), localizedStrings.valid_features],
        [!(features.length > 1), localizedStrings.enough_features],
        [!validateData(), localizedStrings.missing_data]
    ]

    return {
        target: target,
        setTarget: setTarget,
        features: features,
        setFeatures: setFeatures,
        data: data,
        setData: setData,
        isDone: isDone,
        table: table,
        validateHints: validateHints,
        isValidData: isValidData,
        handleClick: handleClick,
        step2Unlocked: target !== '',
        step3Unlocked: target !== '' && features[0] !== '',
    }
}