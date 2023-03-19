import { useTheme } from '@mui/material';
import { BlocklyWorkspace } from 'react-blockly';
import "./Blockly.css";
import './custom_blocks'
import { useState } from 'react';
import { darkTheme, lightTheme } from './blocklyTheme';
import BlocklyLib from 'blockly';
import { javascriptGenerator } from 'blockly/javascript'
import { toolboxCategories } from './toolbox';

export function Blockly() {
    const [xml, setXml] = useState("");
    const [javascriptCode, setJavascriptCode] = useState("");
    function workspaceDidChange(workspace: BlocklyLib.WorkspaceSvg) {
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
        <BlocklyWorkspace
            className='fill-height'
            toolboxConfiguration={toolboxCategories}
            initialXml={initialXml}
            onXmlChange={saveXML}
            onWorkspaceChange={workspaceDidChange}
            workspaceConfiguration={{
                theme: darkTheme,
                grid: {
                    spacing: 20,
                    length: 3,
                    colour: "#000",
                    snap: true,
                },
            }}
        />
    );
}