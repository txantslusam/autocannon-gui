import React from 'react';
import {ResultsLabel, ResultTitle } from './Section.styled';
import {Card, TableBody, TableCell, TableHead, TableRow, Typography} from "@material-ui/core";
import { Table } from '@material-ui/core';

interface ResultSectionProps {

}

const ResultSection: React.FC<ResultSectionProps> = () => {
    return (
        <>
        <ResultTitle variant="h4">Results</ResultTitle>
            <Card style={{margin: '1rem 0'}}>
                <Table>
                    <TableHead>
                        <TableCell>STATISTICS</TableCell>
                        <TableCell align="right">AVERAGE</TableCell>
                        <TableCell align="right">STANDARD DEVIATION</TableCell>
                        <TableCell align="right">MAXIMUM</TableCell>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell style={{fontWeight: 500}}>REQUESTS PER SECONDS</TableCell>
                            <TableCell align="right">1212</TableCell>
                            <TableCell align="right">1212</TableCell>
                            <TableCell align="right">1212</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{fontWeight: 500}}>BYTES PER SECONDS</TableCell>
                            <TableCell align="right">1212</TableCell>
                            <TableCell align="right">1212</TableCell>
                            <TableCell align="right">1212</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <ResultsLabel variant="subtitle1" >251k requests in 10.05s, 27.9 MB read</ResultsLabel>
            </Card>
        </>
    );
}

export default ResultSection;