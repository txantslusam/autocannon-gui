import React, {useEffect, useState} from 'react';
import {StyledHeaderCell, StyledTable, TableRow, StyledInputCell } from './Table.styled';
import TableCell from "./TableCell";

export interface TableProps {
    data: any;
}

export interface SelectedCell {
    rowId: number;
    columnKey: string;
}

const Table = (props: TableProps) => {
    const { data } = props;
    const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);
    const [tableData, setTableData] = useState(data);

    useEffect(() => {
        if (!data.length) {
            setTableData([{key: '', value: ''}]);
        }
    }, []);

    const handleOnClick = (cell: SelectedCell) => {
        setSelectedCell(cell)
    }

    const handleOnBlur = (cell: SelectedCell, value: string) => {
        setSelectedCell(null);
        const currentTableData = [...tableData];
        currentTableData[cell.rowId][cell.columnKey] = value;
        setTableData(currentTableData);
    }

    const handleOnBlurLastTableRow = (cell: SelectedCell, value: string) => {
        setSelectedCell(null);
        const newRowElement: {[key: string]: string} = {};
        if (Object.values(tableData[cell.rowId]).every(value => !value) && value !== '') {
            Object.keys(tableData[cell.rowId]).forEach(key => {
                newRowElement[key] = ''
            });
        }


        const currentTableData = [...tableData];
        currentTableData[cell.rowId][cell.columnKey] = value;

        if (newRowElement[cell.columnKey] === '') {
            currentTableData.push(newRowElement);
        }

        setTableData(currentTableData);
    }

    return (
        <StyledTable>
            <TableRow>
                <StyledHeaderCell style={{width: '2rem'}}/>
                <StyledHeaderCell>KEY</StyledHeaderCell>
                <StyledHeaderCell>VALUE</StyledHeaderCell>
            </TableRow>
                {tableData.map((item: any, index: number) => (
                    <TableRow isSelected={selectedCell?.rowId === index}>
                        <StyledHeaderCell style={{width: '2rem'}}/>
                         <TableCell
                             isSelected={selectedCell?.rowId === index && selectedCell?.columnKey === "key"}
                             rowId={index}
                             columnKey="key"
                             onClick={handleOnClick}
                             value={item['key']}
                             onBlur={index === tableData.length -1 ? handleOnBlurLastTableRow : handleOnBlur}
                         >
                         </TableCell>
                        <TableCell
                            isSelected={selectedCell?.rowId === index && selectedCell?.columnKey === "value"}
                            rowId={index}
                            columnKey="value"
                            onClick={handleOnClick}
                            value={item['value']}
                            onBlur={index === tableData.length -1 ? handleOnBlurLastTableRow : handleOnBlur}
                        >
                        </TableCell>
                    </TableRow>
                ))}
        </StyledTable>
    );
}

export default Table;