import { Typography, Box, Button } from '@mui/material';
import { Blockly } from '../Blockly'
import { BasicTable, createHead, createTable, createRow } from '../Utils';

const table = createTable(
    createHead(
        'Wie ist das Wetter', 'Warm', 'Windig', 'Regen'
    ),
    [
        createRow('Schlechtes Wetter', true, true, true),
        createRow('Gutes Wetter', true, false, false),
        createRow('Gutes Wetter', true, true, false),
        createRow('Gutes Wetter', true, true, false),
        createRow('Schlechtes Wetter', true, false, true),
        createRow('Schlechtes Wetter', false, false, false),
        createRow('Schlechtes Wetter', false, true, false),
        createRow('Schlechtes Wetter', false, false, false),
    ]
)

export function createDropDown() {
    var options: string[] = ['Wie ist das Wetter', 'Warm', 'Regen', 'Windig'];
    var result: Array<string[]> = [];
    options.forEach((decision: string) => {
        result.push([decision, decision.toUpperCase()])
    })
    return result;
}

export function Game() {
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', mt: '64px' }}>
                <Typography variant='h3'>
                    Game
                </Typography>
            </Box>
            <BasicTable table={table} />
            <Blockly table={table} />
        </>
    );
}