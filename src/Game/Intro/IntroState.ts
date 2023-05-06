import { useState } from "react"

export function useIntro(
    stepsLength: number,
) {
    const [checked, setCheck] = useState(false)
    const [step, setStep] = useState(0)
    const [open, setOpen] = useState(
        localStorage.getItem('intro') === 'true' ?
            true :
            localStorage.getItem('intro') === null ?
                true :
                false
    )

    const handleClose = () => setOpen(false)

    const handleNext = () => setStep(step + 1)

    const handlePrevious = () => setStep(step - 1)

    const isLastStep = () => step == stepsLength - 1

    const isFirstStep = () => step == 0

    const moreThanOneStep = () => stepsLength > 1

    const handleNotAgain = () => {
        setCheck(!checked)
        localStorage.setItem('intro', 'false')
    }

    return {
        checked: checked,
        step: step,
        stepsLength: stepsLength,
        open: open,
        handleNotAgain: handleNotAgain,
        isFirstStep: isFirstStep,
        moreThanOneStep: moreThanOneStep,
        isLastStep: isLastStep,
        handleNext: handleNext,
        handlePrevious: handlePrevious,
        handleClose: handleClose,
    }
}