import { useEffect, useState } from "react";
import { lv2_data } from "../../Blockly/data/tables";
import { TableContext } from "../../context";
import { TableButton } from "../../Utils/TableButton";
import { Blockly } from '../../Blockly'
import { Box, Typography } from "@mui/material";
import { Headline } from "../../Utils/Headline";
import { useTheme } from '@mui/material/styles'
import { scaleInVerTop } from "../../Utils/animations";
import { strings } from "../../Res/localization";
import { createTable } from "../../Utils/Table";

export const level2xmlKey = "level2blocks"

export function Level2(props: { isUnlocked: boolean }) {
    const theme = useTheme()
    const [data, setTable] = useState(lv2_data)

    const setData = (newData: any) => {
        setTable({
            target: data.target,
            features: data.features,
            data: newData
        })
    }

    useEffect(() => {
        setTable(lv2_data)
    }, [strings.getLanguage()])

    const table = createTable(
        data.data,
        data.target,
        data.features,
        setData,
    )

    return (
        <TableContext.Provider value={table}>
            {props.isUnlocked && <TableButton />}
            <Box sx={{ animation: `${scaleInVerTop} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`, border: 1, borderColor: theme.palette.secondary.dark, borderRadius: 2, px: 5, pb: 5, pt: 3, mb: 2, background: theme.palette.secondary.light }}>
                <Headline variant="h4" text="Level 2" />
                <Typography variant="body1">
                    {strings.lorem}
                </Typography>
            </Box>
            <Blockly xmlKey={level2xmlKey} />
        </TableContext.Provider>
    )
}