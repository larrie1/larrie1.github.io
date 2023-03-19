import { Typography, Box, useTheme } from '@mui/material';
import { BlocklyWorkspace } from 'react-blockly';
import "./Game.css";
import './custom_blocks'
import { useState } from 'react';
import { darkTheme, lightTheme } from '../blocklyTheme';
import Blockly from 'blockly';
import {javascriptGenerator} from 'blockly/javascript'

export function Game() {
    const toolboxCategories = {
        kind: "categoryToolbox",
        contents: [
            {
                kind: "category",
                name: "Leafs",
                colour: "#5C81A6",
                contents: [
                    {
                        kind: "block",
                        type: "math_number",
                    },
                    {
                        kind: "block",
                        type: "logic_boolean",
                    },
                    {
                        kind: "block",
                        type: "text",
                    },
                ],
            },
            {
                kind: "category",
                name: "Tree",
                colour: "#5CA699",
                contents: [
                    {
                        kind: "block",
                        type: "stamm",
                    },
                    {
                        kind: "block",
                        type: "knoten",
                    },
                ],
            },
        ],
    };
    const [xml, setXml] = useState("");
    const [javascriptCode, setJavascriptCode] = useState("");
    function workspaceDidChange(workspace: Blockly.WorkspaceSvg) {
        const code = javascriptGenerator.workspaceToCode(workspace);
        setJavascriptCode(code);
      }
    function saveXML(xml: string) {
        setXml(xml)
        localStorage.setItem('xml', xml)
    }
    const initialXml = localStorage.getItem('xml') === null ? 
    '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="text" x="70" y="30"><field name="TEXT"></field></block></xml>' : 
    localStorage.getItem('xml')!!;

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', mt: '50px' }}>
                <Typography variant='h1'>
                    Game
                </Typography>
            </Box>
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
        </>
    );
}