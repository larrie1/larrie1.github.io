import { useState } from "react"

export default function _gameModel() {
    const [activeStep, setActiveStep] = useState(0)
    const [completed, setCompleted] = useState<{ [k: number]: boolean }>([])
    const [successAnimation, setSuccessAnimation] = useState(false)
    const [intro, setIntro] = useState(localStorage.getItem('intro') === 'true' ? true : localStorage.getItem('intro') === null ? true : false)

    const handleNext = () => setActiveStep(activeStep + 1)

    const handleBack = () => setActiveStep(activeStep - 1)

    const setStep = (step: number) => () => setActiveStep(step)

    const handleSuccess = () => setSuccessAnimation(!successAnimation)

    const handleClose = () => setIntro(false)

    const handleNotAgain = () => localStorage.setItem('intro', 'false')

    const handleComplete = () => {
        const newCompleted = completed
        newCompleted[activeStep] = true
        setCompleted(newCompleted)
        handleNext()
        setSuccessAnimation(false)
    }

    const handleReset = () => {
        setActiveStep(0)
        setCompleted([])
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
        intro: intro,
        isActiveLevelUnlocked: activeStep === 0 || completed[activeStep - 1],
        handleReset: handleReset,
        handleBack: handleBack,
        handleNotAgain: handleNotAgain,
        setStep: setStep,
        handleClose: handleClose,
    }
}