import { Typography, Box } from '@mui/material';
import { Blockly } from '../Blockly';
import { Headline } from '../Utils/Headline';
import { useTheme } from '@mui/material/styles'
import { scaleInVerTop } from '../Utils/animations';

import { TableButton } from '../Utils/TableButton';


export function Generator(props: { data: any, setData: any }) {
    const theme = useTheme()

    return (
        <Box sx={{ mt: '20px' }}>
            <TableButton />
            <Box sx={{ animation: `${scaleInVerTop} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`, border: 1, borderColor: theme.palette.secondary.dark, borderRadius: 2, px: 5, pb: 5, pt: 3, mb: 2, background: theme.palette.secondary.light }}>
                <Headline variant="h4" text="Generator" />
                <Typography variant='body1'>
                    This is the Generator, here you can test your skills against the ID3 Machine Learning Algorithm. Create a Data Set and try to solve it by creating a Decision Tree.
                </Typography>
            </Box>
            <Blockly xmlKey={`generator${Math.random()}`} />
        </Box>
    );
}