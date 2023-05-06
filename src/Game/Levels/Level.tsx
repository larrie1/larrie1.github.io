import { useEffect, useState } from "react";
import { TableContext } from "../../context";
import { TableButton } from "../../Utils/TableButton";
import { Blockly } from '../../Blockly'
import { Card, Typography } from "@mui/material";
import { Headline } from "../../Utils/Headline";
import { scaleInVerTop } from "../../Utils/animations";
import { localizedStrings } from "../../Res/localization";
import { createTable } from "../../Utils/Table";


/**
 * This Method creates the context needed to create an actual Level. 
 * 
 * @param data  the Object which contains all of the data for the Table
 * @returns     JSON Obj with the Table Context
 */
function useLevel(data: any) {
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
    const state = useLevel(props.data)

    return (
        <TableContext.Provider value={state.table}>
            {props.isUnlocked && <TableButton />}
            <Card sx={{
                animation: `${scaleInVerTop} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
                px: 5,
                pb: 5,
                pt: 3,
                mb: 2,
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
            </Card>
            <Blockly xmlKey={props.xmlKey} />
        </TableContext.Provider>
    )
}
