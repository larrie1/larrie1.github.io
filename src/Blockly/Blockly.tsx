import { Box, Button } from '@mui/material';
import { BlocklyWorkspace } from 'react-blockly';
import "./Blockly.css";
import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { darkTheme, lightTheme } from './blocklyTheme';
import BlocklyLib from 'blockly';
import { toolboxCategories } from './toolbox';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atelierCaveDark, atelierCaveLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import './blocks/';
import './generators';
import { jsonGenerator } from './generators/json_generator';
import { StepperContext, TableContext } from '../context';
import { codeGenerator } from './generators/code_generator';
import Grid2 from '@mui/material/Unstable_Grid2';
import json from 'react-syntax-highlighter/dist/cjs/languages/hljs/json'
import { Tree } from 'react-tree-graph';
import { scaleInHorLeft, scaleInHorRight, scaleInVerCenter } from '../Utils/animations';
import './Graph.css'
import { useTheme } from '@mui/material/styles'
import { createNode } from './blocks/node';
import { DecisionTree } from '../ID3/decision-tree';
import { strings } from '../Res/localization';



export function Blockly(props: { xmlKey: string, rowsCorrectKey: string }) {
    const [blockJSON, setBlockJSON] = useState("");
    const [jsonString, setJsonString] = useState("");
    const [graphVisible, setGraphVisible] = useState(false)
    const [id3Code, setId3Code] = useState("");
    const { data } = useContext(TableContext)
    const { target } = useContext(TableContext)
    const { features } = useContext(TableContext)
    const { addResult } = useContext(TableContext)
    const theme = useTheme()
    const [width, setWidth] = useState(0);
    const treeBoxRef = useRef<HTMLDivElement>(null)
    const [seed, setSeed] = useState(1);
    const { handleComplete } = useContext(StepperContext)
    const { handleSuccess } = useContext(StepperContext)
    const [startAnimation, setStartAnimation] = useState(false)

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

    createNode(data, target, features)

    const onShowGraphClick = () => setGraphVisible(!graphVisible)

    function workspaceDidChange(workspace: BlocklyLib.WorkspaceSvg) {
        setJsonString(jsonGenerator.workspaceToCode(workspace));
        setBlockJSON(codeGenerator.workspaceToCode(workspace));
    }
    function saveXML(xml: string) {
        localStorage.setItem(props.xmlKey, xml)
    }
    const initialXml = localStorage.getItem(props.xmlKey) === null ?
        '<xml xmlns="https://developers.google.com/blockly/xml"><block type="node" x="70" y="30"></block></xml>' :
        localStorage.getItem(props.xmlKey)!!;

    const clearWorkspace = () => {
        saveXML('<xml xmlns="https://developers.google.com/blockly/xml"><block type="node" x="70" y="30"></block></xml>')
    }

    const showXML = () => {
        localStorage.setItem(props.xmlKey, '<xml xmlns="https://developers.google.com/blockly/xml"><block type="node" x="10" y="10"><field name="DECISION">2</field><field name="CHOICE0">false</field><field name="CHOICE1">true</field><value name="0"><block type="node"><field name="DECISION">0</field><field name="CHOICE0">true</field><field name="CHOICE1">false</field><value name="0"><block type="text"><field name="TEXT">Gutes Wetter</field></block></value><value name="1"><block type="text"><field name="TEXT">Schlechtes Wetter</field></block></value></block></value><value name="1"><block type="text"><field name="TEXT">Schlechtes Wetter</field></block></value></block></xml>')
    }

    async function checkCode() {
        const json = JSON.parse(blockJSON)
        var allRowsCorrect = true
        console.log(json)

        var dt = new DecisionTree(data, target, features);
        setId3Code(JSON.stringify(dt.createTree()))

        data.forEach((obj, index) => {
            const actualResult = checkRow(
                obj,
                json
            )
            addResult(actualResult, index)
            if (actualResult !== obj[target] && obj[target] !== undefined) allRowsCorrect = false
            console.log((index + 1) + " Row:")
            console.log("Expected Result: " + (obj[target] || "undefined"))
            console.log("Acutal Result: " + actualResult)
        })
        if (allRowsCorrect && localStorage.getItem(props.rowsCorrectKey) !== 'true') {
            handleSuccess()
            await new Promise(res => setTimeout(res, 1500))
            handleComplete()
        }
        localStorage.setItem(props.rowsCorrectKey, allRowsCorrect.toString())
    }

    function checkRow(obj: any, block: any): any {
        const valueFromTable = obj[block.Decision]
        const valueFromBlock = block[valueFromTable]
        if (typeof (valueFromBlock) === 'string' || typeof (valueFromBlock) === 'boolean' || typeof (valueFromBlock) === 'number') {
            return valueFromBlock
        } else if (valueFromBlock === undefined) {
            return "Decisions missing"
        } else if (valueFromBlock === null) {
            return "Leaf is missing"
        } else {
            return checkRow(obj, valueFromBlock)
        }
    }

    function getChildren(val: any) {
        const children: any[] = []
        const decisions: any[] = []
        const choices: any[] = []
        for (var i = 0; i < data.length; i++) {
            const child = data[i][val.Decision]
            const blockChild = val[child]
            if (blockChild !== null && blockChild !== undefined) {
                if ((typeof (blockChild) === 'string' || typeof (blockChild) === 'boolean' || typeof (blockChild) === 'number') && !decisions.includes(blockChild)) {
                    choices.push(child)
                    decisions.push(blockChild)
                    children.push({ 'Decision': blockChild.toString(), 'Id': Math.random().toString(16).slice(2) })
                } else if (!choices.includes(child)) {
                    choices.push(child)
                    blockChild['Id'] = Math.random().toString(16).slice(2)
                    children.push(blockChild)
                }
            }
        }
        if (children.length > 0) return children
    }

    return (
        <>
            {graphVisible &&
                <Box sx={{ animation: `${scaleInVerCenter} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`, width: '100%', background: theme.palette.secondary.light, border: 1, borderRadius: 2, borderColor: theme.palette.secondary.dark }}>
                    {<Tree
                        data={JSON.parse(blockJSON)}
                        height={500}
                        width={width}
                        animated={true}
                        labelProp={"Decision"}
                        keyProp={"Id"}
                        getChildren={getChildren}
                        svgProps={{
                            className: 'custom'
                        }} />}
                </Box>}
            <Box ref={treeBoxRef} sx={{ flexDirection: 'row', my: 2, flex: 1, display: 'flex' }}>
                <Button
                    variant='outlined'
                    onClick={checkCode}
                    sx={{
                        borderRadius: 25,
                        borderColor: 'primary',
                        backgroundColor: 'transparent',
                        mx: 1,
                    }}>
                    {strings.check_code}
                </Button>
                <Button
                    variant='outlined'
                    onClick={clearWorkspace}
                    sx={{
                        borderRadius: 25,
                        borderColor: 'primary',
                        backgroundColor: 'transparent',
                        mx: 1,
                    }}>
                    {strings.clear_workspace}
                </Button>
                <Button
                    variant='outlined'
                    onClick={onShowGraphClick}
                    sx={{
                        borderRadius: 25,
                        borderColor: 'primary',
                        backgroundColor: 'transparent',
                        mx: 1,
                    }}>
                    {strings.show_tree}
                </Button>
            </Box>
            <Grid2 container spacing={3}>
                <Grid2 xs={12} md={8}>
                    <Box sx={{ animation: `${scaleInHorLeft} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`, height: '800px', borderRadius: 2, overflow: 'hidden', border: 1, borderColor: useTheme().palette.secondary.dark }}>
                        <BlocklyWorkspace
                            key={seed}
                            className='fill-height'
                            toolboxConfiguration={toolboxCategories}
                            initialXml={initialXml}
                            onXmlChange={saveXML}
                            onWorkspaceChange={workspaceDidChange}
                            workspaceConfiguration={{
                                theme: useTheme().palette.mode === 'dark' ? darkTheme : lightTheme,
                                grid: {
                                    spacing: 20,
                                    length: 3,
                                    colour: useTheme().palette.mode === 'dark' ? '#424242' : '#bdbdbd',
                                    snap: true,
                                },
                            }}
                        />
                    </Box>
                </Grid2>
                <Grid2 container xs={12} md={4}>
                    <Grid2 xs={12}>
                        <Box sx={{ animation: `${scaleInHorRight} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`, borderRadius: 2, height: '100%', width: '100%', border: 1, borderColor: useTheme().palette.secondary.dark, overflow: 'auto' }}>
                            <SyntaxHighlighter
                                className='fill-height'
                                wrapLongLines={true}
                                language={json}
                                style={useTheme().palette.mode === 'dark' ? atelierCaveDark : atelierCaveLight}
                            >
                                {id3Code}
                            </SyntaxHighlighter>
                        </Box>
                    </Grid2>
                    <Grid2 xs={12}>
                        <Box sx={{ animation: `${scaleInHorRight} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`, borderRadius: 2, height: '100%', width: '100%', border: 1, borderColor: useTheme().palette.secondary.dark, overflow: 'auto' }}>
                            <SyntaxHighlighter
                                className='fill-height'
                                wrapLongLines={true}
                                language={json}
                                style={useTheme().palette.mode === 'dark' ? atelierCaveDark : atelierCaveLight}
                            >
                                {jsonString}
                            </SyntaxHighlighter>
                        </Box>
                    </Grid2>
                </Grid2>
            </Grid2>
        </>
    );
}