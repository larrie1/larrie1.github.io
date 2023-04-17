import { useEffect, useState } from "react";
import { lv1_data } from "../../Blockly/data/tables";
import { TableContext } from "../../context";
import { TableButton } from "../../Utils/TableButton";
import { Blockly } from '../../Blockly'
import { Box, Typography } from "@mui/material";
import { Headline } from "../../Utils/Headline";
import { useTheme } from '@mui/material/styles'
import { scaleInVerTop } from "../../Utils/animations";
import { strings } from "../../Res/localization";
import { createTable } from "../../Utils/Table";

export const level1xmlKey = "level1blocks"
localStorage.setItem(level1xmlKey, '<xml xmlns="https://developers.google.com/blockly/xml"><block type="node" x="100" y="100"><field name="DECISION">Hat es Federn?</field><field name="CHOICE0">Nein</field><field name="CHOICE1">Ja</field><value name="0"><block type="node"><field name="DECISION">Lebt es unter der Erde?</field><field name="CHOICE0">Ja</field><field name="CHOICE1">Nein</field><value name="0"></value><value name="1"></value></block></value><value name="1"><block type="node"><field name="DECISION">Kann es Fliegen?</field><field name="CHOICE0">Nein</field><field name="CHOICE1">Ja</field><value name="0"></value><value name="1"></value></block></value></block></xml>')

export function Level1(props: { isUnlocked: boolean }) {
    const theme = useTheme()
    const [data, setTable] = useState(lv1_data())

    const setData = (newData: any) => {
        setTable({
            target: data.target,
            features: data.features,
            data: newData
        })
    }

    useEffect(() => {
        setTable(lv1_data())
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
                <Headline variant="h4" text="Level 1" />
                <Typography variant="body1" sx={{mb: 2}}>
                    {strings.level1_description}
                </Typography>
                <Typography variant="body1">
                    {strings.level1_task}
                </Typography>
            </Box>
            <Blockly xmlKey={level1xmlKey} />
        </TableContext.Provider>
    )
}