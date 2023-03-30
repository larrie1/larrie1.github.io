import { Typography, Box } from '@mui/material';
import { useState } from 'react';
import { Blockly } from '../Blockly';
import { level1Table } from '../Blockly/data/level1';
import { TableContext } from '../context';

export function Generator() {
    const [rows, setRows] = useState(level1Table[1])

    const table = {
        head: level1Table[0],
        body: rows,
        addRow: () => {
            setRows(previousRows =>
                [...previousRows, [
                    undefined,
                    rows[Math.floor(Math.random() * rows[0].length)][1],
                    rows[Math.floor(Math.random() * rows[1].length)][2],
                    rows[Math.floor(Math.random() * rows[2].length)][3]
                ]]
            )
        }
    }

    return (
        <TableContext.Provider value={table}>
            <Box sx={{ display: 'flex', flexDirection: 'column', mt: '64px' }}>
            <Typography variant='h1'>
                Generator
            </Typography>
            <Blockly />
        </Box>
        </TableContext.Provider>
    );
}