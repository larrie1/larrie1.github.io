import { table } from "console";
import { useState } from "react";
import { level2Table } from "../../Blockly/data/level1";
import { TableContext } from "../../context";
import { TableButton } from "../../Utils/TableButton";
import { Blockly } from '../../Blockly'
import { Typography } from "@mui/material";
import { Headline } from "../../Utils/Headline";

export function Level3(props: {isUnlocked: boolean}) {
    const [rows, setRows] = useState(level2Table[1])

    const table = {
        head: level2Table[0],
        body: rows,
        addRow: () => {
            setRows(previousRows =>
                [...previousRows, [
                    undefined,
                    rows[Math.floor(Math.random() * rows[0].length)][1],
                    rows[Math.floor(Math.random() * rows[1].length)][2],
                    rows[Math.floor(Math.random() * rows[2].length)][3],
                    rows[Math.floor(Math.random() * rows[3].length)][4]
                ]]
            )
        }
    }

    return(
        <TableContext.Provider value={table}>
            {props.isUnlocked && <TableButton />}
            <Headline variant="h4" text='Level 3' />
            <Typography variant="body1" sx={{mb: 10}}>
                This is your third level
            </Typography>
            <Blockly />
        </TableContext.Provider>
    )
}