import React, {useEffect, useState} from 'react';
import {StyledHeaderCell, StyledTable, TableRow } from './Table.styled';
import TableCell from "./TableCell";
import {Param} from "../../redux/types";

export interface TableProps {
    data: Param[];
    onChange?: (data: Param[]) => void;
}

export interface SelectedCell {
    rowId: number;
    columnKey: 'key' | 'value';
}

function initData(data: Param[]) {
    const currentData = [...data];
    const newEmptyRow = {key: '', value: ''};
    if (!data.length) {
        return [newEmptyRow];
    }
    const lastRow = data[data.length-1];
    if (lastRow.key && lastRow.value) {
        currentData.push(newEmptyRow);
    }
    return currentData;
}

const Table = (props: TableProps) => {
    const { data, onChange } = props;
    const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);
    const [tableData, setTableData] = useState<Param[]>([]);

    useEffect(() => {
        setTableData(initData(data));
    }, [data]);

    const handleOnClick = (cell: SelectedCell) => {
        setSelectedCell(cell)
    }

    const handleOnBlur = (cell: SelectedCell, value: string) => {
        setSelectedCell(null);
        const currentTableData = [...tableData];
        currentTableData[cell.rowId][cell.columnKey] = value;
        setTableData(currentTableData);
        onChange(currentTableData);
    }

    const handleOnBlurLastTableRow = (cell: SelectedCell, value: string) => {
        setSelectedCell(null);
        let newRowElement: Param | undefined;
        if (Object.values(tableData[cell.rowId]).every(value => !value) && value !== '') {
            newRowElement = {key: '', value: ''};
        }


        const currentTableData = [...tableData];
        currentTableData[cell.rowId][cell.columnKey] = value;

        if (newRowElement) {
            currentTableData.push(newRowElement);
        }

        setTableData(currentTableData);
        onChange(currentTableData);
    }

    return (
        <StyledTable>
            <TableRow>
                <StyledHeaderCell style={{width: '2rem'}}/>
                <StyledHeaderCell>KEY</StyledHeaderCell>
                <StyledHeaderCell>VALUE</StyledHeaderCell>
            </TableRow>
                {tableData.map((item: Param, index: number) => (
                    <TableRow isSelected={selectedCell?.rowId === index}>
                        <StyledHeaderCell style={{width: '2rem'}}/>
                         <TableCell
                             isSelected={selectedCell?.rowId === index && selectedCell?.columnKey === "key"}
                             rowId={index}
                             columnKey="key"
                             onClick={handleOnClick}
                             value={item.key}
                             onBlur={index === tableData.length -1 ? handleOnBlurLastTableRow : handleOnBlur}
                         >
                         </TableCell>
                        <TableCell
                            isSelected={selectedCell?.rowId === index && selectedCell?.columnKey === "value"}
                            rowId={index}
                            columnKey="value"
                            onClick={handleOnClick}
                            value={item.value}
                            onBlur={index === tableData.length -1 ? handleOnBlurLastTableRow : handleOnBlur}
                        >
                        </TableCell>
                    </TableRow>
                ))}
        </StyledTable>
    );
}

export default Table;