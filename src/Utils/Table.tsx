import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Typography } from '@mui/material'

export function BasicTable(props: { table: [string[], any[]] }) {
    return (
        <TableContainer
            sx={{
                my: 5,
            }}>
            <Table
                sx={{
                    minWidth: 650,
                }}>
                <TableHead>
                    <TableRow
                        key={"head"}
                        hover={true}
                        sx={{
                            color: 'primary',
                            backgroundColor: 'primary',
                            borderColor: 'black',
                        }}>
                        {props.table[0].map((ele: string, index: number) => (
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
                    {props.table[1].map((row: any[], index: number) => (
                        <TableRow
                            key={index}
                            hover={true}
                            sx={{
                                '&:last-child td, &:last-child th': { border: 0 },
                                backgroundColor: 'primary'
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
                                        {ele.toString()}
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}