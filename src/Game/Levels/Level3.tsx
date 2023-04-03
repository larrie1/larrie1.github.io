import { useState } from "react";
import { level2Table } from "../../Blockly/data/level1";
import { TableContext } from "../../context";
import { TableButton } from "../../Utils/TableButton";
import { Blockly } from '../../Blockly'
import { Box, Typography } from "@mui/material";
import { Headline } from "../../Utils/Headline";
import { useTheme } from '@mui/material/styles'

export function Level3(props: { isUnlocked: boolean }) {
    const theme = useTheme()
    const [rows, setRows] = useState(level2Table[1])
    const [head, setHead] = useState(level2Table[0])

    const table = {
        head: head,
        body: rows,
        addRow: () => {
            const newRow = [undefined, undefined]
            for(var i = 2; i < head.length; i++) {
                newRow.push(rows[Math.floor(Math.random() * rows.length)][i])
            }
            setRows(
                [...rows, newRow]
            )
        },
        addResult: (val: any, index: number) => {
            rows[index][0] = val
            setRows([...rows])
        }
    }

    return (
        <TableContext.Provider value={table}>
            {props.isUnlocked && <TableButton />}
            <Box sx={{ border: 1, borderColor: theme.palette.secondary.dark, borderRadius: 2, px: 5, pb: 5, pt: 3, mb: 2, background: theme.palette.secondary.light }}>
                <Headline variant="h4" text="Level 3" />
                <Typography variant="body1">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </Typography>
            </Box>
            <Blockly />
        </TableContext.Provider>
    )
}