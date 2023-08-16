import { Card, Typography, Chip, Box } from "@mui/material"
import { localizedStrings } from "../../Res"
import { Headline } from "../../Utils"
import { scaleInVerCenter } from "../../Utils/animations"
import { useHint } from "./hintHook"

/**
 *  This Method creates the UI for the Hint Section. It will ask the User to select the Feature
 *  where help is needed and shows the help afterwards.
 * 
 *  @param props data: Table which holds the Records
 *               target: The Decision to make
 *               features: Features that influence the decision
 *               blockJson: JSON object holding the actual programm progress
 *  @returns UI representation of the Hint section
 */
export function Hint(
    props: {
        data: any,
        features: string[],
        target: string,
        blockJson: any,
    }
) {
    const state = useHint(props.data, props.features, props.target, props.blockJson)

    return (
        <Card
            sx={{
                animation: `${scaleInVerCenter} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
                height: '100%',
                width: '100%',
                maxHeight: '50vh',
                pt: 1,
                px: 3,
                pb: 3,
                overflow: 'auto',
            }}
        >
            <Headline variant="h5" text={localizedStrings.hint} />
            <Typography>
                {localizedStrings.hint_title}
            </Typography>
            <Box
                sx={{
                    my: 1,
                    display: 'flex',
                    flexDirection: 'row',
                    overflow: 'auto',
                    alignItems: 'center',
                }}
            >
                <Typography sx={{ color: 'primary.contrastText' }}>
                    {localizedStrings.feature + ":"}
                </Typography>
                {
                    props.features.map(
                        (feature: string) =>
                        (
                            feature && <Chip
                                key={Math.random()}
                                label={feature.toString()}
                                variant='outlined'
                                onClick={state.selectFeature(feature)}
                                onDelete={state.selectedFeature === feature.toString() ? state.unSelectFeature : undefined}
                                sx={{
                                    mx: 1,
                                    color: state.selectedFeature === feature.toString() ? 'primary.main' : 'secondary.dark',
                                    borderColor: state.selectedFeature === feature.toString() ? 'primary.main' : 'secondary.dark',
                                }}
                            />
                        )
                    )
                }
            </Box>
            {
                state.possibleValues.length !== 0 &&
                <Box
                    sx={{
                        mb: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        overflow: 'auto',
                    }}
                >
                    <Typography sx={{ color: 'primary.contrastText' }}>
                        {localizedStrings.value + ":"}
                    </Typography>
                    {
                        state.possibleValues.map(
                            (val: any) =>
                            (
                                val && <Chip
                                    key={Math.random()}
                                    size='small'
                                    label={val.toString()}
                                    variant='outlined'
                                    onClick={state.selectFeatureVal(val)}
                                    onDelete={state.selectedFeatureVal === val.toString() ? state.unSelectFeatureVal : undefined}
                                    sx={{
                                        mx: 1,
                                        color: state.selectedFeatureVal === val.toString() ? 'primary.main' : 'secondary.dark',
                                        borderColor: state.selectedFeatureVal === val.toString() ? 'primary.main' : 'secondary.dark',
                                    }}
                                />
                            )
                        )
                    }
                </Box>
            }
            {
                state.selectedFeature && state.selectedFeatureVal &&
                (
                    state.gains?.length !== 0 ?
                        <>
                            <Box sx={{ my: 2, mx: 5, borderTop: 1, flex: 1, display: 'flex', alignSelf: 'center', borderColor: 'secondary.dark' }} />
                            <Typography>
                                {localizedStrings.hint_description}
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Typography sx={{ flex: 1 }}>
                                    {localizedStrings.decision}
                                </Typography>
                                <Typography>
                                    {localizedStrings.information_gain}
                                </Typography>
                            </Box>
                            {
                                state.gains?.map(
                                    (obj: { name: string; gain: number }) =>
                                        <Box key={Math.random()} sx={{ display: 'flex', flexDirection: 'row' }}>
                                            <Typography sx={{ mr: 2, color: 'secondary.dark', flex: 1 }}>
                                                {obj.name}
                                            </Typography>
                                            <Typography sx={{ color: 'primary.main' }}>
                                                {obj.gain.toFixed(3)}
                                            </Typography>
                                        </Box>
                                )
                            }
                        </> : <Typography>
                            {localizedStrings.hint_leafs}
                        </Typography>
                )
            }
        </Card>
    )
}