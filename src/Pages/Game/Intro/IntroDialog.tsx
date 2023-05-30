import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import { Box, Button, Checkbox, IconButton, Typography } from "@mui/material"
import { useIntro } from './introHook'
import { localizedStrings } from '../../../Res'
import { CustomDialog } from '../../../Utils'

/**
 * 
 *  @param props open: Decides if the Dialog is open or not
 *               title:
 *               steps:
 *               handleClose: 
 *               handleNotAgain:            
 *  @returns     UI representation of the Introdialog
 */
export function IntroDialog(
    props: {
        title: string,
        steps: JSX.Element[],
    }) {
    const state = useIntro(props.steps.length)

    return <CustomDialog
        open={state.open}
        handleClose={state.handleClose}
        title={props.title}
        bottomNavigation={<IntroNavigation state={state} />}
    >
        {props.steps[state.step]}
    </CustomDialog>
}

/**
 * 
 * @param state 
 * @returns 
 */
function IntroNavigation(props: {state: any}) {
    return <Box sx={{
        display: 'flex',
        flexDirection: 'column',
    }}>
        {
            props.state.isLastStep() && <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'end',
            }}>
                <Typography variant={'body2'} color={'secondary.dark'}>
                    {localizedStrings.not_again}
                </Typography>
                <Checkbox
                    checked={props.state.checked}
                    onChange={props.state.handleNotAgain}
                    size="small"
                    sx={{ color: 'secondary.dark' }} />
            </Box>
        }
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'end',
        }}>
            {
                props.state.moreThanOneStep() && props.state.isFirstStep() ?
                    <IconButton sx={{ color: 'secondary.dark' }}>
                        <KeyboardArrowLeftIcon fontSize="large" />
                    </IconButton> :
                    <IconButton
                        onClick={props.state.handlePrevious}
                        sx={{ color: 'primary.main' }}>
                        <KeyboardArrowLeftIcon fontSize="large" />
                    </IconButton>
            }
            {
                props.state.isLastStep() ?
                    <Button
                        onClick={props.state.handleClose}
                        sx={{ color: 'primary.main' }}>
                        {localizedStrings.done}
                    </Button> :
                    <IconButton
                        onClick={props.state.handleNext}
                        sx={{ color: 'primary.main' }}>
                        <KeyboardArrowRightIcon fontSize="large" />
                    </IconButton>
            }
        </Box>
    </Box>
}