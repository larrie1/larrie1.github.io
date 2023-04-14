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
import { createLeaf, createNode } from './blocks/node';
import { DecisionTree } from '../ID3/decision-tree';
import { strings } from '../Res/localization';

const _ = require('lodash');

export function Blockly(props: { xmlKey: string }) {
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
    const { completed } = useContext(StepperContext)
    const { activeStep } = useContext(StepperContext)

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

    const createToolBox = (data: any, target: string) => {
        const blocks = []
        const leafs = _.uniq(_.flatten(_.map(data, target)).filter((leaf: any) => leaf !== undefined))
        leafs.forEach((leaf: any, index: number) => {
            createLeaf(leaf, index)
            blocks.push({
                'kind': 'block',
                'type': 'leaf' + index,
            })
        })
        blocks.push({
            'kind': 'block',
            'type': 'node',
        })

        return {
            kind: "flyoutToolbox",
            contents: blocks,
        }
    }

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
        '<xml xmlns="https://developers.google.com/blockly/xml"><block type="node" x="100" y="100"></block></xml>' :
        localStorage.getItem(props.xmlKey)!!;

    const clearWorkspace = () => {
        saveXML('<xml xmlns="https://developers.google.com/blockly/xml"><block type="node" x="70" y="30"></block></xml>')
        setSeed(Math.random())
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
        if (allRowsCorrect && !completed[activeStep]) {
            handleSuccess()
            await new Promise(res => setTimeout(res, 1500))
            handleComplete()
        }
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
        var dt = new DecisionTree(data, target, features);
        console.log(localStorage.getItem(props.xmlKey))
        const blocks = onShowResult(dt.createTree())
        saveXML('<xml xmlns="https://developers.google.com/blockly/xml">' + blocks + '</xml>')
        setSeed(Math.random())
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
                <Button
                    variant='outlined'
                    onClick={showResult}
                    sx={{
                        borderRadius: 25,
                        borderColor: 'primary',
                        backgroundColor: 'transparent',
                        mx: 1,
                    }}>
                    {strings.show_result}
                </Button>
            </Box>
            <Grid2 container spacing={3}>
                <Grid2 xs={12} md={8}>
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
                    </Box>
                </Grid2>
                <Grid2 xs={12} md={4}>
                    <Box sx={{ animation: `${scaleInHorRight} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`, borderRadius: 2, height: '100%', width: '100%', border: 1, borderColor: useTheme().palette.secondary.dark, overflow: 'hidden' }}>
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
        </>
    );
}