import { Typography, Box } from '@mui/material';
import { Blockly } from '../Blockly'

export function Game() {
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', mt: '64px' }}>
                <Typography variant='h1'>
                    Game
                </Typography>
            </Box>
            <Blockly />
        </>
    );
}