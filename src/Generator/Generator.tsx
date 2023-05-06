import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { Box, Typography, Button } from "@mui/material"
import { Headline } from "../Utils/Headline"
import { localizedStrings } from "../Res/localization"
import { Level } from "../Game/Levels"
import { Step1 } from './Step1'
import { Step2 } from './Step2'
import { Step3 } from './Step3'
import { useGenerator } from './generatorHook'

/**
 * 
 * @returns 
 */
export function Generator() {
    const state = useGenerator()
    const steps = [
        <Step1
            target={state.target}
            setTarget={state.setTarget} />,
        <Step2
            isUnlocked={state.step2Unlocked}
            features={state.features}
            setFeatures={state.setFeatures} />,
        <Step3
            isUnlocked={state.step3Unlocked}
            target={state.target}
            features={state.features}
            data={state.data}
            setData={state.setData} />
    ]

    if (!state.isDone) {
        return (
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    minHeight: `calc(100vh - 244px)`,
                    mx: 'auto',
                }}>
                <Headline
                    variant={"h4"}
                    text={localizedStrings.generator_title} />
                {steps}
                <Box
                    sx={{
                        display: state.step3Unlocked ? 'flex' : 'none',
                        flexDirection: 'column',
                        my: 2,
                    }}>
                    {
                        state.validateHints.map(
                            (val: (string | boolean)[]) => val[0] &&
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        color: 'red',
                                        width: '100%',
                                        alignItems: 'center',
                                        justifyContent: 'end'
                                    }}>
                                    <ErrorOutlineIcon sx={{ mx: .5, height: 12 }} />
                                    <Typography sx={{ fontSize: 12 }}>
                                        {val[1]}
                                    </Typography>
                                </Box>
                        )
                    }
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'end',
                        }}>
                        <Button
                            disabled={!state.isValidData}
                            onClick={state.handleClick}>
                            {localizedStrings.done}
                        </Button>
                    </Box>
                </Box>
            </Box>
        )
    } else {
        return <Level
            xmlKey={`generator${Math.random()}`}
            data={state.table}
            title='Generator'
            description={localizedStrings.generator_description}
            isUnlocked={true} />
    }
}
