import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableHead, TableRow, TableCell, Paper, Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

class TableView extends Component {
    render() {
        const { rows, columns } = this.props;
        return (
            <Paper>
                <Table>
                    <TableHead>
                        {columns ? columns.map((col, i) => {
                            return (
                                <TableCell key={i}>{col.label}</TableCell>
                            )
                        }) : null}
                    </TableHead>
                    <TableBody>
                        {rows ? rows.map((row, i) => {
                            return (
                                <TableRow>
                                    {
                                        columns.map((col, colIndex) => {
                                            return (
                                                <TableCell key={colIndex}>
                                                    {col.name == 'id' ? <Link to={`/admin/posts/edit/${row[col.name]}`} component={RouterLink}>{row[col.name]}</Link> :
                                                        row[col.name]
                                                    }
                                                </TableCell>
                                            )
                                        })
                                    }
                                </TableRow>
                            )
                        }) : null}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}

export default TableView; 