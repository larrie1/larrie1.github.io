import { Typography, Box, Stepper, Step, StepButton, Button } from '@mui/material';
import { useState } from 'react';
import { Level1, Level2, Level3 } from './Levels';
import { useTheme } from '@mui/material/styles'
import LockIcon from '@mui/icons-material/Lock';

const steps = ['Level 1', 'Level 2', 'Level 3']

export function Game() {
    const theme = useTheme()
    const [activeStep, setActiveStep] = useState(0)
    const [completed, setCompleted] = useState<{
        [k: number]: boolean;
    }>({})

    const totalSteps = () => {
        return steps.length
    }

    const isUnlocked = () => {
        return activeStep !== 0 && !completed[activeStep - 1]
    }

    const completedSteps = () => {
        return Object.keys(completed).length
    }

    const isLastStep = () => {
        return activeStep === totalSteps() - 1
    }

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps()
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

    const handleComplete = () => {
        const newCompleted = completed
        newCompleted[activeStep] = true
        setCompleted(newCompleted)
        handleNext()
    }

    const handleReset = () => {
        setActiveStep(0)
        setCompleted({})
    }

    function getLevel() {
        switch (activeStep) {
            case 0: { return <Level1 isUnlocked={completed[0]} /> }
            case 1: { return <Level2 isUnlocked={completed[1]} /> }
            case 2: { return <Level3 isUnlocked={completed[2]} /> }
        }
    }

    return (
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
                {isUnlocked() && <Box sx={{ position: 'absolute', width: '100%', height: '100%', zIndex: 99, backdropFilter: `blur(15px)`, border: 1, borderColor: theme.palette.secondary.dark, borderRadius: 2 }}>
                    <LockIcon sx={{ position: 'absolute', height: '100px', width: '100px', top: '50%', left: '46%' }} />
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
                    Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button
                    disabled={isUnlocked()}
                    onClick={handleNext}
                    sx={{ mr: 1 }}>
                    Next
                </Button>
                {activeStep !== steps.length &&
                    (completed[activeStep] ? (
                        <Typography variant="caption" sx={{ display: 'inline-block' }}>
                            Step {activeStep + 1} already completed
                        </Typography>
                    ) : (
                        <Button
                            disabled={isUnlocked()}
                            onClick={handleComplete}>
                            {completedSteps() === totalSteps() - 1
                                ? 'Finish'
                                : 'Complete Step'}
                        </Button>
                    ))}
            </Box>
        </Box>
    );
}