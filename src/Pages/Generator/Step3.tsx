import AddIcon from '@mui/icons-material/Add'
import { Card, Typography, Table, tableCellClasses, TableHead, TableRow, TableCell, TableBody, TextField, Box, IconButton } from "@mui/material"
import { localizedStrings } from "../../Res"
import { Headline } from "../../Utils"
import { scaleInVerTop } from "../../Utils/animations"

/**
 *  This Method creates the third Step for generating a Level.
 *  It will display a table with the target and the features.
 *  The user then has to fill the columns of the target and features to generate the Level.
 * 
 *  @param props    key: To identify this Component
 *                  target: State Variable holding the actual Target to read from
 *                  features: State Variable holding the actual Features to read from
 *                  data: State Variable holding the actual Data to read from
 *                  setData: Functioon that will be called whenever the data of the table changes
 *                  isUnlocked: Boolean that indicates if this step is unlocked or not, because a Decision/Feature is missing
 *  @returns        UI representation of the first step
 */
export function Step3(
    props: {
        key: string,
        target: string,
        features: string[],
        data: any,
        setData: any,
        isUnlocked: boolean,
    }) {

    const addInput = () => props.setData([...props.data, { [localizedStrings.result]: undefined }])

    const head = [props.target, ...props.features]

    const onChange = (val: string, col: string, rowIndex: number) => {
        let newArray = [...props.data]
        newArray[rowIndex][col] = val
        props.setData(newArray)
    }

    return (
        <Card
            sx={{
                animation: `${scaleInVerTop} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
                mt: 2,
                px: 2,
                pb: 2,
                display: props.isUnlocked ? 'xs' : 'none',
            }}>
            <Headline
                variant={"h6"}
                text={localizedStrings.data}
            />
            <Typography sx={{ ml: 1 }}>
                {localizedStrings.generator_step3}
            </Typography>
            <Table
                sx={{
                    tableLayout: 'auto',
                    my: 2,
                    [`& .${tableCellClasses.root}`]: {
                        borderBottom: "none",
                        borderRight: 1,
                        borderRightColor: 'secondary.dark',
                    }
                }}>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            {props.target}
                        </TableCell>
                        {props.features.map(
                            (val: string, index: number) =>
                                <TableCell
                                    key={index}
                                    sx={{
                                        '&:last-child': { border: 0 }
                                    }}>
                                    {val}
                                </TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.map(
                        (_: any, index: number) =>
                            <TableRow key={index}>
                                {
                                    head.map(
                                        (col: any, colIndex: number) =>
                                            <TableCell
                                                key={colIndex}
                                                sx={{
                                                    '&:last-child': { borderRight: 0 }
                                                }}>
                                                <TextField
                                                    sx={{ width: '100%' }}
                                                    onChange={
                                                        (event: React.ChangeEvent<HTMLInputElement>) => {
                                                            onChange(event.target.value, col, index)
                                                        }
                                                    }
                                                    size='small'
                                                    label={localizedStrings.data}
                                                    variant="outlined" />
                                            </TableCell>
                                    )
                                }
                            </TableRow>)}
                </TableBody>
            </Table>
            <Box
                sx={{
                    width: '100%',
                    mt: 2,
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                <IconButton
                    onClick={addInput}
                    sx={{ color: 'primary' }}>
                    <AddIcon />
                </IconButton>
            </Box>
        </Card>
    )
}