import React, { useRef, useState } from 'react';
import { StyledCell, StyledCellButton, StyledInputCell } from './Table.styled';
import useOnClickOutside from '../../utils/hooks/useOnClickOutside';
import { SelectedCell } from './Table.types';

interface TableCellProps {
  rowId: number;
  columnKey: 'key' | 'value';
  isSelected?: boolean;
  onClick: (cell: SelectedCell) => void;
  onBlur: (cell: SelectedCell, value: string) => void;
  value: string;
}

const TableCell: React.FC<TableCellProps> = ({
  value, rowId, columnKey, onClick, onBlur, isSelected,
}) => {
  const [cellValue, setCellValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useOnClickOutside(inputRef, () => onBlur({ rowId, columnKey }, cellValue));

  return (
    <StyledCell>
      {isSelected
        ? (
          <StyledInputCell
            ref={inputRef}
            autoFocus
            value={cellValue}
            onChange={event => setCellValue(event.target.value)}
          />
        )
        : (
          <StyledCellButton onClick={() => onClick({ rowId, columnKey })}>
            {value}
          </StyledCellButton>
        )}
    </StyledCell>
  );
};

export default TableCell;
