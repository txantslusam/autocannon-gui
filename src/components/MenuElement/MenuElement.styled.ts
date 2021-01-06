import styled from 'styled-components';
import {Button, List, ListItem, ListItemText} from "@material-ui/core";
import {remCalc} from "../../utils/styles/utils";

export const StyledMenuItem = styled(ListItem)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
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

export const StyledListItem = styled(ListItem)`
  width: 100%;
  padding: 0.75rem ${remCalc(22)}rem;
`;

export const StyledListItemText = styled(ListItemText)`
  & > span {
    font-size: ${remCalc(15)}rem;
    font-weight: 700;
    color: ${({theme}) => theme.colors.darkGrey02}
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

export const StyledIconButton = styled(Button)`
  display: flex;
  min-width: unset;
  align-items: center;
  justify-content: center;
  border-radius: 0;
  height: 50%;
  padding: 0.25rem;
  :first-child {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  }
`

