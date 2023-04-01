import { Button, Fab, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { BasicTable } from "./Table";
import TocIcon from '@mui/icons-material/Toc';
import { TableContext } from "../context";
import { useTheme } from '@mui/material/styles'

export function TableButton() {
    const [visible, setVisible] = useState(false)
    const theme = useTheme()

    const onClick = () => setVisible(!visible)

    return (
        <TableContext.Consumer>
            {table => {
                return (
                    <TableContext.Provider value={table}>
                        <>
                            <Fab color='primary' onClick={onClick} sx={{ position: 'fixed', bottom: 40, right: 60 }}>
                                <TocIcon />
                            </Fab>
                            {visible &&
                                <Paper
                                    variant='outlined'
                                    sx={{
                                        position: 'fixed',
                                        bottom: 110,
                                        right: 90,
                                        zIndex: 99,
                                        width: '50%',
                                        maxHeight: '70%',
                                        height: '70%',
                                        background: 'transparent',
                                        backdropFilter: `blur(20px)`,
                                        overflow: 'hidden',
                                    }}>
                                    <BasicTable />
                                </Paper>}
                        </>
                    </TableContext.Provider>
                )
            }}
        </TableContext.Consumer>
    )
}