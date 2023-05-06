import TocIcon from '@mui/icons-material/Toc';
import { Box, Fab, Paper } from "@mui/material";
import { useState } from "react";
import { BasicTable } from "./Table";
import { Rnd } from "react-rnd";

/**
 *  This Method creates a Button which can display the Table for each Level.
 *  The Table is draggable and scaleable. 
 * 
 *  @returns UI representation of a floating action button displaying the Table
 */
export function TableButton() {
    let zIndex = 90
    const [visible, setVisible] = useState(true)

    const onClick = () => setVisible(!visible)

    return (
        <>
            <Fab
                color='primary'
                onClick={onClick}
                sx={{
                    position: 'fixed',
                    bottom: 40,
                    right: 60,
                    zIndex: zIndex,
                }}>
                <TocIcon />
            </Fab>
            {visible &&
                // wrapper Box to keep position
                <Box sx={{
                    position: 'fixed',
                    zIndex: zIndex,
                    bottom: 550,
                    right: 550,
                    height: '50px',
                    width: '50px',
                }}>
                    <Rnd
                        default={{
                            x: 0,
                            y: 0,
                            width: 500,
                            height: 500,
                        }}>
                        <Paper
                            variant='outlined'
                            sx={{
                                width: '100%',
                                height: '100%',
                                backdropFilter: `blur(20px)`,
                                background: 'transparent',
                            }}>
                            <BasicTable />
                        </Paper>
                    </Rnd>
                </Box>}
        </>

    )
}