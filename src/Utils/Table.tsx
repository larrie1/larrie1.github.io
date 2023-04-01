import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Typography, Button } from '@mui/material'
import { TableContext } from '../context';

export function BasicTable() {
    return (
        <TableContext.Consumer>
            {table => {
                return (
                    <TableContainer
                        sx={{ textAlign: 'center', maxHeight: '100%' }}>
                        <Table stickyHeader sx={{ flex: '1' }}>
                            <TableHead>
                                <TableRow
                                    key={"head"}
                                    hover={true}
                                    sx={{ borderColor: 'black' }}>
                                    {table.head.map((ele: string, index: number) => (
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
                                            '&:last-child td, &:last-child th': { border: 0 },
                                        }}
                                    >
                                        {row.map((ele: string | number | boolean, index: number) => (
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
                                my: 1,
                                borderRadius: 25,
                                borderColor: 'primary',
                                backgroundColor: 'transparent',
                                alignSelf: 'center'
                            }}>
                            Add Random Test Row
                        </Button>
                    </TableContainer>
                )
            }}
        </TableContext.Consumer>
    );
}
