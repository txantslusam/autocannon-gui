import styled, {css} from 'styled-components';
import {hexToRGB} from "../../utils/styles/utils";
import {Typography} from "@material-ui/core";

export const BackgroundContainer = styled.div`
  top: 0;
  width: 100%;
  ${({ theme }) => css`
    background-color: ${hexToRGB(theme.palette.primary.main, 0.85)}
  `};
`;

export const Title = styled(Typography)`
  color: white;
  padding: 1rem;
`;