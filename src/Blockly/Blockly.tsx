import CancelIcon from '@mui/icons-material/Cancel'
import SvgComponent from '../Res/Assets/logo_built_with'
import Grid2 from '@mui/material/Unstable_Grid2'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import ExtensionIcon from '@mui/icons-material/Extension'
import ExtensionOffIcon from '@mui/icons-material/ExtensionOff'
import CodeIcon from '@mui/icons-material/Code'
import CodeOffIcon from '@mui/icons-material/CodeOff'
import JavascriptIcon from '@mui/icons-material/Javascript';
import "./Blockly.css"
import { Box, Button, CircularProgress, Tooltip as MuiTooltip, SvgIcon, Typography, Card } from '@mui/material'
import { BlocklyWorkspace } from 'react-blockly'
import { darkTheme, lightTheme } from './blocklyTheme'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atelierCaveDark, atelierCaveLight } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript'
import { Tree } from './tree/Tree'
import { scaleInHorLeft, scaleInHorRight } from '../Utils/animations'
import { useTheme } from '@mui/material/styles'
import { createToolBox } from './toolbox'
import { CustomDialog } from '../Utils'
import { useBlockly } from './blocklyHook'
import { Analyse } from './analyse'
import { localizedStrings } from '../Res'
import { Hint } from './hint/hint'

// needed for the syntaxhighlighter to highlight js code
SyntaxHighlighter.registerLanguage('javascript', js)

/**
 * This Method creates the Blockly Workspace. It has also the control of the Tree, Hints and Code. 
 * Those will be also displayed here. If it doesn't have enough information to display the Workspace
 * without an error it will display a Loadingindicator. 
 * 
 * @param props xmlKey: Key to retrieve the stored progress within the localstorage
 * @returns UI representation of the Blockly workspace
 */
export function Blockly(
    props: {
        xmlKey: string
    }
) {
    const state = useBlockly(props.xmlKey)
    const theme = useTheme()

    // Loading if not enough Information is provided
    if (state.loading) {
        return <Box
            sx={{
                width: '100%',
                height: '1000px',
            }}
        >
            <CircularProgress
                sx={{
                    position: 'absolute',
                    height: '100px',
                    width: '100px',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    m: 'auto',
                }} />
        </Box>
    }

    // Actual Workspace
    return (
        <>
            {/* Analysedialog */}
            <CustomDialog
                handleClose={state.handleClose}
                bottomNavigation={undefined}
                open={state.showAnalyse}
                title={localizedStrings.analyse_title}>
                {
                    state.showAnalyse &&
                    <Analyse
                        data={state.training_data}
                        target={state.target}
                        features={state.features}
                        blockJson={state.blockJson}
                    />
                }
            </CustomDialog>
            {/* Hint & Tree */}
            {
                state.showTree &&
                <Grid2 container spacing={2} sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Grid2 md={12} lg={6} >
                        <Hint
                            data={state.training_data}
                            features={state.features}
                            target={state.target}
                            blockJson={state.blockJson}
                        />
                    </Grid2>
                    <Grid2 md={12} lg={6}>
                        <Tree
                            data={state.training_data}
                            blockJson={state.blockJson}
                            target={state.target}
                        />
                    </Grid2>
                </Grid2>
            }
            <Box
                sx={{
                    flexDirection: 'row',
                    my: 2,
                    flex: 1,
                    display: 'flex',
                    alignItems: 'end',
                }}>
                {/* Check Code & Show Solution */}
                {
                    state.functionalities.map(
                        (val: any[], index: number) =>
                            <Button
                                key={Math.random()}
                                variant={index === 0 ? 'contained' : 'outlined'}
                                onClick={val[1]}
                                disabled={state.jsonError}
                                sx={{
                                    height: index === 0 ? '50px' : '40px',
                                    mx: 1,
                                }}
                            >
                                {val[0]}
                            </Button>
                    )
                }
                <Box sx={{ flex: 1 }} />
                {/* Button to disable/enable Tree and Hint */}
                <MuiTooltip title={localizedStrings.show_tree}>
                    <span>
                        <Button
                            key={Math.random()}
                            onClick={state.handleTree}
                            disabled={state.jsonError}
                            sx={{
                                height: '40px',
                            }}>
                            {
                                state.showTree ?
                                    <ExtensionOffIcon fontSize='large' /> :
                                    <ExtensionIcon fontSize='large' />
                            }
                        </Button>
                    </span>
                </MuiTooltip>
                {/* Button to disable/enable Code */}
                <MuiTooltip title={localizedStrings.show_json}>
                    <span>
                        <Button
                            key={Math.random()}
                            onClick={state.handleJson}
                            disabled={state.jsonError}
                            sx={{
                                height: '40px',
                            }}>
                            {
                                state.showJson ?
                                    <CodeOffIcon fontSize='large' /> :
                                    <CodeIcon fontSize='large' />
                            }
                        </Button>
                    </span>
                </MuiTooltip>
                {/* Button removing the progress of the workspace */}
                <MuiTooltip title={localizedStrings.clear_workspace}>
                    <Button
                        onClick={state.clearWorkspace}
                        sx={{
                            height: '40px',
                        }}>
                        <CancelIcon fontSize='large' />
                    </Button>
                </MuiTooltip>
            </Box>
            <Grid2 container spacing={2}>
                <Grid2 xs={12} md={state.showJson ? 8 : 12}>
                    <Card
                        sx={{
                            animation: `${scaleInHorLeft} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
                            height: '800px',
                            overflow: 'hidden',
                        }}>
                        {/* Workspace from Blockly by Module: https://github.com/nbudin/react-blockly */}
                        <BlocklyWorkspace
                            key={state.seed}
                            className='fill-height'
                            toolboxConfiguration={createToolBox(state.training_data, state.target)}
                            initialXml={state.initialXml}
                            onXmlChange={state.saveXML}
                            onWorkspaceChange={state.workspaceDidChange}
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
                        {/* Built with Blockly Logo */}
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
                        {/* Error message if two blocks not connected */}
                        {
                            state.jsonError &&
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                position: 'absolute',
                                top: 0,
                                right: 10,
                                m: 3,
                                color: 'red',
                            }}
                            >
                                <ErrorOutlineIcon sx={{ mx: 1 }} />
                                <Typography>{localizedStrings.json_error}</Typography>
                            </Box>
                        }
                    </Card>
                </Grid2>
                {state.showJson &&
                    <Grid2 xs={12} md={4}>
                        <Card
                            sx={{
                                animation: `${scaleInHorRight} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
                                width: '100%',
                                minHeight: '100%',
                                maxHeight: '300px',
                                overflow: 'auto',
                                pt: 1,
                            }}>
                            <JavascriptIcon
                                sx={{
                                    position: 'absolute',
                                    top: 10,
                                    right: 10,
                                    color: 'primary.main',
                                    border: 1,
                                    borderColor: 'secondary.dark',
                                    borderRadius: 2,
                                }}
                            />
                            {/* Code highlighter Module by: https://github.com/react-syntax-highlighter/react-syntax-highlighter */}
                            <SyntaxHighlighter
                                className='fill-height'
                                wrapLongLines={false}
                                language="javascript"
                                showLineNumbers={true}
                                style={theme.palette.mode === 'dark' ? atelierCaveDark : atelierCaveLight}
                            >
                                {state.jsonString}
                            </SyntaxHighlighter>
                        </Card>
                    </Grid2>}
            </Grid2>
        </>
    );
}
