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
import { JSONTree } from 'react-json-tree';
import { Table } from '../Utils/Table';


export function Blockly(props: { table: Table }) {
    const [javascriptCode, setJavascriptCode] = useState("");
    const [jsonCode, setJsonCode] = useState("");
    const [resultCode, setResultCode] = useState("");

    function workspaceDidChange(workspace: BlocklyLib.WorkspaceSvg) {
        const jsonCode = jsonGenerator.workspaceToCode(workspace);
        const javascriptCode = javascriptGenerator.workspaceToCode(workspace);
        setJsonCode(jsonCode);
        setJavascriptCode(javascriptCode);
    }
    function saveXML(xml: string) {
        localStorage.setItem('xml', xml)
    }
    const initialXml = localStorage.getItem('xml') === null ?
        '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="stamm" x="70" y="30"><field name="Stamm"></field></block></xml>' :
        localStorage.getItem('xml')!!;

    const clearWorkspace = () => saveXML(initialXml)

    function checkCode() {
        const json = JSON.parse(javascriptCode)
        return (
            <JSONTree data={json} />
        )
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
                            {javascriptCode}
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