import { Typography, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { Blockly } from '../Blockly';
import { lv3_data } from '../Blockly/data/tables';
import { TableContext } from '../context';
import { Headline } from '../Utils/Headline';
import { useTheme } from '@mui/material/styles'
import { scaleInVerTop } from '../Utils/animations';
import { strings } from '../Res/localization';
import { createTable } from '../Utils/Table';
import { IntroDialog } from '../Game/Intro';

export function Generator() {
    const theme = useTheme()
    const [data, setTable] = useState<any>(undefined)
    const [showDialog, setShowDialog] = useState(true)

    const handleClose = () => setShowDialog(false)

    const setData = (newData: any) => {
        setTable({
            target: "lv3_data().target",
            features: lv3_data().features,
            data: newData
        })
    }

    const table = createTable(
        lv3_data().data,
        lv3_data().target,
        lv3_data().features,
        setData,
    )

    function CreateTableDialog() {
        return(
            <>
                <IntroDialog open={showDialog} handleClose={handleClose} title={"Erstelle dir dein eigenes Level!"} steps={[<Box sx={{mt: '64px', flex: 1}}>No Data yet</Box>]} />
                <Box sx={{mt: '64px', flex: 1}}>No Data yet</Box>
            </>
        )
    }

    return (
        data == undefined ? <CreateTableDialog /> : <TableContext.Provider value={table}>
            <Box sx={{ mt: '84px' }}>
                <Box sx={{ animation: `${scaleInVerTop} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`, border: 1, borderColor: theme.palette.secondary.dark, borderRadius: 2, px: 5, pb: 5, pt: 3, mb: 2, background: theme.palette.secondary.light }}>
                    <Headline variant="h4" text="Generator" />
                    <Typography variant='body1'>
                        This is the Generator, here you can test your skills against the ID3 Machine Learning Algorithm. Create a Data Set and try to solve it by creating a Decision Tree.
                    </Typography>
                </Box>
                <Blockly xmlKey='generatorblocks' />
            </Box>
        </TableContext.Provider>
    );
}