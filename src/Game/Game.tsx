import { Typography, Box, Button, CircularProgress } from '@mui/material';
import { Blockly } from '../Blockly'
import { level2Table } from '../Blockly/data/level1';
import { BasicTable } from '../Utils';

export function Game() {
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', mt: '64px' }}>
                <Typography variant='h3'>
                    Game
                </Typography>
            </Box>
            <BasicTable table={level2Table} />
            <Blockly table={level2Table} />
        </>
    );
}