import styled from 'styled-components';
import { Button } from '@material-ui/core';

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

interface TableRowProps {
  isSelected?: boolean;
}

export const TableRow = styled.tr<TableRowProps>`
  color: ${({ theme }) => theme.colors.darkGrey02};
  background-color: ${({ isSelected }) => isSelected && '#fafafa'};
`;

export const StyledHeaderCell = styled.th`
  text-align: left;
  border: 1px solid rgba(0,0,0,0.12);
  height: 42px;
  padding: 0.5rem;
  width: 49%;
  :first-child {
    border-left: unset;
  }
  :last-child {
    border-right: unset;
  }
`;

export const StyledCell = styled.td`
  text-align: left;
  height: 45px;
  border: 1px solid rgba(0,0,0,0.12);
  width: 49%;
  padding: 0;
  :first-child {
    border-left: unset;
  }
  :last-child {
    border-right: unset;
  }
`;

export const StyledCellButton = styled(Button)`
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  border-radius: 0;
  padding: 0.5rem;
  text-transform: none;
`;

export const StyledInputCell = styled.input`
  width: calc(100% - 1rem); 
  margin: 0.5rem;
  border: 1px solid rgba(0,0,0,0.12);
  font-size: 1rem;
  padding: 0.25rem;
  outline: none;
  :focus {
    border-color: rgba(0,0,0,0.12);
  }
`;
