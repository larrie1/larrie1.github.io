import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Typography, Button } from '@mui/material'
import { useContext, useState } from 'react';
import { TableContext } from '../context';

export function BasicTable() {
    return (
        <TableContext.Consumer>
            {table => {
                return (
                    <TableContainer
                        sx={{
                            my: 5,
                            textAlign: 'center'
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
