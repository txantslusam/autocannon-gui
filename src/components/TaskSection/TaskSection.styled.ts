import styled from 'styled-components';
import {TextField, withStyles} from "@material-ui/core";

export const TaskSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  float: bottom;
  padding: 1.5rem;
`;

export const ChooseTaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 1.5rem;
`;

export const MethodRequestContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  margin-top: 1rem;
`;

export const SelectMethodRequest = withStyles({
    root: {
        '& .MuiOutlinedInput-root': {
            borderBottomRightRadius: 'unset',
            borderTopRightRadius: 'unset',
            borderRight: 'unset',
        },
        '&': {
            minWidth: '8rem',
        }
    },
})(TextField);

export const InputAddress = withStyles({
    root: {
        '& .MuiOutlinedInput-root': {
            borderBottomLeftRadius: 'unset',
            borderTopLeftRadius: 'unset',
        },
        '&': {
            width: '100%',
        },
    },
})(TextField);

