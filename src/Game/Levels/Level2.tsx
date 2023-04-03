import { useState } from "react";
import { level2Table } from "../../Blockly/data/level1";
import { TableContext } from "../../context";
import { TableButton } from "../../Utils/TableButton";
import { Blockly } from '../../Blockly'
import { Box, Typography } from "@mui/material";
import { Headline } from "../../Utils/Headline";
import { useTheme } from '@mui/material/styles'

export function Level2(props: { isUnlocked: boolean }) {
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
                <Headline variant="h4" text="Level 2" />
                <Typography variant="body1">
                    Once upon a time, there was a passionate tennis player named Sarah. She loved nothing more than hitting the court and playing a few sets with her friends. However, Sarah knew that certain weather conditions could impact her game.
                </Typography>
                <Typography variant="body1">
                    One sunny morning, Sarah woke up and checked the weather app on her phone. She saw that the temperature was 85 degrees Fahrenheit, the humidity was 70%, the wind was 8 miles per hour, and the outlook was partly cloudy. Sarah knew that these factors could either make or break her tennis game. She started to think about her preferences for each of these factors. She didn't mind playing in warm weather, but 85 degrees might be pushing it. She preferred the humidity to be lower than 60%, and the wind to be no more than 5 miles per hour. As for the outlook, she didn't mind playing in partly cloudy conditions, but she preferred a sunny day. So Sarah decided to make a decision based on her preferences. She checked the temperature and saw that it was a bit too hot for her liking. The humidity was also a bit high, and the wind was stronger than she preferred. She looked at the outlook and saw that it was partly cloudy.
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    After considering all of these factors, Sarah decided to skip tennis for the day. She knew that the weather conditions could make it difficult to play her best game, and she didn't want to risk injury or frustration. Instead, she opted to stay home, relax, and plan to play tennis another day when the weather was more to her liking.
                </Typography>
                <Typography variant="body1">
                    Try to help Sarah and create a Decision Tree that predicts her Decision!
                </Typography>
            </Box>
            <Blockly />
        </TableContext.Provider>
    )
}