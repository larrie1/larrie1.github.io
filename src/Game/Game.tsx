import { Typography, Box } from '@mui/material';
import { useState } from 'react';
import { Blockly } from '../Blockly'
import { level2Table } from '../Blockly/data/level1';
import { TableContext } from '../context';
import { BasicTable } from '../Utils';

export function Game() {
    const [rows, setRows] = useState(level2Table[1])

    const table = {
        head: level2Table[0],
        body: rows,
        addRow: () => {
            setRows(previousRows =>
                [...previousRows, [
                    undefined,
                    rows[Math.floor(Math.random() * rows[0].length)][1],
                    rows[Math.floor(Math.random() * rows[1].length)][2],
                    rows[Math.floor(Math.random() * rows[2].length)][3],
                    rows[Math.floor(Math.random() * rows[3].length)][4]
                ]]
            )
        }
    }

    return (
        <TableContext.Provider value={table}>
            <Box sx={{ display: 'flex', flexDirection: 'column', mt: '64px' }}>
                <Typography variant='h3'>
                    Game
                </Typography>
            </Box>
            <BasicTable />
            <Blockly />
        </TableContext.Provider>
    );
}