import { Typography, Box } from '@mui/material';
import { Blockly } from '../Blockly';
import { createRow, createHead, createTable } from '../Utils';

export function Generator() {
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

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: '64px' }}>
            <Typography variant='h1'>
                Generator
            </Typography>
            <Blockly table={table}/>
        </Box>
    );
}