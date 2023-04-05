import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Typography, Button, alpha } from '@mui/material'
import { TableContext } from '../context';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles'

export function BasicTable() {
    const [isResultVisible, setResultVisible] = useState(false)
    const theme = useTheme()

    const onResultClick = () => {
        setResultVisible(!isResultVisible)
    }


    return (
        <TableContext.Consumer>
            {table => {
                return (
                    <TableContainer
                        sx={{ textAlign: 'end', maxHeight: '100%' }}>
                        <Table stickyHeader sx={{ flex: '1' }}>
                            <TableHead>
                                <TableRow
                                    key={"head"}
                                    hover={true}
                                    sx={{ borderColor: 'black' }}>
                                    {table.head.filter((_, index) => index === 0 ? isResultVisible : true).map((ele: string, index: number) => (
                                        <TableCell
                                            key={index}
                                            align={index === 0 ? undefined : 'right'}>
                                            <Typography variant='h5'>
                                                {ele}
                                            </Typography>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {table.body.map((row: any[], index: number) => (
                                    <TableRow
                                        key={index}
                                        hover={true}
                                        sx={{
                                            background: row[0] !== undefined ? row[1] === undefined ? alpha(theme.palette.primary.main, .3) : row[0] === row[1] ? alpha('#009688', .3) : alpha('#f44336', .3) : 'transparent',
                                            '&:last-child td, &:last-child th': { border: 0 },
                                        }}
                                    >
                                        {row.filter((val, index) => index === 0 ? isResultVisible : true).map((ele: string | number | boolean, index: number) => (
                                            <TableCell
                                                key={index}
                                                component={index === 0 ? 'th' : undefined}
                                                scope={index === 0 ? 'row' : undefined}
                                                align={index === 0 ? undefined : 'right'}
                                            >
                                                <Typography variant='subtitle2'>
                                                    {ele === undefined ? '' : ele.toString()}
                                                </Typography>
                                            </TableCell>
                                        ))}
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
