import { ResponsiveContainer, BarChart, XAxis, YAxis, Legend, Bar, TooltipProps, Tooltip as ChartTooltip } from "recharts"
import { Typography, Card } from "@mui/material"
import { Headline } from "../../Utils"
import { useAnalyse } from "./analyseHook"
import { localizedStrings } from "../../Res"

/**
 *  This Method creates the content of the Analyse Dialog. It will calculate the gains and splits
 *  and put them together in charts with some text. 
 * 
 *  @param props data:
 *               target:
 *               features:
 *               blockJson:
 *  @returns     UI representation of the content of the Analyse Dialog
 */
export function Analyse(
    props: {
        data: any,
        target: string,
        features: string[],
        blockJson: any,
    }
) {
    const state = useAnalyse(props)

    return (
        <>
            <Typography>
                {localizedStrings.analyse}
            </Typography>

            {/* Information Gain Chart */}
            <Headline
                variant={"h5"}
                text={localizedStrings.information_gain}
            />
            <ResponsiveContainer
                width='100%'
                height={300}
            >
                <BarChart
                    data={state.gains}
                    margin={{
                        top: 20,
                        right: 0,
                        left: 0,
                        bottom: 20,
                    }}
                >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip
                        content={<ToolTip />}
                        cursor={{ fill: 'transparent' }}
                    />
                    <Legend />
                    <Bar
                        dataKey="actual_gain"
                        fill="#6C63FF"
                    />
                    <Bar
                        dataKey="actual_entropy"
                        fill="#BB57FF"
                    />
                    <Bar
                        dataKey="expected_gain"
                        fill="#939c00"
                    />
                    <Bar
                        dataKey="expected_entropy"
                        fill="#E8FF57"
                    />
                </BarChart>
            </ResponsiveContainer>

            {/* Splits Chart */}
            <Headline
                variant={"h5"}
                text={localizedStrings.splits}
            />
            <ResponsiveContainer
                width='50%'
                height={300}
            >
                <BarChart
                    data={state.splits}
                    margin={{
                        top: 20,
                        right: 0,
                        left: 0,
                        bottom: 20,
                    }}
                >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip
                        content={<ToolTip />}
                        cursor={{ fill: 'transparent' }}
                    />
                    <Legend />
                    <Bar
                        dataKey="actual_splits"
                        fill="#C570FF"
                    />
                    <Bar
                        dataKey="expected_splits"
                        fill="#FFD07D"
                    />
                </BarChart>
            </ResponsiveContainer>
        </>
    )
}

/**
 *  This Method creates a Tooltip for each chart
 * 
 *  @param param0   active: Boolean containing information wether the bar is active or not
 *                  payload: Contains the information about the Bars
 *                  label: Label of the Chart, i.e. the Feature
 *  @returns        UI representation of the Tooltip of the Charts
 */
const ToolTip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
        return (
            <Card sx={{ p: 2 }}>
                <Typography>name: {label}</Typography>
                <Typography>{payload[0].dataKey + ': ' + payload[0].value}</Typography>
                <Typography>{payload[1].dataKey + ': ' + payload[1].value}</Typography>
                <Typography>{payload[2].dataKey + ': ' + payload[2].value}</Typography>
                <Typography>{payload[3].dataKey + ': ' + payload[3].value}</Typography>
            </Card>
        )
    }
    return null
}
