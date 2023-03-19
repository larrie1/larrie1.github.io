import { Typography, Box } from '@mui/material';
import { Blockly } from '../Blockly';

export function Generator() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: '64px' }}>
            <Typography variant='h1'>
                Generator
            </Typography>
            <Blockly />
        </Box>
    );
}