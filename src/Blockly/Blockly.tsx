import { Box, Button, Typography } from '@mui/material';
import { BlocklyWorkspace } from 'react-blockly';
import "./Blockly.css";
import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { darkTheme, lightTheme } from './blocklyTheme';
import BlocklyLib from 'blockly';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atelierCaveDark, atelierCaveLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import './blocks/';
import './generators';
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
import { strings } from '../Res/localization';
import { IntroDialog } from '../Game/Intro';
import { createToolBox } from './toolbox';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, TooltipProps, ResponsiveContainer } from 'recharts';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const _ = require('lodash');

export function Blockly(props: { xmlKey: string }) {
    const theme = useTheme()
    const [blockCode, setBlockCode] = useState("");
    const [jsonString, setJsonString] = useState("");
    const [graphVisible, setGraphVisible] = useState(false)
    const [showJson, setShowJson] = useState(false)
    const [jsonError, setJsonError] = useState(false)

    /* Table */
    const { data } = useContext(TableContext)
    const { target } = useContext(TableContext)
    const { features } = useContext(TableContext)
    const { addResult } = useContext(TableContext)
    const [width, setWidth] = useState(0);
    const treeBoxRef = useRef<HTMLDivElement>(null)
    const [seed, setSeed] = useState(1);

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

    const handleShowJson = () => setShowJson(!showJson)

    const handleShowAnalyse = () => setShowAnalyse(true)

    const getChildren = (val: any) => _.compact(_.uniq(_.map(data, val.value)).map((ele: any) => val[ele]))

    const onShowGraphClick = () => setGraphVisible(!graphVisible)

    const getSplits = (tree: any) => _.partition(tree, ['type', 'decision'])[0].length + 1

    const initialXml = localStorage.getItem(props.xmlKey) === null ?
        '<xml xmlns="https://developers.google.com/blockly/xml"><block type="node" x="100" y="100"></block></xml>' :
        localStorage.getItem(props.xmlKey)!!;

    const clearWorkspace = () => {
        saveXML('<xml xmlns="https://developers.google.com/blockly/xml"><block type="node" x="70" y="30"></block></xml>')
        setSeed(Math.random())
    }

    useEffect(() => {
        if (treeBoxRef.current !== null) {
            setWidth(treeBoxRef.current.offsetWidth)
        }
    }, [treeBoxRef]);

    useEffect(() => {
        setSeed(Math.random())
    }, [theme.palette.mode])

    useEffect(() => {
        setSeed(Math.random())
    }, [strings.getLanguage()])

    useEffect(() => {
        try {
            JSON.parse(blockCode)
            setJsonError(false)
        } catch (e) {
            setJsonError(true)
        }
    }, [blockCode])

    function workspaceDidChange(workspace: BlocklyLib.WorkspaceSvg) {
        setJsonString(jsonGenerator.workspaceToCode(workspace));
        setBlockCode(codeGenerator.workspaceToCode(workspace));
    }

    function saveXML(xml: string) {
        localStorage.setItem(props.xmlKey, xml)
    }

    async function checkCode() {
        const json = JSON.parse(blockCode)
        console.log(json)
        var allRowsCorrect = true

        data.forEach((obj, index) => {
            const actualResult = checkRow(
                obj,
                json
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
            return strings.leaf_missing
        } else if (valueFromBlock.type === 'leaf') {
            return valueFromBlock.value
        } else if (valueFromBlock.type === 'decision') {
            return checkRow(obj, valueFromBlock)
        } else {
            return strings.node_missing
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
                    {payload[0] && payload[0].value && <Typography>actual_gain: {payload[0].value}</Typography>}
                    {payload[1] && payload[1].value && <Typography>expected_gain: {payload[1].value}</Typography>}
                </Box>
            )
        }
        return null
    }

    const Analyse = () => {
        var dt = createTree(data, target, features);
        var json = JSON.parse(blockCode)
        let blockSplits = getSplits(json)
        let id3Splits = getSplits(dt)
        return (
            <>
                <ResponsiveContainer width='90%' height={300}>
                    <BarChart
                        data={analyseData(json, dt)}
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
                {blockSplits === id3Splits ?
                    <Typography>
                        Sehr gut du hast nur genauso viele Splits verwendet wie benötigt waren, nämlich  {blockSplits}
                    </Typography> : <Typography>
                        Schade du hast leider zu viele Splits gemacht, du hast {blockSplits} Splits gemacht, hättest aber nur {id3Splits} machen müssen.
                    </Typography>}
            </>
        )
    }

    function handleAdvice() {
        console.log(JSON.parse(blockCode))
    }

    const functionalities = [
        [strings.check_code, checkCode],
        [strings.show_result, showResult],
        [strings.advice, handleAdvice],
        [strings.show_tree, onShowGraphClick],
        [strings.show_json, handleShowJson],
        [strings.clear_workspace, clearWorkspace],
    ]

    return (
        <>
            {showAnalyse && <IntroDialog title={strings.analyse_title} open={showAnalyse} steps={[Analyse()]} handleClose={handleClose} />}
            {graphVisible &&
                <Box sx={{ animation: `${scaleInVerCenter} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`, width: '100%', background: theme.palette.secondary.light, border: 1, borderRadius: 2, borderColor: theme.palette.secondary.dark }}>
                    <Tree
                        data={JSON.parse(blockCode)}
                        height={500}
                        width={width}
                        animated={true}
                        labelProp={"value"}
                        keyProp={"Id"}
                        getChildren={getChildren}
                        svgProps={{
                            className: 'custom'
                        }} />
                </Box>}
            <Box ref={treeBoxRef} sx={{ flexDirection: 'row', my: 2, flex: 1, display: 'flex', alignItems: 'end' }}>
                {functionalities.map((val: any[], index: number) =>
                    <>
                        <Button
                            key={Math.random()}
                            variant={index == 0 ? 'contained' : 'outlined'}
                            onClick={val[1]}
                            disabled={jsonError}
                            sx={{
                                height: index == 0 ? '50px' : '40px',
                                borderRadius: 25,
                                borderColor: 'primary',
                                backgroundColor: index == 0 ? 'primary' : 'transparent',
                                mx: 1,
                            }}>
                            {val[0]}
                        </Button>
                        {index == 2 && <Box sx={{ flex: 1 }} />}
                    </>
                )}
            </Box>
            <Grid2 container spacing={3}>
                <Grid2 xs={12} md={showJson ? 8 : 12}>
                    <Box sx={{ animation: `${scaleInHorLeft} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`, height: '800px', borderRadius: 2, overflow: 'hidden', border: 1, borderColor: useTheme().palette.secondary.dark }}>
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
                                theme: useTheme().palette.mode === 'dark' ? darkTheme : lightTheme,
                                grid: {
                                    spacing: 20,
                                    length: 3,
                                    colour: useTheme().palette.mode === 'dark' ? '#424242' : '#bdbdbd',
                                    snap: true,
                                },
                            }}
                        />
                        {jsonError && <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            m: 3,
                            color: 'red',
                        }}>
                            <ErrorOutlineIcon sx={{mx: 1}} />
                            <Typography>{strings.json_error}</Typography>
                        </Box>}
                    </Box>
                </Grid2>
                {showJson && <Grid2 xs={12} md={4}>
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