import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Typography, Button, alpha } from '@mui/material'
import { TableContext } from '../context';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles'
import { localizedStrings } from '../Res/localization';

const _ = require('lodash');

export function createTable(data: any, target: string, features: string[], setData: any) {
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
                    <TableContainer
                        sx={{ textAlign: 'end', height: '100%' }}>
                        <Table stickyHeader sx={{ flex: '1' }}>
                            <TableHead>
                                <TableRow
                                    key={"head"}
                                    hover={true}
                                    sx={{ borderColor: 'black' }}>
                                    {_.map(dataFiltered[0], (_: any, key: any) =>
                                        <TableCell
                                            key={Math.random().toString(16).slice(2)}
                                            align={key === table.target ? undefined : 'right'}>
                                            <Typography variant='h5'>
                                                {key}
                                            </Typography>
                                        </TableCell>
                                    )}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dataFiltered.map((row: any, index: number) => (
                                    <TableRow
                                        key={index}
                                        hover={true}
                                        sx={{
                                            background: row[localizedStrings.result] !== undefined ? row[table.target] === undefined ? alpha(theme.palette.primary.main, .3) : row[localizedStrings.result] === row[table.target] ? alpha('#009688', .3) : alpha('#f44336', .3) : 'transparent',
                                            '&:last-child td, &:last-child th': { border: 0 },
                                        }} >
                                        {_.map(row, (value: any, key: any) =>
                                            <TableCell
                                                key={Math.random().toString(16).slice(2)}
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
                        <Button
                            variant='outlined'
                            onClick={table.addRow}
                            sx={{
                                m: 1,
                                borderRadius: 25,
                                borderColor: 'primary',
                                backgroundColor: 'transparent',
                            }}>
                            <AddIcon sx={{ mr: 1 }} />
                            <Typography>
                                Add Random Test Row
                            </Typography>
                        </Button>
                        <Button
                            variant='outlined'
                            onClick={onResultClick}
                            sx={{
                                m: 1,
                                borderRadius: 25,
                                borderColor: 'primary',
                                backgroundColor: 'transparent',
                            }}>
                            {isResultVisible ? <VisibilityOffIcon sx={{ mr: 1 }} /> : <VisibilityIcon sx={{ mr: 1 }} />}
                            {isResultVisible ? <Typography>Hide Result</Typography> : <Typography>Show Result</Typography>}
                        </Button>
                    </TableContainer>
                )
            }}
        </TableContext.Consumer>
    );
}
