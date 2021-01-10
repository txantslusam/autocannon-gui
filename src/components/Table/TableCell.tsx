import React, {useRef, useState} from 'react';
import { StyledCell, StyledCellButton,StyledInputCell } from './Table.styled';
import {SelectedCell} from "./Table";
import useOnClickOutside from "../../utils/hooks/useOnClickOutside";

interface TableCellProps {
    rowId: number;
    columnKey: 'key' | 'value';
    isSelected?: boolean;
    onClick: (cell: SelectedCell) => void;
    onBlur: (cell: SelectedCell, value: string) => void;
    value: string;
}

const TableCell: React.FC<TableCellProps> = ({ value, rowId, columnKey, onClick, onBlur, isSelected }) => {
    const [cellValue, setCellValue] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);

    useOnClickOutside(inputRef, () => onBlur({rowId: rowId, columnKey: columnKey}, cellValue));

    return (
        <StyledCell>
            {isSelected
                ? (
                    <StyledInputCell autoFocus ref={inputRef} value={cellValue} onChange={(event) => setCellValue(event.target.value)}/>
                )
                : (
                    <StyledCellButton onClick={() => onClick({rowId: rowId, columnKey: columnKey})}>
                        {value}
                    </StyledCellButton>
                )
            }
        </StyledCell>
    );
}

export default TableCell;