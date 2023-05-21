import CancelIcon from '@mui/icons-material/Cancel'
import SvgComponent from '../Res/Assets/logo_built_with'
import Grid2 from '@mui/material/Unstable_Grid2'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import ExtensionIcon from '@mui/icons-material/Extension'
import ExtensionOffIcon from '@mui/icons-material/ExtensionOff'
import CodeIcon from '@mui/icons-material/Code'
import CodeOffIcon from '@mui/icons-material/CodeOff'
import './Graph.css'
import "./Blockly.css"
import { Box, Button, CircularProgress, Tooltip as MuiTooltip, SvgIcon, Typography, Card } from '@mui/material'
import { BlocklyWorkspace } from 'react-blockly'
import { darkTheme, lightTheme } from './blocklyTheme'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atelierCaveDark, atelierCaveLight } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { Tree } from './tree/Tree'
import { scaleInHorLeft, scaleInHorRight, scaleInVerCenter } from '../Utils/animations'
import { useTheme } from '@mui/material/styles'
import { createToolBox } from './toolbox'
import { CustomDialog } from '../Utils'
import { useBlockly } from './blocklyHook'
import { Analyse } from './analyse'
import { localizedStrings } from '../Res'

export function Blockly(
    props: {
        xmlKey: string
    }
) {
    const state = useBlockly(props.xmlKey)
    const theme = useTheme()

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

    return (
        <>
            <CustomDialog
                handleClose={state.handleClose}
                bottomNavigation={undefined}
                open={state.showAnalyse}
                title={localizedStrings.analyse_title}>
                {
                    state.showAnalyse &&
                    <Analyse
                        data={state.data}
                        target={state.target}
                        features={state.features}
                        blockJson={state.blockJson}
                    />
                }
            </CustomDialog>
            {
                state.showTree &&
                <Card
                    sx={{
                        animation: `${scaleInVerCenter} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
                        width: '100%',
                    }}
                >
                    {
                        state.jsonError ?
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    color: 'red',
                                    height: '500px',
                                    width: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <ErrorOutlineIcon sx={{ mx: 1 }} />
                                <Typography>{localizedStrings.json_error}</Typography>
                            </Box> :
                            <Tree data={state.data} blockJson={state.blockJson} />
                    }
                </Card>
            }
            <Box
                sx={{
                    flexDirection: 'row',
                    my: 2,
                    flex: 1,
                    display: 'flex',
                    alignItems: 'end',
                }}>
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
            <Grid2 container spacing={3}>
                <Grid2 xs={12} md={state.showJson ? 8 : 12}>
                    <Card
                        sx={{
                            animation: `${scaleInHorLeft} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
                            height: '800px',
                            overflow: 'hidden',
                        }}>
                        <BlocklyWorkspace
                            key={state.seed}
                            className='fill-height'
                            toolboxConfiguration={createToolBox(state.data, state.target)}
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
                        {
                            state.jsonError &&
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                position: 'absolute',
                                top: 0,
                                right: 80,
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
                                height: '100%',
                                width: '100%',
                                overflow: 'hidden',
                            }}>
                            <SyntaxHighlighter
                                className='fill-height'
                                wrapLongLines={true}
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
