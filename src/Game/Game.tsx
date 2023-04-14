import { Typography, Box, Stepper, Step, StepButton, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles'
import LockIcon from '@mui/icons-material/Lock';
import Lottie from "lottie-react";
import success from '../Assets/lottie_success.json'
import { useState } from 'react';

import { Level1, Level2, Level3 } from './Levels';
import { StepperContext } from '../context';
import { strings } from '../Res/localization';

const steps = ['Level 1', 'Level 2', 'Level 3']

export function Game() {
    const theme = useTheme()
    const [activeStep, setActiveStep] = useState(0)
    const [completed, setCompleted] = useState<{ [k: number]: boolean }>({})
    const [successAnimation, setSuccessAnimation] = useState(false)

    const isUnlocked = () => {
        if (activeStep === 1) {
            return completed[0]
        } else if (activeStep === 2) {
            return completed[1]
        } else return true
    }

    const completedSteps = () => {
        return Object.keys(completed).length
    }

    const isLastStep = () => {
        return activeStep === steps.length - 1
    }

    const allStepsCompleted = () => {
        return completedSteps() === steps.length
    }

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1
        setActiveStep(newActiveStep)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const handleStep = (step: number) => () => {
        setActiveStep(step)
    }

    const handleSuccess = () => {
        setSuccessAnimation(!successAnimation)
    }

    const handleComplete = () => {
        const newCompleted = completed
        newCompleted[activeStep] = true
        setCompleted(newCompleted)
        handleNext()
        setSuccessAnimation(false)
    }

    const handleReset = () => {
        setActiveStep(0)
        setCompleted({})
    }

    function getLevel() {
        switch (activeStep) {
            case 0: { return <Level1 isUnlocked={isUnlocked()} /> }
            case 1: { return <Level2 isUnlocked={isUnlocked()} /> }
            case 2: { return <Level3 isUnlocked={isUnlocked()} /> }
        }
    }

    const stepperContext = {
        activeStep: activeStep,
        completed: completed,
        handleNext: handleNext,
        handleComplete: handleComplete,
        handleSuccess: handleSuccess,
    }

    return (
        <StepperContext.Provider value={stepperContext}>
            <Box sx={{ mt: '104px', position: 'relative' }}>
                <Stepper
                    nonLinear
                    alternativeLabel
                    activeStep={activeStep}
                    sx={{
                        mb: 5,
                    }}>
                    {steps.map((label, index) => (
                        <Step key={label} completed={completed[index]}>
                            <StepButton disableRipple color='inherit' onClick={handleStep(index)}>
                                <Typography variant='subtitle2'>
                                    {label}
                                </Typography>
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
                <Box sx={{ position: 'relative' }}>
                    {!isUnlocked() && <Box sx={{ position: 'absolute', width: '100%', height: '100%', zIndex: 99, backdropFilter: `blur(15px)`, border: 1, borderColor: theme.palette.secondary.dark, borderRadius: 2 }}>
                        <LockIcon sx={{ position: 'absolute', height: '100px', width: '100px', left: 0, right: 0, top: 0, bottom: 0, m: 'auto' }} />
                    </Box>}
                    {successAnimation && <Box sx={{ position: 'absolute', width: '100%', height: '100%', zIndex: 99, backdropFilter: `blur(15px)`, border: 1, borderColor: theme.palette.secondary.dark, borderRadius: 2 }}>
                        <Lottie animationData={success} loop={false} style={{ height: '50%', position: 'absolute', left: 0, right: 0, bottom: 0, top: 0, margin: 'auto' }} />
                    </Box>}
                    {getLevel()}
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, mt: 5 }}>
                    <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                    >
                        {strings.back}
                    </Button>
                    <Button
                        color="inherit"
                        disabled={!isUnlocked()}
                        onClick={handleReset}
                        sx={{ mr: 1 }}
                    >
                        {strings.reset}
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button
                        onClick={handleNext}
                        sx={{ mr: 1 }}>
                        {strings.next}
                    </Button>
                </Box>
            </Box>
        </StepperContext.Provider>
    );
}