import { Box, Button, Fab, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { BasicTable } from "./Table";
import TocIcon from '@mui/icons-material/Toc';
import { TableContext } from "../context";
import { useTheme } from '@mui/material/styles'
import { Rnd } from "react-rnd";

export function TableButton() {
    const [visible, setVisible] = useState(true)
    const theme = useTheme()

    const onClick = () => setVisible(!visible)

    return (
        <TableContext.Consumer>
            {table => {
                return (
                    <TableContext.Provider value={table}>
                        <>
                            <Fab color='primary' onClick={onClick} sx={{ position: 'fixed', bottom: 40, right: 60, zIndex: 90 }}>
                                <TocIcon />
                            </Fab>
                            {visible &&
                                <Box sx={{position: 'fixed', zIndex: 90, bottom: 550, right: 550, height: '50px', width: '50px'}}>
                                    <Rnd 
                                style={{
                                    position: 'fixed',
                                    zIndex: 99,
                                    backdropFilter: `blur(20px)`,
                                }}
                                default={{
                                    x: 0,
                                    y: 0,
                                    width:  500,
                                    height: 500,
                                }}>
                                    <Paper
                                        variant='outlined'
                                        sx={{
                                            width: '100%', // 50
                                            height: '100%', // 60
                                            background: 'transparent',
                                        }}>
                                        <BasicTable />
                                    </Paper>
                                </Rnd>
                                    </Box>}
                        </>
                    </TableContext.Provider>
                )
            }}
        </TableContext.Consumer>
    )
}