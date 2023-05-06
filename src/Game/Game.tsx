import useGame from './gameHook'
import getLevel from './Levels/Levels'
import LockIcon from '@mui/icons-material/Lock'
import Lottie from "lottie-react"
import success from '../Assets/lottie_success.json'
import { Typography, Box, Stepper, Step, StepButton, Button } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { StepperContext } from '../context'
import { localizedStrings } from '../Res/localization'
import { IntroDialog } from './Intro/IntroDialog'
import { intros as getIntros } from './Intro/intros'

const steps = ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5']
const intros = getIntros

/**
 *  This Method creates the Environment for the upcoming Level. It holds the Level Overview, and controls the 
 *  navigation within the Game aswell as the Intro.
 * 
 * @returns UI Representation of the Game
 */
export default function Game() {
    const state = useGame()
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
                                completed={context.completed[index]}>
                                <StepButton
                                    disableRipple
                                    color='inherit'
                                    onClick={state.setStep(index)}>
                                    <Typography variant='subtitle2'>
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
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, mt: 5 }}>
                    <Button
                        color="inherit"
                        disabled={context.activeStep === 0}
                        onClick={state.handleBack}
                        sx={{ mr: 1 }}
                    >
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
        <Box sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 89,
            backdropFilter: `blur(15px)`,
            border: 1,
            borderColor: useTheme().palette.secondary.dark,
            borderRadius: 2,
        }}>
            {props.children}
        </Box>
    )
}
