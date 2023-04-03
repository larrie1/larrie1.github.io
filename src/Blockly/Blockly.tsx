import { Box, Button, keyframes } from '@mui/material';
import { BlocklyWorkspace } from 'react-blockly';
import "./Blockly.css";
import { useContext, useState } from 'react';
import { darkTheme, lightTheme } from './blocklyTheme';
import BlocklyLib from 'blockly';
import { toolboxCategories } from './toolbox';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atelierCaveDark, atelierCaveLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import './blocks/';
import './generators';
import { jsonGenerator } from './generators/json_generator';
import { training_data } from './data/level1';
import { TableContext } from '../context';
import { codeGenerator } from './generators/code_generator';
import Grid2 from '@mui/material/Unstable_Grid2';
import json from 'react-syntax-highlighter/dist/cjs/languages/hljs/json'
import { Tree } from 'react-tree-graph';
import { bounce_in_fwd, bounce_in_left, bounce_in_right } from '../Utils/animations';
import './Graph.css'
import { useTheme } from '@mui/material/styles'


export function Blockly() {
    const [blockJSON, setBlockJSON] = useState("");
    const [jsonString, setJsonString] = useState("");
    const [graphVisible, setGraphVisible] = useState(false)
    const [id3Code, setId3Code] = useState("");
    const { body } = useContext(TableContext)
    const { head } = useContext(TableContext)
    const { addResult } = useContext(TableContext)
    var DecisionTree = require('decision-tree');
    const theme = useTheme()

    const onShowGraphClick = () => setGraphVisible(!graphVisible)

    function workspaceDidChange(workspace: BlocklyLib.WorkspaceSvg) {
        setJsonString(jsonGenerator.workspaceToCode(workspace));
        setBlockJSON(codeGenerator.workspaceToCode(workspace));
        //workspace.refreshTheme()
        //workspace.render()
    }
    function saveXML(xml: string) {
        localStorage.setItem('xml', xml)
    }
    const initialXml = localStorage.getItem('xml') === null ?
        '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="node" x="70" y="30"></block></xml>' :
        localStorage.getItem('xml')!!;

    const clearWorkspace = () => {
        saveXML('<xml xmlns="http://www.w3.org/1999/xhtml"><block type="node" x="70" y="30"></block></xml>')
    }

    function checkCode() {
        const json = JSON.parse(blockJSON)
        console.log(json)

        var dt = new DecisionTree(training_data, head[0], head.slice(1, head.length + 1));
        setId3Code(JSON.stringify(dt.toJSON()))
        console.log(dt.toJSON())

        body.forEach((row, index) => {
            const actualResult = checkRow(
                row.slice(1, row.length),
                head,
                json
            )
            addResult(actualResult, index)
            console.log((index + 1) + " Row:")
            console.log("Expected Result: " + (row[0] || "undefined"))
            console.log("Acutal Result: " + actualResult)
        })
    }

    function checkRow(row: any[], head: string[], block: any): any {
        const valueFromTable = row[+block.Decision].toString()
        const valueFromBlock = block[valueFromTable]
        if (typeof (valueFromBlock) === 'string' || typeof (valueFromBlock) === 'boolean' || typeof (valueFromBlock) === 'number') {
            return block[valueFromTable]
        } else if (valueFromBlock === undefined) {
            return "Decisions missing"
        } else if (valueFromBlock === null) {
            return "Leaf is missing"
        } else {
            return checkRow(row, head, block[valueFromTable])
        }
    }

    function getChildren(val: any) {
        const children: any[] = []
        const decisionIndex = +val.Decision
        const decisions: any[] = []
        const choices: any[] = []
        for (var i = 0; i < body.length; i++) {
            const child = body[i][decisionIndex + 2]
            if (val[child] !== null && val[child] !== undefined) {
                if ((typeof(val[child]) === 'string' || typeof(val[child]) === 'boolean' || typeof(val[child]) === 'number') && !decisions.includes(val[child])) {
                    choices.push(child)
                    decisions.push(val[child])
                    children.push({ 'Decision': val[child].toString() })
                } else if (!choices.includes(child)) {
                    choices.push(child)
                    children.push(val[child])
                }
            }
        }
        if (children.length > 0) return children
    }

    //const json = JSON.parse(blockJSON)
    return (
        <>
            {graphVisible && <Box sx={{ animation: `${bounce_in_fwd} 1.1s both`, background: theme.palette.secondary.light, border: 1, borderRadius: 2, borderColor: theme.palette.secondary.dark }}>
                <Tree
                    data={JSON.parse(blockJSON)}
                    height={400}
                    width={950}
                    animated={true}
                    labelProp={"Decision"}
                    keyProp={"Decision"}
                    getChildren={getChildren}
                    svgProps={{
                        className: 'custom'
                    }} />
            </Box>}
            <Box sx={{ flexDirection: 'row', my: 2, flex: 1, display: 'flex' }}>
                <Button
                    variant='outlined'
                    onClick={checkCode}
                    sx={{
                        borderRadius: 25,
                        borderColor: 'primary',
                        backgroundColor: 'transparent',
                        mx: 1,
                    }}>
                    Check Code
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
                    Clear Workspace
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
                    Show Tree Graph
                </Button>
            </Box>
            <Grid2 container spacing={3}>
                <Grid2 xs={12} md={8}>
                    <Box sx={{ animation: `${bounce_in_left} 1.1s both`, height: '800px', borderRadius: 2, overflow: 'hidden', border: 1, borderColor: useTheme().palette.secondary.dark }}>
                        <BlocklyWorkspace
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
                        <Box sx={{ animation: `${bounce_in_right} 1.1s both`, borderRadius: 2, height: '100%', width: '100%', border: 1, borderColor: useTheme().palette.secondary.dark, overflow: 'auto' }}>
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
                        <Box sx={{ animation: `${bounce_in_right} 1.1s both`, borderRadius: 2, height: '100%', width: '100%', border: 1, borderColor: useTheme().palette.secondary.dark, overflow: 'auto' }}>
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