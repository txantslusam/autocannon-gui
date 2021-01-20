import styled, { css } from 'styled-components';
import {
  Button, List, ListItem, ListItemText,
} from '@material-ui/core';
import { remCalc } from '../../utils/styles/utils';

export const StyledMenuItem = styled(ListItem)<StyledItem>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  ${({ isSelected }) => isSelected && css`
    background-color: rgba(0, 0, 0, 0.08);
  `}
`;

export const LabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.5rem 1rem;
`;

export const TasksList = styled(List)`
  width: 100%;
`;

interface StyledItem {
  isSelected?: boolean;
}

export const StyledListItem = styled(ListItem)<StyledItem>`
  width: 100%;
  padding: 0.75rem ${remCalc(22)}rem;
  
  ${({ isSelected }) => isSelected && css`
    background-color: rgba(0, 0, 0, 0.08);
  `}
  
  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const StyledListItemText = styled(ListItemText)`
  & > span {
    font-size: ${remCalc(15)}rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.darkGrey02}
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 3rem;
  border-left: 1px solid rgba(0, 0, 0, 0.12);
`;

export const ProjectContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100%;
`;

interface StyledButtonProps {
  isSelected?: boolean;
  borderBottom?: boolean;
  fullWidth?: boolean;
}

export const StyledIconButton = styled(Button)<StyledButtonProps>`
  display: flex;
  min-width: unset;
  align-items: center;
  justify-content: center;
  border-radius: 0;
  padding: 0.25rem;
  height: 54px;
  ${({ isSelected }) => isSelected && css`
    background-color: rgba(0, 0, 0, 0.08);
  `}

  ${({ fullWidth }) => fullWidth && css`
    width: 100%;
    height: 100%;
  `}
  
  ${({ borderBottom }) => borderBottom && css`
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  `} 

  :hover {
    background-color: rgba(0, 0, 0, 0.10);
  }
  
`;

export const StyledListItemContainer = styled.div<StyledItem>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
  ${({ isSelected }) => isSelected && css`
    background-color: rgba(0, 0, 0, 0.08);
  `}
  
  :hover {
    background-color: rgba(0, 0, 0, 0.10);
  }
`;
