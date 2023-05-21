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
import SvgComponent from '../Res/Assets/logo_built_with';
import { StepperContext, TableContext } from '../context';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Tree } from 'react-tree-graph';
import { scaleInHorLeft, scaleInHorRight, scaleInVerCenter } from '../Utils/animations';
import './Graph.css'
import { useTheme } from '@mui/material/styles'
import { codeGenerator, jsonGenerator, createNode } from './blocks';
import { createTree } from './ID3/decision-tree';
import { createToolBox } from './toolbox';
import { ResponsiveContainer } from 'recharts';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { CustomDialog } from '../Utils'
import { useBlockly } from './blocklyHook'
import ExtensionIcon from '@mui/icons-material/Extension'
import ExtensionOffIcon from '@mui/icons-material/ExtensionOff'
import CodeIcon from '@mui/icons-material/Code'
import CodeOffIcon from '@mui/icons-material/CodeOff'
import { Analyse } from './analyse';
import { localizedStrings } from '../Res';

const _ = require('lodash');

export function Blockly(
    props: {
        xmlKey: string
    }
) {
    const state = useBlockly()
    const theme = useTheme()
    const [blockCode, setBlockCode] = useState("");
    const [jsonString, setJsonString] = useState("");
    const [jsonError, setJsonError] = useState(false)
    const [blockJson, setBlockJson] = useState<{ value: any, gain: any, type: string }>()
    const [loading, setLoading] = useState(true)

    /* Table */
    const { data } = useContext(TableContext)
    const { target } = useContext(TableContext)
    const { features } = useContext(TableContext)
    const { addResult } = useContext(TableContext)
    const [seed, setSeed] = useState(1)

    createNode(data, features)

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
                {showAnalyse && <Analyse data={data} target={target} features={features} blockJson={blockJson} />}
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
                )}
                <Box sx={{ flex: 1 }} />
                <MuiTooltip title={localizedStrings.show_tree}>
                    <span>
                    <Button
                        key={Math.random()}
                        onClick={state.handleTree}
                        disabled={jsonError}
                        sx={{
                            height: '40px',
                        }}>
                        {state.showTree ? <ExtensionOffIcon fontSize='large' /> : <ExtensionIcon fontSize='large' />}
                    </Button>
                    </span>
                </MuiTooltip>
                <MuiTooltip title={localizedStrings.show_json} disableFocusListener={jsonError}>
                    <span>
                    <Button
                        key={Math.random()}
                        onClick={state.handleJson}
                        disabled={jsonError}
                        sx={{
                            height: '40px',
                        }}>
                        {state.showJson ? <CodeOffIcon fontSize='large' /> : <CodeIcon fontSize='large' />}
                    </Button>
                    </span>
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
