import { Card, Typography, Chip, Box } from "@mui/material"
import _ from "lodash"
import { useEffect, useState } from "react"
import { localizedStrings } from "../../Res"
import { Headline } from "../../Utils"
import { scaleInVerCenter } from "../../Utils/animations"
import { gain, NODE_TYPES } from "../ID3/decision-tree"

export function Hint(
    props: {
        data: any,
        features: string[],
        target: string,
        blockJson: any,
    }
) {
    const [selectedFeature, setFeature] = useState("")
    const [selectedFeatureVal, setFeatureVal] = useState("")

    const selectFeature = (feature: string) => () => setFeature(feature.toString())
    const unSelectFeature = () => setFeature("")

    const selectFeatureVal = (featureVal: string) => () => setFeatureVal(featureVal.toString())
    const unSelectFeatureVal = () => setFeatureVal("")

    const [possibleValues, setPossibleValues] = useState<string[]>([])

    useEffect(() => {
        if (selectedFeature === "") setPossibleValues([])
        else setPossibleValues(_.uniq(_.map(props.data, selectedFeature)))
    }, [selectedFeature])

    useEffect(() => {
        setFeature("")
        setFeatureVal("")
    }, [props.features])

    function calcData(json: any, features: string[], data: any) {
        if (json && json.type === NODE_TYPES.DECISION && json.value) {
            let remainingFeatures = _.without(features, json.value)
            let vals = _.uniq(_.map(data, json.value))
            if (json.value === selectedFeature) {
                return {
                    data: data.filter((dataRow: any) => dataRow[json.value].toString() === selectedFeatureVal),
                    features: remainingFeatures
                }
            } else {
                vals.forEach(
                    (val: any) => {
                        calcData(json[val], remainingFeatures, data.filter((dataRow: any) => dataRow[json.value] === val))
                    }
                )
            }
        }
    }

    function calcGains() {
        let remainingData = calcData(props.blockJson, props.features, props.data)
        let gains: { name: string; gain: number }[] = []

        remainingData?.features.forEach(
            (feature: string) => {
                gains.push({
                    name: feature,
                    gain: gain(remainingData?.data, props.target, feature)
                })
            }
        )

        return gains
    }

    return (
        <Card
            sx={{
                animation: `${scaleInVerCenter} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
                flex: 1,
                pt: 1,
                px: 3,
                pb: 3,
                mr: 2,
                overflow: 'auto',
                transition: 'all 0.5s'
            }}
        >
            <Headline variant="h6" text={localizedStrings.hint} />
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
                <Typography sx={{ color: 'secondary.dark' }}>
                    {localizedStrings.decision + ":"}
                </Typography>
                {
                    props.features.map(
                        (feature: string) =>
                            <Chip
                                key={Math.random()}
                                label={feature.toString()}
                                variant='outlined'
                                onClick={selectFeature(feature)}
                                onDelete={selectedFeature === feature.toString() ? unSelectFeature : undefined}
                                sx={{
                                    mx: 1,
                                    color: selectedFeature === feature.toString() ? 'primary.main' : 'secondary.dark',
                                    borderColor: selectedFeature === feature.toString() ? 'primary.main' : 'secondary.dark',
                                }}
                            />
                    )
                }
            </Box>
            {
                possibleValues.length !== 0 &&
                <Box
                    sx={{
                        mb: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        overflow: 'auto',
                    }}
                >
                    <Typography sx={{ color: 'secondary.dark' }}>
                        {localizedStrings.feature + ":"}
                    </Typography>
                    {
                        possibleValues.map(
                            (val: any) =>
                                <Chip
                                    key={Math.random()}
                                    size='small'
                                    label={val.toString()}
                                    variant='outlined'
                                    onClick={selectFeatureVal(val)}
                                    onDelete={selectedFeatureVal === val.toString() ? unSelectFeatureVal : undefined}
                                    sx={{
                                        mx: 1,
                                        color: selectedFeatureVal === val.toString() ? 'primary.main' : 'secondary.dark',
                                        borderColor: selectedFeatureVal === val.toString() ? 'primary.main' : 'secondary.dark',
                                    }}
                                />
                        )
                    }
                </Box>
            }
            {
                selectedFeature && selectedFeatureVal &&
                (
                    calcGains()?.length !== 0 ?
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
                                calcGains()?.map(
                                    (obj: { name: string; gain: number }) =>
                                        <Box key={Math.random()} sx={{ display: 'flex', flexDirection: 'row' }}>
                                            <Typography sx={{ mr: 2, color: 'secondary.dark', flex: 1 }}>
                                                {obj.name}
                                            </Typography>
                                            <Typography sx={{ color: 'primary.main' }}>
                                                {obj.gain}
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