import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import { BlocklyWorkspace } from 'react-blockly';
import "./Blockly.css";
import { useContext, useState } from 'react';
import { darkTheme, lightTheme } from './blocklyTheme';
import BlocklyLib from 'blockly';
import { javascriptGenerator } from 'blockly/javascript'
import { toolboxCategories } from './toolbox';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atelierCaveDark, atelierCaveLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import './blocks/';
import './generators';
import { jsonGenerator } from './generators/json_generator';
import { training_data } from './data/level1';
import { TableContext } from '../context';


export function Blockly() {
    const [javascriptCode, setJavascriptCode] = useState("");
    const [jsonCode, setJsonCode] = useState("");
    const [id3Code, setId3Code] = useState("");
    const { body } = useContext(TableContext)
    const { head } = useContext(TableContext)
    var DecisionTree = require('decision-tree');

    function workspaceDidChange(workspace: BlocklyLib.WorkspaceSvg) {
        const jsonCode = jsonGenerator.workspaceToCode(workspace);
        const javascriptCode = javascriptGenerator.workspaceToCode(workspace);
        setJsonCode(jsonCode);
        setJavascriptCode(javascriptCode.substring(0, javascriptCode.length - 2));
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
    function check() {
        console.log(JSON.parse(javascriptCode))
    }

    function checkCode() {
        const json = JSON.parse(javascriptCode)
        console.log(json)

        var dt = new DecisionTree(training_data, head[0], head.slice(1, head.length + 1));
        setId3Code(JSON.stringify(dt.toJSON()))

        body.forEach((row, index) => {
            const actualResult = checkRow(
                row.slice(1, row.length),
                head,
                json
            )
            console.log((index + 1) + " Row:")
            console.log("Expected Result: " + (row[0] || "undefined"))
            console.log("Acutal Result: " + actualResult)
        })
    }

    function checkRow(row: any[], head: string[], block: any): any {
        const valueFromTable = row[+block.Decision].toString()
        const valueFromBlock = block[valueFromTable]
        if (typeof(valueFromBlock) === 'string' || typeof(valueFromBlock) === 'boolean' || typeof(valueFromBlock) === 'number') {
            return block[valueFromTable]
        } else if (valueFromBlock === undefined) {
            return "Decisions missing"
        } else if (valueFromBlock === null) {
            return "Leaf is missing"
        } else {
            return checkRow(row, head, block[valueFromTable])
        }
    }

    return (
        <>
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
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Box sx={{ height: '800px', borderRadius: 25, mr: '20px', flex: 2 }}>
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
                                colour: "#000",
                                snap: true,
                            },
                        }}
                    />
                </Box>
                <Box sx={{ flexDirection: 'column', display: 'flex', flex: 1 }}>
                    <Box sx={{ borderRadius: 25, height: '400px', width: '500px' }}>
                        <SyntaxHighlighter
                            className='fill-height'
                            wrapLongLines={true}
                            language="javascript"
                            style={useTheme().palette.mode === 'dark' ? atelierCaveDark : atelierCaveLight}
                        >
                            {id3Code}
                        </SyntaxHighlighter>
                    </Box>
                    <Box sx={{ height: '20px' }} />
                    <Box sx={{ borderRadius: 25, height: '400px', width: '500px' }}>
                        <SyntaxHighlighter
                            className='fill-height'
                            wrapLongLines={true}
                            language="javascript"
                            style={useTheme().palette.mode === 'dark' ? atelierCaveDark : atelierCaveLight}
                        >
                            {jsonCode}
                        </SyntaxHighlighter>
                    </Box>
                </Box>
            </Box>
        </>
    );
}