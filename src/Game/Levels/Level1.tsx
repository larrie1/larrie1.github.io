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

export function Level1(props: { isUnlocked: boolean }) {
    const target = strings.lv1Decision
    const features = [strings.hot, strings.windy, strings.rainy]
    const theme = useTheme()
    const [dataState, setDataState] = useState(lv1_data)

    useEffect(() => {
        setDataState(lv1_data)
    }, [strings.getLanguage()])

    const table = createTable(
        dataState,
        target,
        features,
        setDataState,
    )

    return (
        <TableContext.Provider value={table}>
            {props.isUnlocked && <TableButton />}
            <Box sx={{ animation: `${scaleInVerTop} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`, border: 1, borderColor: theme.palette.secondary.dark, borderRadius: 2, px: 5, pb: 5, pt: 3, mb: 3, background: theme.palette.secondary.light }}>
                <Headline variant="h4" text="Level 1" />
                <Typography variant="body1">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </Typography>
            </Box>
            <Blockly xmlKey={level1xmlKey} />
        </TableContext.Provider>
    )
}