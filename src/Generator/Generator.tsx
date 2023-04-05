import { Typography, Box } from '@mui/material';
import { useState } from 'react';
import { Blockly } from '../Blockly';
import { level1Table } from '../Blockly/data/level1';
import { TableContext } from '../context';
import { Headline } from '../Utils/Headline';
import { useTheme } from '@mui/material/styles'
import { scaleInTop, scaleInVerTop } from '../Utils/animations';

export function Generator() {
    const theme = useTheme()
    const [rows, setRows] = useState(level1Table[1])
    const [head, setHead] = useState(level1Table[0])

    const table = {
        head: head,
        body: rows,
        addRow: () => {
            const newRow = [undefined, undefined]
            for(var i = 2; i < head.length; i++) {
                newRow.push(rows[Math.floor(Math.random() * rows.length)][i])
            }
            setRows(
                [...rows, newRow]
            )
        },
        addResult: (val: any, index: number) => {
            rows[index][0] = val
            setRows([...rows])
        }
    }

    return (
        <TableContext.Provider value={table}>
            <Box sx={{ mt: '84px' }}>
                <Box sx={{ animation: `${scaleInVerTop} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`, border: 1, borderColor: theme.palette.secondary.dark, borderRadius: 2, px: 5, pb: 5, pt: 3, mb: 10, background: theme.palette.secondary.light }}>
                <Headline variant="h4" text="Generator" />
                <Typography variant='body1'>
                    This is the Generator, here you can test your skills against the ID3 Machine Learning Algorithm. Create a Data Set and try to solve it by creating a Decision Tree.
                </Typography>
            </Box>
                <Blockly xmlKey='generatorblocks' rowsCorrectKey="generatordone" />
            </Box>
        </TableContext.Provider>
    );
}