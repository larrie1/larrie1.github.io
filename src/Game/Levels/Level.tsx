import { useEffect, useState } from "react";
import { TableContext } from "../../context";
import { TableButton } from "../../Utils/TableButton";
import { Blockly } from '../../Blockly'
import { Box, Typography } from "@mui/material";
import { Headline } from "../../Utils/Headline";
import { useTheme } from '@mui/material/styles'
import { scaleInVerTop } from "../../Utils/animations";
import { localizedStrings } from "../../Res/localization";
import { createTable } from "../../Utils/Table";


/**
 * This Method creates the context needed to create an actual Level. 
 * 
 * @param data  the Object which contains all of the data for the Table
 * @returns     JSON Obj with the Table Context
 */
function _levelModel(data: any) {
    const [tableData, setTableData] = useState(data)

    useEffect(() => {
        setTableData(data)
    }, [data, localizedStrings.getLanguage()])

    const setTable = (newData: any) => {
        setTableData({
            target: tableData.target,
            features: tableData.features,
            data: newData
        })
    }

    return {
        table: createTable(
            tableData.data,
            tableData.target,
            tableData.features,
            setTable,
        )
    }
}

/**
 * 
 * @param props Contains the Key to store the progress on the localStorage,
 *              the actual data for this Level for it to get created,
 *              the title, description and task to ensure a individual text,
 *              isUnlocked describes if the Level is already unlocked and playable or not.
 * @returns     UI representation of a Level
 */
export function Level(
    props: {
        xmlKey: string,
        data: { target: string, features: string[], data: any[] },
        title: string,
        description: string,
        isUnlocked: boolean,
        task?: string,
    }
) {
    const theme = useTheme()
    const viewModel = _levelModel(props.data)

    return (
        <TableContext.Provider value={viewModel.table}>
            {props.isUnlocked && <TableButton />}
            <Box sx={{
                animation: `${scaleInVerTop} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
                border: 1,
                borderColor: theme.palette.secondary.dark,
                borderRadius: 2,
                px: 5,
                pb: 5,
                pt: 3,
                mb: 2,
                background: theme.palette.secondary.light,
            }}>
                <Headline
                    variant="h4"
                    text={props.title}
                />
                <Typography
                    variant="body1"
                    sx={{ mb: 2 }}
                >
                    {props.description}
                </Typography>
                {props.task &&
                    <Typography
                        variant="body1"
                    >
                        {props.task}
                    </Typography>}
            </Box>
            <Blockly xmlKey={props.xmlKey} />
        </TableContext.Provider>
    )
}
