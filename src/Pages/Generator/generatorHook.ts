import { useState, useEffect } from "react"
import { localizedStrings } from "../../Res"

/**
 *  This Method validates the user Input from the Steps inside the Generator. It will
 *  also serve the Data to the Generator.
 *  
 *  @returns JSON Object containing the Data needed from the Generator.
 */
export function useGenerator() {
    const [target, setTarget] = useState("")
    const [features, setFeatures] = useState<string[]>(['', ''])
    const [isDone, setDone] = useState(false)
    const [isValidData, setValidData] = useState(false)
    const [trainingData, setTrainingData] = useState<any[]>([{ [localizedStrings.result]: undefined }, { [localizedStrings.result]: undefined }])

    const handleClick = () => setDone(true)

    const validateFeatures = () => {
        for (let feature of features) {
            if (!feature) return false
        }
        return true
    }

    const validateData = () => {
        for (let row of trainingData) {
            if (!row[target]) return false
            for (let feature of features) {
                if (!row[feature]) return false
            }
        }
        return true
    }

    useEffect(() => {
        setValidData(target !== '' && features.length > 1 && validateFeatures() && validateData())
    }, [target, features, trainingData, validateData(), validateFeatures()])

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
        trainingData: trainingData,
        setTrainingData: setTrainingData,
        isDone: isDone,
        validateHints: validateHints,
        isValidData: isValidData,
        handleClick: handleClick,
        step2Unlocked: target !== '',
        step3Unlocked: target !== '' && features[0] !== '',
        data: {
            features: features,
            target: target,
            data: trainingData
        }
    }
}