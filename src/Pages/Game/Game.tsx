import useGame from './gameHook'
import getLevel from './Levels/Levels'
import LockIcon from '@mui/icons-material/Lock'
import Lottie from "lottie-react"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import { Typography, Box, Stepper, Step, StepButton, Button, Card } from '@mui/material'
import { IntroDialog } from './Intro/IntroDialog'
import { intros as getIntros } from './Intro/intros'
import { localizedStrings, success } from '../../Res'
import { StepperContext } from '../../context'

const steps = ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5']

/**
 *  This Method creates the Environment for the upcoming Level. It holds the Level Overview, and controls the 
 *  navigation within the Game aswell as the Intro.
 * 
 * @returns UI Representation of the Game
 */
export function Game() {
    const state = useGame()
    const intros = getIntros()
    const context = state.stepperContext

    return (
        <StepperContext.Provider value={context}>
            <Box sx={{
                mt: '40px',
                position: 'relative',
            }}>
                <IntroDialog
                    title={localizedStrings.block_intro_title}
                    steps={intros} />
                <Stepper
                    nonLinear
                    alternativeLabel
                    activeStep={context.activeStep}
                    sx={{
                        mb: 5,
                    }}>
                    {steps.map(
                        (label, index) => (
                            <Step
                                key={label}
                                sx={{
                                    '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                                        fill: 'white',
                                    },
                                    '& .MuiStepLabel-root .Mui-completed .MuiStepIcon-root': {
                                        color: 'primary.light',
                                    },
                                    '& .MuiStepLabel-root .MuiStepIcon-root': {
                                        color: 'secondary.dark',
                                    },
                                    '& .MuiStepLabel-root .Mui-active': {
                                        color: 'primary.main',
                                      },
                                      '& .MuiStepLabel-root .Mui-completed': {
                                        color: 'primary.light',
                                      },
                                    '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
                                    {
                                        color: 'grey.500', 
                                    },
                                    '& .MuiStepLabel-label.MuiStepLabel-alternativeLabel':
                                    {
                                        color: 'grey.500', 
                                    },
                                }}
                                completed={context.completed[index]}>
                                <StepButton
                                    disableRipple
                                    onClick={state.setStep(index)}>
                                    <Typography variant='subtitle2' color={context.activeStep === index ? 'primary' : 'inherit'}>
                                        {label}
                                    </Typography>
                                </StepButton>
                            </Step>
                        ))}
                </Stepper>
                <Box sx={{ position: 'relative' }}>
                    {!state.isActiveLevelUnlocked &&
                        <Overlay>
                            <LockIcon sx={{
                                position: 'absolute',
                                height: '100px',
                                width: '100px',
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                                m: 'auto',
                            }} />
                        </Overlay>}
                    {state.successAnimation &&
                        <Overlay>
                            <Lottie
                                animationData={success}
                                loop={false}
                                style={{
                                    height: '50%',
                                    position: 'absolute',
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    top: 0,
                                    margin: 'auto',
                                }} />
                        </Overlay>
                    }
                    {getLevel(
                        context.activeStep,
                        context.completed[context.activeStep - 1]
                    )}
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
                    <Button
                        color="inherit"
                        disabled={context.activeStep === 0}
                        onClick={state.handleBack}
                        sx={{ mr: 1 }}
                    >
                        <KeyboardArrowLeftIcon />
                        {localizedStrings.back}
                    </Button>
                    <Button
                        color="inherit"
                        disabled={!state.isActiveLevelUnlocked}
                        onClick={state.handleReset}
                        sx={{ mr: 1 }}
                    >
                        {localizedStrings.reset}
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button
                        onClick={context.handleNext}
                        sx={{ mr: 1 }}>
                        {localizedStrings.next}
                        <KeyboardArrowRightIcon />
                    </Button>
                </Box>
            </Box>
        </StepperContext.Provider>
    )
}

/**
 *  This Method creates an Overlay which will be displayed when a Level isn't unlocked or when you finish the Level.
 * 
 *  @param props    children: UI element which should be displayed within the Overlay
 *  @returns        UI representation of an overlay
 */
function Overlay(props: { children: any }) {
    return (
        <Card sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 89,
            background: 'transparent',
            backdropFilter: `blur(15px)`,
        }}>
            {props.children}
        </Card>
    )
}
