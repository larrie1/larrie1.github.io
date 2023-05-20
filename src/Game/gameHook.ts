import { useState } from "react"
import { useNavigate } from 'react-router-dom'

const maxSteps = 4

/**
 *  This Method handles all the Logic from the Game Component and returns a JSON state Object.
 * 
 * @returns JSON object containing the context and the functionalities to handle the Stepper
 */
export default function useGame() {
    const [activeStep, setActiveStep] = useState(0)
    const [completed, setCompleted] = useState<{ [k: number]: boolean }>([])
    const [successAnimation, setSuccessAnimation] = useState(false)
    const nav = useNavigate()

    const handleNext = () => {
        if (activeStep == maxSteps) {
            nav('/generator')
        } else {
            setActiveStep(activeStep + 1)
        }
    }

    const handleBack = () => setActiveStep(activeStep - 1)

    const setStep = (step: number) => () => setActiveStep(step)

    const handleSuccess = () => setSuccessAnimation(!successAnimation)

    const handleComplete = () => {
        const newCompleted = completed
        newCompleted[activeStep] = true
        setCompleted(newCompleted)
        handleNext()
        setSuccessAnimation(false)
    }

    const handleReset = () => {
        localStorage.clear()
        setActiveStep(0)
        setCompleted([])
        window.location.reload()
    }

    return {
        stepperContext: {
            activeStep: activeStep,
            completed: completed,
            handleNext: handleNext,
            handleComplete: handleComplete,
            handleSuccess: handleSuccess,
        },
        successAnimation: successAnimation,
        isActiveLevelUnlocked: activeStep === 0 || completed[activeStep - 1],
        handleReset: handleReset,
        handleBack: handleBack,
        setStep: setStep,
    }
}