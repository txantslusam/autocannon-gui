import React from 'react';
import {ResultsLabel, ResultTitle } from './Section.styled';
import {Card, TableBody, TableCell, TableHead, TableRow, Typography} from "@material-ui/core";
import { Table } from '@material-ui/core';
import {Result} from "../../../redux/types";

interface ResultSectionProps {
    results: Result;
}

const ResultSection: React.FC<ResultSectionProps> = ({results}) => {
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
                            <TableCell align="right">{results.request.average}</TableCell>
                            <TableCell align="right">{results.request.stdev}</TableCell>
                            <TableCell align="right">{results.request.max}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{fontWeight: 500}}>BYTES PER SECONDS</TableCell>
                            <TableCell align="right">{results.request.average}</TableCell>
                            <TableCell align="right">{results.request.stdev}</TableCell>
                            <TableCell align="right">{results.request.max}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <ResultsLabel variant="subtitle1" >{results.label}</ResultsLabel>
            </Card>
        </>
    );
}

export default ResultSection;