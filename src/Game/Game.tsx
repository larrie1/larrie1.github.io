import { Typography, Box, Button } from '@mui/material';
import { Blockly } from '../Blockly'
import { BasicTable, Row, Table, Head, createHead, createTable, createRow } from '../Utils';

const table = createTable(
    createHead(
        'Wie ist das Wetter', 'Temperatur', 'Regen', 'Windig'
    ),
    [
        createRow('Schlechtes Wetter', 15, true, true),
        createRow('Gutes Wetter', 25, false, false),
        createRow('Gutes Wetter', 25, true, false),
        createRow('Gutes Wetter', 20, true, false),
        createRow('Schlechtes Wetter', 18, false, true),
        createRow('Schlechtes Wetter', 10, false, false),
        createRow('Schlechtes Wetter', 0, true, false),
        createRow('Schlechtes Wetter', 35, false, false),
    ]
)

export function Game() {
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', mt: '64px' }}>
                <Typography variant='h3'>
                    Game
                </Typography>
            </Box>
            <BasicTable table={table} />
            <Blockly />
        </>
    );
}