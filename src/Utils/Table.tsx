import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Typography } from '@mui/material'

export type Row = Array<string | number | boolean>
export type Table = [Head, Row[]]
export type Head = Array<string>

export const createHead = (...elements: string[]): Head => elements;
export const createRow = (...elements: (string | number | boolean)[]): Row => elements;
export const createTable = (head: Head, rows: Row[]): Table => [head, rows];

export function BasicTable(props: { table: Table }) {
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
                    {props.table[1].map((row: Row, index: number) => (
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