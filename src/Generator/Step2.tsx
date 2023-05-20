import AddIcon from '@mui/icons-material/Add'
import { Card, Typography, Box, TextField, IconButton } from "@mui/material"
import { localizedStrings } from "../Res/localization"
import { Headline } from "../Utils"
import { scaleInVerTop } from "../Utils/animations"

/**
 *  This Method creates the second Step. In this Step the features of the 
 *  Level are getting collected. 
 * 
 *  @param props    features: State Variable which holds the actual list of Features
 *                  setFeatures: Function that will be called when a new Feature is getting entered
 *                  isUnlocked: Boolean that indicates if this step is unlocked or not, because a Decision is missing
 *  @returns        UI representation of the first step
 */
 export function Step2(props: {
    features: string[],
    setFeatures: any,
    isUnlocked: boolean,
}) {
    const handleChange = (val: string, index: number) =>
        props.setFeatures(
            (prev: string[]) => prev.map(
                (el: string, i: number) => i === index ? val : el
            )
        )

    const addInput = () => props.setFeatures([...props.features, ''])

    return (
        <Card
            sx={{
                animation: `${scaleInVerTop} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
                mt: 2,
                px: 2,
                pb: 2,
                display: props.isUnlocked ? 'xs' : 'none',
            }}>
            <Headline variant={"h6"} text={localizedStrings.features} />
            <Typography sx={{ ml: 1 }}>
                {localizedStrings.generator_step2}
            </Typography>
            <Box
                sx={{
                    m: 5,
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    maxHeight: '50vh',
                    overflow: 'auto',
                }}>
                {
                    props.features.map(
                        (_: string, index: number) =>
                            <TextField
                                sx={{ my: 1 }}
                                onChange={
                                    (event: React.ChangeEvent<HTMLInputElement>) => {
                                        handleChange(event.target.value, index)
                                    }
                                }
                                size='small'
                                label={'feature ' + (index + 1)}
                                variant="outlined"
                            />
                    )}
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                    <IconButton
                        onClick={addInput}
                        sx={{ color: 'primary' }}>
                        <AddIcon />
                    </IconButton>
                </Box>
            </Box>
        </Card>
    )
}