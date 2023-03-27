import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import { BlocklyWorkspace } from 'react-blockly';
import "./Blockly.css";
import { useState } from 'react';
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


export function Blockly(props: { table: [string[], any[]] }) {
    const [javascriptCode, setJavascriptCode] = useState("");
    const [jsonCode, setJsonCode] = useState("");
    const [id3Code, setId3Code] = useState("");
    var DecisionTree = require('decision-tree');

    function workspaceDidChange(workspace: BlocklyLib.WorkspaceSvg) {
        const jsonCode = jsonGenerator.workspaceToCode(workspace);
        const javascriptCode = javascriptGenerator.workspaceToCode(workspace);
        setJsonCode(jsonCode);
        setJavascriptCode(javascriptCode);
        workspace.refreshTheme()
        workspace.render()
    }
    function saveXML(xml: string) {
        localStorage.setItem('xml', xml)
    }
    const initialXml = localStorage.getItem('xml') === null ?
        '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="node" x="70" y="30"><field name="Node"></field></block></xml>' :
        localStorage.getItem('xml')!!;

    const clearWorkspace = () => {
        saveXML('<xml xmlns="http://www.w3.org/1999/xhtml"><block type="node" x="70" y="30"><field name="node"></field></block></xml>')
    }

    function checkCode() {
        const json = JSON.parse(javascriptCode.substring(0, javascriptCode.length - 2))
        console.log(json)

        const header = props.table[0]
        var dt = new DecisionTree(training_data, header[0], header.slice(1, header.length + 1));
        setId3Code(JSON.stringify(dt.toJSON()))

        props.table[1].forEach((row, index) => {
            const expectedResult = row[0] === "Gutes Wetter" ? true : false
            const actualResult = checkRow(
                row,
                header,
                json
            )
            console.log(index + " Row:")
            console.log("Expected Result: " + expectedResult)
            console.log("Acutal Result: " + actualResult)
        })
    }

    function checkRow(row: any[], header: string[], json: any): boolean {
        const index = header.findIndex((value) => value.toUpperCase() === json.decision)
        if (index === -1) {
            console.log("undefined index")
            return false
        }
        if (row[index]) {
            if (json.top !== null && json.top !== undefined && typeof(json.top) !== "boolean") {
                return checkRow(row, header, json.top)
            } else {
                return json.top === null ? undefined : json.top
            }
        } else {
            if (json.bottom !== null && json.bottom !== undefined && typeof(json.bottom) !== "boolean") {
                return checkRow(row, header, json.bottom)
            } else {
                return json.bottom === null ? undefined : json.bottom
            }
        }
    }

    return (
        <>
            <Box sx={{ flexDirection: 'row', my: 2, flex: 1, display: 'flex' }}>
                <Button
                    variant='outlined'
                    onClick={() => {}}
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