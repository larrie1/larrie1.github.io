import { Typography, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { Blockly } from '../Blockly';
import { lv2_data } from '../Blockly/data/tables';
import { TableContext } from '../context';
import { Headline } from '../Utils/Headline';
import { useTheme } from '@mui/material/styles'
import { scaleInVerTop } from '../Utils/animations';
import { strings } from '../Res/localization';
import { createTable } from '../Utils/Table';

export function Generator() {
    const target = strings.lv2Decision
    const features = [strings.outlook, strings.temperature, strings.humidity, strings.windy]
    const theme = useTheme()
    const [dataState, setDataState] = useState(lv2_data)

    useEffect(() => {
        setDataState(lv2_data)
    }, [strings.getLanguage()])

    const table = createTable(
        dataState,
        target,
        features,
        setDataState,
    )

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