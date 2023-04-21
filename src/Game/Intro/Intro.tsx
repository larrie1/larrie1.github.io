import { Backdrop, Box, Button, Checkbox, IconButton, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles'
import { useEffect, useState } from "react";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import CloseIcon from '@mui/icons-material/Close';
import { Headline } from "../../Utils/Headline";
import { localizedStrings } from "../../Res/localization";

export function IntroDialog(props: { open: boolean, title: string, steps: any[], handleClose: () => void, handleNotAgain?: () => void, customButton?: any }) {
    const theme = useTheme()
    const [checked, setCheck] = useState(false)
    const [step, setStep] = useState(0)

    const handleChange = () => setCheck(!checked)

    const handleNext = () => setStep(step + 1)

    const handlePrevious = () => setStep(step - 1)
    
    const handleClose = () => {
        document.body.style.overflow = 'unset'
        props.handleClose()
    }

    useEffect(() => {
        if (props.open) {
            if (typeof window !== 'undefined' && window.document) {
                document.body.style.overflow = 'hidden'
            }
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [props.open])

    return <Backdrop
        open={props.open}
        sx={{ background: 'transparent', backdropFilter: `blur(20px)`, height: '100%', zIndex: 99 }}>
        <Box sx={{ width: '30vw', background: theme.palette.secondary.light, border: 1, borderColor: theme.palette.secondary.dark, borderRadius: 2, p: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <Headline variant={"h4"} text={props.title} />
                <Box sx={{ flex: 1 }} />
                <IconButton onClick={handleClose} sx={{ p: 2, color: 'secondary.dark' }}>
                    <CloseIcon />
                </IconButton>
            </Box>
            {props.steps[step]}
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {props.handleNotAgain !== undefined && step == props.steps.length -1 && <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Typography variant={'body2'} color={'secondary.dark'}>
                            {localizedStrings.not_again}
                        </Typography>
                        <Checkbox checked={checked} onChange={handleChange} size="small" sx={{ color: 'secondary.dark' }} />
                    </Box>}
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
                        {props.customButton !== undefined ? props.customButton : null}
                        {props.steps.length > 1 && (step === 0 ? <IconButton sx={{ color: 'secondary.dark' }}>
                            <KeyboardArrowLeftIcon fontSize="large" />
                        </IconButton> : <IconButton onClick={handlePrevious} sx={{ color: 'primary.main' }}>
                            <KeyboardArrowLeftIcon fontSize="large" />
                        </IconButton>)}
                        {step === props.steps.length - 1 ? <Button onClick={handleClose} sx={{ color: 'primary.main' }}>
                            {localizedStrings.done}
                        </Button> : <IconButton onClick={handleNext} sx={{ color: 'primary.main' }}>
                            <KeyboardArrowRightIcon fontSize="large" />
                        </IconButton>}
                    </Box>
                </Box>
            </Box>
        </Box>
    </Backdrop>
}