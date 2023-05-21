import _ from 'lodash'
import AddIcon from '@mui/icons-material/Add'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { Table, TableContainer, TableHead, TableRow, TableCell, Tooltip, TableBody, Typography, Button, alpha, Box } from '@mui/material'
import { TableContext } from '../context'
import { useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { localizedStrings } from '../Res'

/**
 *  This Method creates a Table containing all the information it takes to create the UI for the table.
 *  It will add a addRow method to create new Testdata and a addResult method to store the result. 
 * 
 * @param data Containing the main Data from the Table
 * @param target String defining the Decision that will be targeted
 * @param features A list of features which the decision will be based on
 * @param setData Sets the new modified Table 
 * @returns 
 */
export function createTable(
    data: any,
    target: string,
    features: string[],
    setData: (data: any) => void,
) {
    return {
        data: data,
        target: target,
        features: features,
        addRow: () => {
            const newVal = {
                [localizedStrings.result]: undefined,
                [target]: undefined
            }
            for (var i = 0; i < features.length; i++) {
                let feature = features[i]
                newVal[feature] = _.sample(_.uniq(_.map(data, feature)))
            }
            setData(
                [...data, newVal]
            )
        },
        addResult: (val: any, index: number) => {
            let result = localizedStrings.result
            data[index][result] = val
            setData([...data])
        }
    }
}


/**
 *  This Method creates a Table with two Buttons at the bottom. 
 *  With the Buttons you can add a random test row and show or hide the result column.
 * 
 *  @returns UI representation of a basic Table
 */
export function BasicTable() {
    const [isResultVisible, setResultVisible] = useState(true)
    const theme = useTheme()

    const onResultClick = () => {
        setResultVisible(!isResultVisible)
    }

    return (
        <TableContext.Consumer>
            {table => {
                let dataFiltered = table.data.map(row =>
                    _.reduce(row, function (result: any, value: any, key: string) {
                        if (isResultVisible && key === localizedStrings.result) {
                            result[key] = value
                        } else if (key !== localizedStrings.result) {
                            result[key] = value
                        }
                        return result
                    }, {})
                )

                return (
                    <>
                        <TableContainer
                            sx={{
                                textAlign: 'end',
                                height: '100%',
                            }}>
                            <Table stickyHeader sx={{ mb: '65px' }}>
                                {/* Head of the Table */}
                                <TableHead>
                                    <TableRow
                                        key={"head"}
                                        hover={true}>
                                        {_.map(dataFiltered[0], (_: any, key: any) =>
                                            <TableCell
                                                key={Math.random()}
                                                align={key === table.target ? undefined : 'right'}>
                                                <Typography variant='h5'>
                                                    {key}
                                                </Typography>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                </TableHead>

                                {/* Tablecontent */}
                                <TableBody>
                                    {dataFiltered.map((row: any, index: number) => (
                                        <TableRow
                                            key={index}
                                            hover={true}
                                            sx={{
                                                backgroundColor: row[localizedStrings.result] !== undefined ? (
                                                    row[table.target] === undefined ?
                                                        alpha(theme.palette.primary.main, .3) : (
                                                            row[localizedStrings.result] === row[table.target] ?
                                                                alpha('#009688', .3) : alpha('#f44336', .3)
                                                        )
                                                ) : 'transparent',
                                                '&:last-child td, &:last-child th': { border: 0 },
                                            }} >
                                            {_.map(row, (value: any, key: any) =>
                                                <TableCell
                                                    key={Math.random()}
                                                    component={key === table.target ? 'th' : undefined}
                                                    scope={key === table.target ? 'row' : undefined}
                                                    align={key === table.target ? undefined : 'right'} >
                                                    <Typography variant='subtitle2'>
                                                        {value === undefined ? '' : value.toString()}
                                                    </Typography>
                                                </TableCell>)
                                            }
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box
                            sx={{
                                position: 'fixed',
                                bottom: 0,
                                height: '65px',
                                display: 'flex',
                                flexDirection: 'row',
                                width: '100%',
                                backgroundColor: 'background.default',
                                borderTop: 1,
                                borderColor: 'secondary.dark',
                            }}>
                            {/* Legend */}
                            <Box
                                sx={{
                                    p: 1,
                                    bottom: 0,
                                    borderRight: 1,
                                    borderColor: 'secondary.dark',
                                }}>
                                <Typography
                                    color={'#009688'}
                                    sx={{
                                        mr: 1,
                                        fontSize: 10,
                                    }}>
                                    {localizedStrings.correct}
                                </Typography>
                                <Typography
                                    color={'#f44336'}
                                    sx={{
                                        mr: 1,
                                        fontSize: 10,
                                    }}>
                                    {localizedStrings.incorrect}
                                </Typography>
                                <Typography
                                    color={'primary'}
                                    sx={{
                                        mr: 1,
                                        fontSize: 10,
                                    }}>
                                    {localizedStrings.guessed}
                                </Typography>
                            </Box>
                            <Box sx={{ flex: 1 }} />

                            {/* Buttons to modify table */}
                            <Tooltip title={localizedStrings.random_test}>
                                <Button onClick={table.addRow}>
                                    <AddIcon />
                                </Button>
                            </Tooltip>
                            <Tooltip title={localizedStrings.result}>
                                <Button onClick={onResultClick}>
                                    {isResultVisible ?
                                        <VisibilityOffIcon /> :
                                        <VisibilityIcon />}
                                </Button>
                            </Tooltip>
                        </Box>
                    </>
                )
            }}
        </TableContext.Consumer>
    );
}
