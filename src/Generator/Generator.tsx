import { Typography, Box } from '@mui/material';
import { Blockly } from '../Blockly';
import { level1Table } from '../Blockly/data/level1';

export function Generator() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: '64px' }}>
            <Typography variant='h1'>
                Generator
            </Typography>
            <Blockly table={level1Table}/>
        </Box>
    );
}