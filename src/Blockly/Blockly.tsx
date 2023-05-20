import CancelIcon from '@mui/icons-material/Cancel';
import { Box, Button, CircularProgress, Tooltip as MuiTooltip, SvgIcon, Typography } from '@mui/material';
import { BlocklyWorkspace } from 'react-blockly';
import "./Blockly.css";
import { useContext, useEffect, useState } from 'react';
import { darkTheme, lightTheme } from './blocklyTheme';
import BlocklyLib from 'blockly';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atelierCaveDark, atelierCaveLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import './blocks/';
import './generators';
import SvgComponent from '../Assets/logo_built_with';
import { jsonGenerator } from './generators/json_generator';
import { StepperContext, TableContext } from '../context';
import Grid2 from '@mui/material/Unstable_Grid2';
import json from 'react-syntax-highlighter/dist/cjs/languages/hljs/json'
import { Tree } from 'react-tree-graph';
import { scaleInHorLeft, scaleInHorRight, scaleInVerCenter } from '../Utils/animations';
import './Graph.css'
import { useTheme } from '@mui/material/styles'
import { codeGenerator, createNode } from './blocks/node';
import { createTree } from '../ID3/decision-tree';
import { localizedStrings } from '../Res/localization';
import { createToolBox } from './toolbox';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, TooltipProps, ResponsiveContainer } from 'recharts';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { CustomDialog, Headline } from '../Utils'
import { useBlockly } from './blocklyHook'
import ExtensionIcon from '@mui/icons-material/Extension'
import ExtensionOffIcon from '@mui/icons-material/ExtensionOff'
import CodeIcon from '@mui/icons-material/Code'
import CodeOffIcon from '@mui/icons-material/CodeOff'

const _ = require('lodash');

export function Blockly(props: { xmlKey: string }) {
    const state = useBlockly()
    const theme = useTheme()
    const [blockCode, setBlockCode] = useState("");
    const [jsonString, setJsonString] = useState("");
    const [graphVisible, setGraphVisible] = useState(false)
    const [showJson, setShowJson] = useState(false)
    const [jsonError, setJsonError] = useState(false)
    const [blockJson, setBlockJson] = useState<{ value: any, gain: any, type: string }>()
    const [loading, setLoading] = useState(true)

    /* Table */
    const { data } = useContext(TableContext)
    const { target } = useContext(TableContext)
    const { features } = useContext(TableContext)
    const { addResult } = useContext(TableContext)
    const [seed, setSeed] = useState(1)

    createNode(data, target, features)

    /* Stepper */
    const { handleComplete } = useContext(StepperContext)
    const { handleSuccess } = useContext(StepperContext)
    const { completed } = useContext(StepperContext)
    const { activeStep } = useContext(StepperContext)

    /* Analyse */
    const [showAnalyse, setShowAnalyse] = useState(false)

    const handleClose = () => {
        setShowAnalyse(false)
        handleComplete()
    }

    const handleShowAnalyse = () => setShowAnalyse(true)

    const getChildren = (val: any) => _.compact(_.uniq(_.map(data, val.value)).map((ele: any) => val[ele]))

    const handleReplay = () => {
        handleClose()
    }

    const getSplits = (tree: any) => _.partition(tree, ['type', 'decision'])[0].length + 1

    let initialXml = localStorage.getItem(props.xmlKey) !== null ?
        localStorage.getItem(props.xmlKey)!! :
        '<xml xmlns="https://developers.google.com/blockly/xml"><block type="node" x="100" y="100"></block></xml>'

    const clearWorkspace = () => {
        saveXML('<xml xmlns="https://developers.google.com/blockly/xml"><block type="node" x="70" y="30"></block></xml>')
        setSeed(Math.random())
    }

    useEffect(() => {
        if (!data && !target && !features) setLoading(true)
        else if (data.length > 0 && features.length > 0 && target !== '') setLoading(false)
    }, [TableContext])

    useEffect(() => {
        setSeed(Math.random())
    }, [theme.palette.mode, localizedStrings.getLanguage(), props.xmlKey])

    useEffect(() => {
        try {
            setBlockJson(JSON.parse(blockCode))
            setJsonError(false)
        } catch (e) {
            setJsonError(true)
        }
    }, [blockCode])

    function workspaceDidChange(workspace: BlocklyLib.WorkspaceSvg) {
        setJsonString(jsonGenerator.workspaceToCode(workspace));
        setBlockCode(codeGenerator.workspaceToCode(workspace));
    }

    const saveXML = (xml: string) => localStorage.setItem(props.xmlKey, xml)

    async function checkCode() {
        var allRowsCorrect = true

        data.forEach((obj, index) => {
            const actualResult = checkRow(
                obj,
                blockJson
            )
            addResult(actualResult, index)
            if (actualResult !== obj[target] && obj[target] !== undefined) allRowsCorrect = false
        })
        if (allRowsCorrect && !completed[activeStep]) {
            handleSuccess()
            await new Promise(res => setTimeout(res, 1500))
            handleShowAnalyse()
        }
    }

    function checkRow(obj: any, block: any): any {
        const valueFromTable = obj[block.value]
        const valueFromBlock = block[valueFromTable]
        if (valueFromBlock === null) {
            return localizedStrings.leaf_missing
        } else if (valueFromBlock === undefined) {
            return localizedStrings.node_missing
        } else if (valueFromBlock.type === 'leaf') {
            return valueFromBlock.value
        } else {
            return checkRow(obj, valueFromBlock)
        }
    }

    function onShowResult(json: any) {
        var blocks = ''
        let decision = json["value"]
        let choices = _.uniq(_.map(data, decision))
        if (json['type'] === 'decision') {
            blocks += '<block type="node" x="100" y="100"><field name="DECISION">' + decision + '</field>'
            blocks += '<mutation itemCount="' + choices.length + '"></mutation>'
            choices.forEach((choice: any, index: number) => {
                blocks += '<field name="CHOICE' + index + '">' + choice + '</field>'
            })
            choices.forEach((choice: any, index: number) => {
                if (json[choice] !== null || json[choice] !== undefined) {
                    blocks += '<value name="' + index + '">' + onShowResult(json[choice]) + '</value>'
                }
            })
            blocks += '</block>'
        } else {
            blocks += '<block type="leaf0"><field name="LEAF">' + decision + '</field></block>'
        }
        return blocks
    }

    const showResult = () => {
        var dt = createTree(data, target, features);
        const blocks = onShowResult(dt)
        saveXML('<xml xmlns="https://developers.google.com/blockly/xml">' + blocks + '</xml>')
        setSeed(Math.random())
    }

    const getAnalyseData = (json: any) => {
        let data: any[] = []
        if (json.type === 'decision') {
            data.push({ name: json.value, gain: json.gain })
            _.forEach(json, function (value: any, key: any) {
                if (key !== 'gain' && key !== 'type' && key !== 'value') {
                    data.push(getAnalyseData(value))
                }
            })
        }
        return _.flatMapDeep(data)
    }

    const analyseData = (blockJson: any, id3Json: any) => {
        let blockData = getAnalyseData(blockJson)
        let id3Data = getAnalyseData(id3Json)
        const data: any[] = []
        blockData.forEach((row: any) => {
            let id3Gain = _.find(id3Data, { name: row.name })
            if (id3Gain === undefined) {
                data.push({ name: row.name, actual_gain: row.gain })
            } else {
                data.push({ name: row.name, actual_gain: row.gain, expected_gain: id3Gain.gain })
            }
        })
        return data
    }

    const ToolTip = ({ active, payload, label }: TooltipProps<number, string>) => {
        if (active && payload && payload.length) {
            return (
                <Box sx={{ background: theme.palette.secondary.light, border: 1, borderColor: theme.palette.secondary.dark, borderRadius: 2, p: 2 }}>
                    <Typography>name: {label}</Typography>
                    {payload[0] && payload[0].value && <Typography>{payload[0].dataKey + ': ' + payload[0].value}</Typography>}
                    {payload[1] && payload[1].value && <Typography>{payload[1].dataKey + ': ' + payload[1].value}</Typography>}
                </Box>
            )
        }
        return null
    }

    function Analyse() {
        var dt = createTree(data, target, features);
        let blockSplits = getSplits(blockJson)
        let id3Splits = getSplits(dt)
        let splitObj = [{
            name: target,
            actual_splits: blockSplits,
            expected_splits: id3Splits
        }]
        return (
            <>
                <Typography>
                    {localizedStrings.analyse}
                </Typography>
                <Headline variant={"h5"} text={localizedStrings.information_gain} />
                <ResponsiveContainer width='100%' height={300}>
                    <BarChart
                        data={analyseData(blockJson, dt)}
                        margin={{
                            top: 20,
                            right: 0,
                            left: 0,
                            bottom: 20,
                        }} >
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={<ToolTip />} cursor={{ fill: 'transparent' }} />
                        <Legend />
                        <Bar dataKey="actual_gain" fill="#6C63FF" />
                        <Bar dataKey="expected_gain" fill="#939c00" />
                    </BarChart>
                </ResponsiveContainer>
                <Headline variant={"h5"} text={localizedStrings.information_gain} />
                <ResponsiveContainer width='50%' height={300}>
                    <BarChart
                        data={splitObj}
                        margin={{
                            top: 20,
                            right: 0,
                            left: 0,
                            bottom: 20,
                        }} >
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={<ToolTip />} cursor={{ fill: 'transparent' }} />
                        <Legend />
                        <Bar dataKey="actual_splits" fill="#C570FF" />
                        <Bar dataKey="expected_splits" fill="#FFD07D" />
                    </BarChart>
                </ResponsiveContainer>
            </>
        )
    }

    const functionalities = [
        [localizedStrings.check_code, checkCode],
        [localizedStrings.show_result, showResult],
    ]

    if (loading) {
        return <Box sx={{ width: '100%', height: '1000px' }}>
            <CircularProgress sx={{ position: 'absolute', height: '100px', width: '100px', left: 0, right: 0, top: 0, bottom: 0, m: 'auto' }} />
        </Box>
    }

    return (
        <>
            <CustomDialog
                handleClose={handleClose}
                bottomNavigation={undefined}
                open={showAnalyse}
                title={localizedStrings.analyse_title}>
                {showAnalyse && <Analyse />}
            </CustomDialog>
            {state.showTree &&
                <Box sx={{ animation: `${scaleInVerCenter} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`, width: '100%', background: theme.palette.secondary.light, border: 1, borderRadius: 2, borderColor: theme.palette.secondary.dark }}>
                    {jsonError ? <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            color: 'red',
                            height: '500px',
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <ErrorOutlineIcon sx={{ mx: 1 }} />
                        <Typography>{localizedStrings.json_error}</Typography>
                    </Box> : <ResponsiveContainer width='100%' height={500}>
                        <Tree
                            data={blockJson}
                            animated={true}
                            labelProp={"value"}
                            keyProp={"gain"}
                            getChildren={getChildren}
                            svgProps={{
                                className: 'custom'
                            }} />
                    </ResponsiveContainer>}
                </Box>}
            <Box sx={{ flexDirection: 'row', my: 2, flex: 1, display: 'flex', alignItems: 'end' }}>
                {functionalities.map((val: any[], index: number) =>
                    <>
                        <Button
                            key={Math.random()}
                            variant={index === 0 ? 'contained' : 'outlined'}
                            onClick={val[1]}
                            disabled={jsonError}
                            sx={{
                                height: index === 0 ? '50px' : '40px',
                                mx: 1,
                            }}>
                            {val[0]}
                        </Button>
                    </>
                )}
                <Box sx={{ flex: 1 }} />
                <MuiTooltip title={localizedStrings.show_tree}>
                    <Button
                        key={Math.random()}
                        onClick={state.handleTree}
                        disabled={jsonError}
                        sx={{
                            height: '40px',
                        }}>
                        {state.showTree ? <ExtensionOffIcon fontSize='large' /> : <ExtensionIcon fontSize='large' />}
                    </Button>
                </MuiTooltip>
                <MuiTooltip title={localizedStrings.show_json} disableFocusListener={jsonError}>
                    <Button
                        key={Math.random()}
                        onClick={state.handleJson}
                        disabled={jsonError}
                        sx={{
                            height: '40px',
                        }}>
                        {state.showJson ? <CodeOffIcon fontSize='large' /> : <CodeIcon fontSize='large' />}
                    </Button>
                </MuiTooltip>
                <MuiTooltip title={localizedStrings.clear_workspace}>
                    <Button
                        onClick={clearWorkspace}
                        sx={{
                            height: '40px',
                        }}>
                        <CancelIcon fontSize='large' />
                    </Button>
                </MuiTooltip>
            </Box>
            <Grid2 container spacing={3}>
                <Grid2 xs={12} md={state.showJson ? 8 : 12}>
                    <Box sx={{ animation: `${scaleInHorLeft} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`, height: '800px', borderRadius: 2, overflow: 'hidden', border: 1, borderColor: theme.palette.secondary.dark }}>
                        <BlocklyWorkspace
                            key={seed}
                            className='fill-height'
                            toolboxConfiguration={createToolBox(data, target)}
                            initialXml={initialXml}
                            onXmlChange={saveXML}
                            onWorkspaceChange={workspaceDidChange}
                            workspaceConfiguration={{
                                trashcan: true,
                                scrollbars: true,
                                theme: theme.palette.mode === 'dark' ? darkTheme : lightTheme,
                                grid: {
                                    spacing: 20,
                                    length: 3,
                                    colour: theme.palette.mode === 'dark' ? '#424242' : '#bdbdbd',
                                    snap: true,
                                },
                            }}
                        />
                        <SvgIcon
                            component={SvgComponent}
                            inheritViewBox
                            sx={{
                                display: 'flex',
                                height: '40px',
                                width: '100px',
                                position: 'absolute',
                                bottom: 0,
                                zIndex: 80,
                                left: 0,
                                m: 5,
                            }} />
                        {jsonError && <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            position: 'absolute',
                            top: 0,
                            right: 80,
                            m: 3,
                            color: 'red',
                        }}>
                            <ErrorOutlineIcon sx={{ mx: 1 }} />
                            <Typography>{localizedStrings.json_error}</Typography>
                        </Box>}
                    </Box>
                </Grid2>
                {state.showJson && <Grid2 xs={12} md={4}>
                    <Box sx={{ animation: `${scaleInHorRight} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`, borderRadius: 2, height: '100%', width: '100%', border: 1, borderColor: theme.palette.secondary.dark, overflow: 'hidden' }}>
                        <SyntaxHighlighter
                            className='fill-height'
                            wrapLongLines={true}
                            language={json}
                            style={theme.palette.mode === 'dark' ? atelierCaveDark : atelierCaveLight}
                        >
                            {jsonString}
                        </SyntaxHighlighter>
                    </Box>
                </Grid2>}
            </Grid2>
        </>
    );
}
