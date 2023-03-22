import { Box, Typography } from '@mui/material';

export function Footer() {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'primary',
            mt: 10,
            p: 10,
        }}>
            <Typography variant='body2'>
                Designed and developed by André Peters
            </Typography>
        </Box>
    )
}